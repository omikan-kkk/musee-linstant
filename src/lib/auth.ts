export const API_URL = "https://musee-cms-api.azamisound.workers.dev";

const TOKEN_KEY = "musee_cms_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = "/admin/login";
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/admin/login";
}

export async function login(password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  const data = await response.json();

  if (!data.ok) {
    throw new Error("Login failed");
  }

  setToken(data.token);

  return data;
}

export async function authFetch(path: string, options: RequestInit = {}) {
  const token = getToken();

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (response.status === 401) {
    logout();
    throw new Error("Unauthorized");
  }

  return response;
}