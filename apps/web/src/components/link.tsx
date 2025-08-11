import { cn } from "@web/lib/utils";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { buttonVariants } from "./ui/button";

export function Link({
  className,
  children,
  ...props
}: ComponentProps<"a">) {
  return (
    <a {...props} className={cn(className, "hover:underline")}>
      {children}
    </a>
  );
}

export function ButtonLink({
  className,
  children,
  variant,
  size,
  ...props
}: ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return (
    <a {...props} className={cn(className, buttonVariants({ variant, size }))}>
      {children}
    </a>
  );
}
