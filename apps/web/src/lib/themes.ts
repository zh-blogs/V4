import type { Theme } from "astro-themes";

export function getTheme(): Theme {
  return document.documentElement.attributes.getNamedItem("data-theme")?.value as Theme;
}

export function setTheme(theme: Theme) {
  document.dispatchEvent(new CustomEvent("set-theme", { detail: theme }));
}
