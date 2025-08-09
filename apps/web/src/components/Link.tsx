import { cn } from "@web/lib/utils";
import type { ComponentProps } from "react";

export function Link({
  className,
  children,
  ...props
}: ComponentProps<"a">) {
  return (
    <a {...props} className={cn(children, "hover:underline")}>
      {children}
    </a>
  );
}
