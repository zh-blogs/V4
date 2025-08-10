import type { Blog } from "@web/lib/types";

export function BlogCard({ name, url, avatar }: Blog) {
  return (
    <div
      className="px-4 py-3 min-w-fit rounded-md border bg-card shadow-md inline-flex gap-4 cursor-pointer"
      onClick={() => window.open(url, "_blank")}>
      {avatar && <img src={avatar} alt={name} className="aspect-square w-14"/>}
      <div className="h-full flex flex-col justify-center gap-1">
        <h2 className="text-md font-semibold">{name}</h2>
        <span className="text-sm text-muted-foreground hover:underline">{url}</span>
      </div>
    </div>
  );
}
