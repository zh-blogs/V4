import { Sun, Moon } from "lucide-react";
import { Button } from "@web/components/ui/button";
import { getTheme, setTheme } from "@web/lib/themes";
import { useCallback, useEffect, useState } from "react";
import type { Theme } from "astro-themes";

export function ThemeToggle() {
  const [themeAttr, setThemeAttr] = useState<Theme>("light");

  const handleClick = useCallback(() => {
    if(themeAttr === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [themeAttr]);

  useEffect(() => {
    setThemeAttr(getTheme());
    document.addEventListener("set-theme", (e) => {
      setThemeAttr(e.detail ?? "light");
    });
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer"
      onClick={() => handleClick()}>
      {
        themeAttr === "dark"
        ? <Moon />
        : <Sun />
      }
    </Button>
  );
}
