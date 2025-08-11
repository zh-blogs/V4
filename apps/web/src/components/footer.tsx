import { Github, Mail } from "lucide-react";
import { Link } from "./link";
import { Logo } from "./logo";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="w-full h-52 border-t flex flex-col justify-center items-center gap-2 [&_a]:text-sm">
      <div className="flex items-center gap-10 [&>div]:flex [&>div]:items-center">
        <div>
          <Logo />
          <Button
            variant="ghost"
            size="icon"
            asChild>
            <Link href="https://github.com/zh-blogs" target="_blank">
              <Github />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild>
            <Link href="mailto:contact@mail.zhblogs.net">
              <Mail />
            </Link>
          </Button>
        </div>
        <div className="gap-4">
          <Link href="/list">
            博客列表
          </Link>
          <Link href="/charts">
            数据统计
          </Link>
          <Link href="/random">
            随机跳转
          </Link>
          <Link href="/docs">
            项目文档
          </Link>
          <Link href="/blog">
            项目博客
          </Link>
          <Link href="/about">
            关于我们
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 [&>*]:text-sm [&>*]:text-muted-foreground">
        <span>尝试链接几乎所有中文博客 - 集博栈 Copyright © 2022 - 2025</span>
        <span>
          <Link href="https://beian.miit.gov.cn" target="_blank">陇ICP备 2021003047号-5</Link>
        </span>
      </div>
    </footer>
  );
}
