import { useTheme } from "@web/hooks/use-theme";

export function Logo(props: React.ComponentProps<"img">) {
  const { getTheme } = useTheme();

  return (
    <img
      className="w-14 h-14"
      src={`/static/logo-${getTheme()}.webp`}
      alt="logo"
      {...props}/>
  );
}
