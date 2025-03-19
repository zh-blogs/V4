<template>
  <footer
    class="footer sm:footer-horizontal text-base-content mx-auto max-w-7xl justify-evenly px-5 py-10 md:justify-between md:px-5 md:py-10"
  >
    <aside class="mx-auto flex flex-col">
      <div class="flex flex-row items-center gap-2 md:gap-5">
        <ElementsLogo class="h-24 w-24 object-contain md:h-28 md:w-28" />
        <div
          class="text-sm leading-7 font-bold text-neutral-400 md:text-base dark:text-neutral-500"
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
          <div class="tooltip">
            <ClientOnly>
              <div class="tooltip-content text-left">
                <p>
                  版本哈希：
                  <span class="underline-offset-4 hover:underline">
                    {{ systemInfo.commitHash.slice(0, 8) }}
                  </span>
                </p>
                <p>
                  最后一次提交于：{{
                    new Date(systemInfo.commitTime).toLocaleDateString() +
                    ' ' +
                    new Date(systemInfo.commitTime).toLocaleTimeString()
                  }}
                </p>
                <p v-if="systemInfo.buildTime">
                  构建于：{{
                    new Date(systemInfo?.buildTime).toLocaleDateString() +
                    ' ' +
                    new Date(systemInfo?.buildTime).toLocaleTimeString()
                  }}
                </p>
              </div>
            </ClientOnly>
            <NuxtLink
              class="underline-offset-4 hover:underline"
              :to="systemInfo.commitLink"
              rel="noopener noreferrer"
            >
              当前程序版本：V4.{{ systemInfo.version }}
            </NuxtLink>
          </div>
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
    <div class="mx-auto grid grid-cols-2 lg:gap-20">
      <nav class="grid grid-cols-1 pl-6 leading-7 md:pl-0">
        <h6 class="footer-title">快速访问</h6>
        <template
          v-for="item in quickLinks"
          :key="item.path"
        >
          <NuxtLink
            :to="item.path"
            class="link link-hover"
            :target="item.blank === true ? '_blank' : ''"
          >
            {{ item.name }}
          </NuxtLink>
        </template>
      </nav>
      <nav class="grid grid-cols-1 text-center leading-7 sm:text-right">
        <h6 class="footer-title">友情链接</h6>
        <template
          v-for="item in friendLinks"
          :key="item.path"
        >
          <NuxtLink
            :to="item.path"
            class="link link-hover"
          >
            {{ item.name }}
          </NuxtLink>
        </template>
      </nav>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import type { LinkItems } from '~/types/components'
import info from '~/assets/system-info.json'

interface SystemInfo {
  version: string
  commitTime: string
  commitHash: string
  commitLink: string
  buildTime?: string
}

const quickLinks: LinkItems = [
  { name: '博客列表', path: '/list' },
  { name: '数据统计', path: '/charts' },
  { name: '随机跳转', path: '/random', blank: true },
  { name: '项目文档', path: '/docs' },
  { name: '项目博客', path: '/blog' },
  { name: '关于我们', path: '/about' },
]

const friendLinks: LinkItems = [
  {
    name: '开往',
    path: 'https://www.travellings.cn/',
  },
  {
    name: '博友圈',
    path: 'https://www.boyouquan.com/',
  },
  {
    name: 'BlogFinder',
    path: 'https://bf.zzxworld.com/',
  },
  {
    name: '中文独立博客列表',
    path: 'https://github.com/timqian/chinese-independent-blogs',
  },
  {
    name: '优秀个人独立博客导航',
    path: 'http://www.jetli.com.cn/',
  },
]

const systemInfo = info as SystemInfo
</script>
