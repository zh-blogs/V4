import { useTheme } from "@web/hooks/use-theme";
import { cn } from "@web/lib/utils";

export function Logo({ className, ...props }: React.ComponentProps<"img">) {
  const { getTheme } = useTheme();

  return (
    <img
      className={cn("w-14 h-14 mt-1", className)}
      src={`/static/logo-${getTheme()}.webp`}
      alt="logo"
      {...props}/>
  );
}
