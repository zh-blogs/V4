import { Sun, Moon } from "lucide-react";
import { Button } from "@web/components/ui/button";
import { useTheme } from "@web/hooks/use-theme";

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
