import contents from "./cms/contents.json";

export type ContentItem = (typeof contents)[number] & {
  desktopHeightPx?: number;
  desktopHeightVh?: number;
};

export const CONTENTS = contents as ContentItem[];