<template>
  <header class="bg-base-200 h-14 px-5 md:h-18">
    <div class="drawer mx-auto flex h-full max-w-7xl justify-between">
      <div class="h-full p-1">
        <NuxtLink to="/">
          <ElementsLogo class="h-full object-contain" />
        </NuxtLink>
      </div>
      <div class="hidden h-full flex-1 lg:flex">
        <div class="flex flex-row items-center justify-center">
          <template
            v-for="item in leftMenuItems"
            :key="item.path"
          >
            <NuxtLink
              :to="item.path"
              class="h-full"
            >
              <button class="btn btn-sm btn-ghost h-full text-base font-medium">
                {{ item.name }}
              </button>
            </NuxtLink>
          </template>
        </div>
      </div>
      <div class="hidden h-full flex-1 md:flex lg:hidden">
        <div class="dropdown-hover dropdown">
          <button
            tabindex="0"
            role="button"
            class="btn-sm btn-ghost !h-full !text-base font-medium"
          >
            站内导航
            <i class="ri-arrow-down-s-line" />
          </button>
          <ul
            tabindex="0"
            class="dropdown-content menu rounded-box z-1 bg-neutral-100 shadow-sm dark:bg-neutral-800"
          >
            <template
              v-for="item in leftMenuItems"
              :key="item.path"
            >
              <li>
                <NuxtLink
                  class="whitespace-nowrap"
                  :to="item.path"
                >
                  {{ item.name }}
                </NuxtLink>
              </li>
            </template>
          </ul>
        </div>
      </div>

      <div class="hidden flex-row items-center justify-center md:flex">
        <NuxtLink
          to="/new"
          class="h-full"
        >
          <button class="btn btn-sm btn-ghost h-full text-base font-medium">
            <i class="ri-add-line" />
            提交博客
          </button>
        </NuxtLink>
        <div class="dropdown-hover dropdown h-full">
          <button
            tabindex="0"
            role="button"
            class="btn btn-sm btn-ghost !h-full !text-base font-medium"
          >
            <i class="ri-feedback-line" />
            项目反馈
            <i class="ri-arrow-down-s-line" />
          </button>
          <ul
            tabindex="0"
            class="dropdown-content menu rounded-box z-1 bg-neutral-100 shadow-sm dark:bg-neutral-800"
          >
            <template
              v-for="item in rightMenuItems"
              :key="item.path"
            >
              <li>
                <NuxtLink
                  class="whitespace-nowrap"
                  :to="item.path"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="ri-error-warning-line" />
                  {{ item.name }}
                  <i
                    class="ri-external-link-line self-end text-xs text-neutral-500"
                  />
                </NuxtLink>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="flex flex-row items-center">
        <ClientOnly>
          <div>
            <button
              class="btn btn-square btn-sm btn-ghost"
              :class="{ 'text-blue-500': colorMode.preference === 'light' }"
              @click="colorMode.preference = 'light'"
            >
              <i class="ri-sun-line text-base" />
            </button>
            <button
              class="btn btn-square btn-sm btn-ghost"
              :class="{ 'text-blue-500': colorMode.preference === 'dark' }"
              @click="colorMode.preference = 'dark'"
            >
              <i class="ri-moon-line text-base" />
            </button>
            <button
              class="btn btn-square btn-sm btn-ghost"
              :class="{ 'text-blue-500': colorMode.preference === 'system' }"
              @click="colorMode.preference = 'system'"
            >
              <i class="ri-computer-line text-base" />
            </button>
          </div>
        </ClientOnly>
        <input
          id="menu-sidebar"
          type="checkbox"
          class="drawer-toggle"
        />
        <div
          class="drawer-content flex items-center before:mx-2 before:h-6 before:w-px before:bg-neutral-500 before:content-[''] md:hidden"
        >
          <label
            for="menu-sidebar"
            class="btn btn-square btn-sm btn-ghost"
          >
            <i class="ri-menu-line text-base"></i>
          </label>
        </div>

        <div class="drawer-side z-10 md:hidden">
          <label
            for="menu-sidebar"
            aria-label="close sidebar"
            class="drawer-overlay"
          ></label>
          <ul
            class="menu bg-base-200 text-base-content z-10 min-h-full w-60 pt-3"
          >
            <li @click="closeDrawer">
              <header>
                <NuxtLink
                  to="/"
                  class="flex h-18 w-full flex-row items-center justify-start"
                >
                  <ElementsLogo class="h-full object-contain" />
                  <div>
                    <h1 class="text-xl font-bold">集博栈</h1>
                    <p class="text-sm opacity-50">原中文博客列表导航</p>
                  </div>
                </NuxtLink>
              </header>
            </li>
            <li>
              <details open>
                <summary class="text-sm opacity-70">站内导航</summary>
                <ul>
                  <template
                    v-for="item in leftMenuItems"
                    :key="item.path"
                  >
                    <li @click="closeDrawer">
                      <NuxtLink :to="item.path">{{ item.name }}</NuxtLink>
                    </li>
                  </template>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary class="text-sm opacity-70">项目反馈</summary>
                <ul>
                  <template
                    v-for="item in rightMenuItems"
                    :key="item.path"
                  >
                    <li
                      class="flex flex-row"
                      @click="closeDrawer"
                    >
                      <NuxtLink
                        :to="item.path"
                        class="pr-1"
                        >{{ item.name }}</NuxtLink
                      >
                      <i
                        class="ri-external-link-line self-end p-0 py-1.5 text-xs text-neutral-500"
                      />
                    </li>
                  </template>
                </ul>
              </details>
            </li>
            <div class="divider"></div>
            <li
              class="px-3"
              @click="closeDrawer"
            >
              <button class="btn btn-sm btn-outline">
                <NuxtLink
                  to="/new"
                  class="text-base"
                >
                  <i class="ri-add-line" />
                  提交博客
                </NuxtLink>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { LinkItems } from '~/types/components'

const colorMode = useColorMode()
const leftMenuItems: LinkItems = [
  {
    name: '博客列表',
    path: '/list',
  },
  {
    name: '数据统计',
    path: '/charts',
  },
  {
    name: '项目文档',
    path: '/docs',
  },
  {
    name: '项目博客',
    path: '/blog',
  },
  {
    name: '关于我们',
    path: '/about',
  },
]
const rightMenuItems: LinkItems = [
  {
    name: '博客问题反馈',
    path: 'https://github.com/zh-blogs/blog-daohang/issues/new?template=03-Blog+Information+Report.yml',
  },
  {
    name: '修改博客信息',
    path: 'https://github.com/zh-blogs/blog-daohang/issues/new?template=04-Modify+%26+Improve+Blog+Information+Report.yml',
  },
  {
    name: '精选博客推荐',
    path: 'https://github.com/zh-blogs/blog-daohang/issues/new?template=05-Selected+Blog+Application.yml',
  },
]

const closeDrawer = () => {
  const checkbox = document.getElementById('menu-sidebar') as HTMLInputElement
  if (checkbox) {
    checkbox.checked = false
  }
}
</script>
