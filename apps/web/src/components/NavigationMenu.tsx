import type { LucideIconName } from "@web/lib/types";
import { DynamicIcon } from "lucide-react/dynamic";
import {
  NavigationMenu as BaseNavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@web/components/ui/navigation-menu";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

export type NavigationMenuProps = {
  name: string
  icon?: LucideIconName
  href?: string
  newPage?: boolean
  subList?: {
    name: string
    icon?: LucideIconName
    href: string
    newPage?: boolean
  }[]
}[]

export function NavigationMenu({ leftSplit, rightSplit }: {
  leftSplit: NavigationMenuProps
  rightSplit: NavigationMenuProps
}) {
  return (
    <BaseNavigationMenu className="bg-background dark:bg-card border rounded-xl shadow-md mt-4 mx-auto px-4 w-fit h-12 max-w-full py-4 flex gap-48 fixed">
      <NavigationMenuList>
        <Logo className="w-10 h-10"/>
        {leftSplit.map(({ name, icon, href, newPage = false, subList }, i) => (
          <NavigationMenuItem key={i}>
            {
              href
              ? (
                <NavigationMenuLink
                  className="flex flex-row items-center gap-2"
                  href={href}
                  target={newPage ? "_blank" : "_self"}>
                  {icon && <DynamicIcon name={icon}/>}
                  <span>{name}</span>
                </NavigationMenuLink>
              )
              : (
                <>
                  <NavigationMenuTrigger>{name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul>
                      {subList?.map(({ name, icon, href, newPage = false }, j) => (
                        <li key={j}>
                          <NavigationMenuLink
                            className="flex flex-row items-center gap-2"
                            href={href}
                            target={newPage ? "_blank" : "_self"}>
                            {icon && <DynamicIcon name={icon}/>}
                            <span>{name}</span>
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
        {rightSplit.map(({ name, icon, href, newPage = false, subList }, i) => (
          <NavigationMenuItem key={i}>
            {
              href
              ? (
                <NavigationMenuLink
                  className="flex flex-row items-center gap-2"
                  href={href}
                  target={newPage ? "_blank" : "_self"}>
                  {icon && <DynamicIcon name={icon}/>}
                  <span>{name}</span>
                </NavigationMenuLink>
              )
              : (
                <>
                  <NavigationMenuTrigger>{name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-40">
                      {subList?.map(({ name, icon, href, newPage = false }, j) => (
                        <li key={j}>
                          <NavigationMenuLink
                            className="flex flex-row items-center gap-2"
                            href={href}
                            target={newPage ? "_blank" : "_self"}>
                            {icon && <DynamicIcon name={icon}/>}
                            <span>{name}</span>
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
        <NavigationMenuItem>
          <ThemeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </BaseNavigationMenu>
  );
}
