<template>
  <header class="bg-base-200 h-14 px-5 md:h-18">
    <div class="drawer mx-auto flex h-full max-w-7xl justify-between">
      <div class="h-full p-1">
        <NuxtLink to="/">
          <ElementsLogo class="h-full w-full object-contain" />
        </NuxtLink>
      </div>
      <div class="hidden h-full flex-1 lg:flex">
        <div class="flex flex-row items-center justify-center">
          <template
            v-for="item in leftMenuItems"
            :key="item.path"
          >
            <button class="btn btn-sm btn-ghost h-full font-medium">
              <NuxtLink
                :to="item.path"
                class="text-base"
                >{{ item.name }}</NuxtLink
              >
            </button>
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
        <button class="btn btn-sm btn-ghost h-full font-medium">
          <NuxtLink
            to="/new"
            class="text-base"
          >
            <i class="ri-add-line" />
            提交博客
          </NuxtLink>
        </button>
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
            <div class="divider"></div>
            <li class="px-3 opacity-40">
              <div
                v-if="!session.user"
                class="flex h-10 w-full items-center justify-center p-0"
              >
                <button
                  class="flex h-full w-full items-center justify-center gap-2"
                  @click="openInPopup('/auth/github')"
                >
                  <i class="ri-admin-line text-base" />
                  管理员您好，请先登录
                </button>
              </div>
              <details
                v-if="session.user"
                open
              >
                <summary class="text-sm">
                  欢迎你，管理员
                  <br />
                  {{ session.user.name }}
                </summary>
                <ul>
                  <li @click="closeDrawer">
                    <NuxtLink
                      to="/admin"
                      class="flex w-full items-center rounded-t-lg px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    >
                      <i class="ri-speed-up-line mr-1" />
                      进入控制台
                    </NuxtLink>
                  </li>
                  <li @click="closeDrawer">
                    <button
                      class="flex w-full items-center rounded-b-lg px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      @click="handleLogout"
                    >
                      <i class="ri-logout-box-r-line mr-1" />
                      退出登录
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div class="hidden h-full items-center md:flex">
          <div
            v-if="!session.user"
            class="flex flex-row items-center justify-center before:mx-1 before:h-6 before:w-px before:bg-neutral-500 before:content-['']"
          >
            <button
              class="btn btn-square btn-xs btn-ghost p-3"
              @click="openInPopup('/auth/github')"
            >
              <i class="ri-admin-line text-base" />
            </button>
          </div>
          <div
            v-if="session.user"
            class="dropdown-hover dropdown group relative flex h-full w-auto flex-row items-center justify-center text-center text-sm font-normal whitespace-nowrap before:mx-1 before:h-6 before:w-px before:bg-neutral-500 before:content-['']"
          >
            <div class="dropdown dropdown-end h-full">
              <div
                tabindex="0"
                role="button"
                class="btn btn-ghost flex h-full flex-col text-sm leading-3 font-normal opacity-50"
              >
                <p>欢迎你，管理员</p>
                <p>
                  {{ session.user.name }}<i class="ri-arrow-down-s-line ml-1" />
                </p>
              </div>
              <ul
                tabindex="0"
                class="dropdown-content menu bg-base-200 rounded-box z-1 p-2 shadow-sm"
              >
                <li>
                  <NuxtLink
                    to="/admin"
                    class="flex w-full items-center rounded-t-lg px-4 py-2 whitespace-nowrap hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  >
                    <i class="ri-speed-up-line mr-1" />
                    进入控制台
                  </NuxtLink>
                </li>
                <li>
                  <button
                    class="flex w-full items-center rounded-b-lg px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    @click="handleLogout"
                  >
                    <i class="ri-logout-box-r-line mr-1" />
                    退出登录
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { LinkItems } from '~/types/components'

const { openInPopup, clear, session } = useUserSession()
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

const handleLogout = async () => {
  await clear()
  const route = useRoute()
  if (route.path.startsWith('/admin')) {
    await navigateTo('/')
  }
}

const closeDrawer = () => {
  const checkbox = document.getElementById('menu-sidebar') as HTMLInputElement
  if (checkbox) {
    checkbox.checked = false
  }
}
</script>
