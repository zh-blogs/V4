<template>
  <footer
    class="footer sm:footer-horizontal text-base-content mx-auto max-w-7xl px-5 py-10 md:p-10"
  >
    <aside class="mx-auto flex flex-col">
      <div class="flex flex-row items-center gap-2 md:gap-5">
        <ElementsLogo class="h-24 w-24 object-contain md:h-28 md:w-28" />
        <div
          class="leading-7 font-bold text-neutral-400 md:text-base dark:text-neutral-500"
        >
          <p>尝试链接几乎所有的中文博客</p>
          <NuxtLink
            to="https://beian.miit.gov.cn"
            class="link link-hover"
          >
            闽ICP备 2023011626号-3
          </NuxtLink>
          <p>
            Copyright © 2022 -
            {{ new Date().getFullYear() }}
          </p>
        </div>
      </div>
      <div
        class="flex flex-row px-5 text-4xl text-neutral-600 dark:text-neutral-400"
      >
        <NuxtLink to="https://github.com/zh-blogs">
          <i class="ri-github-fill" />
        </NuxtLink>
      </div>
    </aside>
    <div class="mx-auto grid grid-cols-2">
      <nav class="grid grid-cols-1 leading-7">
        <h6 class="footer-title">快速访问</h6>
        <NuxtLink
          to="/list"
          class="link link-hover"
        >
          博客列表
        </NuxtLink>
        <NuxtLink
          to="/charts"
          class="link link-hover"
        >
          数据统计
        </NuxtLink>
        <NuxtLink
          to="/random"
          class="link link-hover"
        >
          随机跳转
        </NuxtLink>
        <NuxtLink
          to="/docs"
          class="link link-hover"
        >
          项目文档
        </NuxtLink>
        <NuxtLink
          to="/blog"
          class="link link-hover"
        >
          项目博客
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="link link-hover"
        >
          关于我们
        </NuxtLink>
      </nav>
      <nav class="grid grid-cols-1 leading-7">
        <h6 class="footer-title">友情链接</h6>
        <NuxtLink
          to="https://www.travellings.cn/"
          class="link link-hover"
        >
          开往
        </NuxtLink>
        <NuxtLink
          to="https://www.boyouquan.com/"
          class="link link-hover"
        >
          博友圈
        </NuxtLink>
        <NuxtLink
          to="https://bf.zzxworld.com/"
          class="link link-hover"
        >
          BlogFinder
        </NuxtLink>
        <NuxtLink
          to="https://github.com/timqian/chinese-independent-blogs"
          class="link link-hover"
        >
          中文独立博客列表
        </NuxtLink>
        <NuxtLink
          to="http://www.jetli.com.cn/"
          class="link link-hover"
        >
          优秀个人独立博客导航
        </NuxtLink>
      </nav>
    </div>
  </footer>
</template>

<script lang="ts" setup></script>
