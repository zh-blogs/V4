import type { LucideIcon } from "lucide-react";
import {
  NavigationMenu as BaseNavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@web/components/ui/navigation-menu";

export type NavigationMenuProps = {
  name: string
  icon?: LucideIcon
  href?: string
  newPage?: boolean
  subList?: {
    name: string
    icon?: LucideIcon
    href: string
    newPage?: boolean
  }[]
}[]

export function NavigationMenu({ leftSplit, rightSplit }: {
  leftSplit: NavigationMenuProps
  rightSplit: NavigationMenuProps
}) {
  return (
    <BaseNavigationMenu className="nav-padding w-full max-w-full py-4 flex justify-between">
      <NavigationMenuList>
        {leftSplit.map(({ name, href, newPage = false, subList }, i) => (
          <NavigationMenuItem key={i}>
            {
              href
              ? (
                <NavigationMenuLink
                  href={href}
                  target={newPage ? "_blank" : "_self"}>
                  {name}
                </NavigationMenuLink>
              )
              : (
                <>
                  <NavigationMenuTrigger>{name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul>
                      {subList?.map(({ name, href, newPage = false }, j) => (
                        <li key={j}>
                          <NavigationMenuLink
                            href={href}
                            target={newPage ? "_blank" : "_self"}>
                            {name}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              )
            }
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuList>
        {rightSplit.map(({ name, href, newPage = false, subList }, i) => (
          <NavigationMenuItem key={i}>
            {
              href
              ? (
                <NavigationMenuLink
                  href={href}
                  target={newPage ? "_blank" : "_self"}>
                  {name}
                </NavigationMenuLink>
              )
              : (
                <>
                  <NavigationMenuTrigger>{name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-40">
                      {subList?.map(({ name, href, newPage = false }, j) => (
                        <li key={j}>
                          <NavigationMenuLink
                            href={href}
                            target={newPage ? "_blank" : "_self"}>
                            {name}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              )
            }
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </BaseNavigationMenu>
  );
}
