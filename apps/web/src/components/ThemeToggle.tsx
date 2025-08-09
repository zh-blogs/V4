import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@web/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    if(theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer"
      onClick={() => handleClick()}>
      {
        theme === "dark"
        ? <Moon />
        : <Sun />
      }
    </Button>
  );
}
