import type { Theme } from "astro-themes";
import { useEffect, useState } from "react";

export function useTheme() {
  const [themeAttr, setThemeAttr] = useState<Theme>("light");

  useEffect(() => {
    setThemeAttr(document.documentElement.attributes.getNamedItem("data-theme")?.value as Theme);
    document.addEventListener("set-theme", (e) => {
      setThemeAttr(e.detail ?? "light");
    });
  }, []);

  return {
    theme: themeAttr,
    getTheme() {
      return themeAttr;
    },
    setTheme(theme: Theme) {
      document.dispatchEvent(new CustomEvent("set-theme", { detail: theme }));
    }
  };
}
