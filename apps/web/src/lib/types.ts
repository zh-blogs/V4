import type { DynamicIcon } from "lucide-react/dynamic";

export type LucideIconName = React.ComponentProps<typeof DynamicIcon>["name"];

export interface Blog {
  name: string
  url: string
  avatar?: string
}
