<template>
  <header class="bg-base-200 mb-12 h-16 w-full shadow-xl">
    <div class="navbar mx-auto h-full max-w-7xl p-0">
      <div class="flex h-full flex-none">
        <NuxtLink to="/">
          <ElementsLogo class="h-full w-full object-contain" />
        </NuxtLink>
      </div>
      <div class="flex h-full flex-1">
        <div class="flex flex-row items-center justify-center">
          <button class="btn btn-sm btn-ghost h-full font-medium">
            <NuxtLink
              to="/list"
              class="text-base"
              >博客列表</NuxtLink
            >
          </button>
          <button class="btn btn-sm btn-ghost h-full font-medium">
            <NuxtLink
              to="/charts"
              class="text-base"
              >数据统计</NuxtLink
            >
          </button>
          <button class="btn btn-sm btn-ghost h-full font-medium">
            <NuxtLink
              to="/docs"
              class="text-base"
              >项目文档</NuxtLink
            >
          </button>
          <button class="btn btn-sm btn-ghost h-full font-medium">
            <NuxtLink
              to="/blog"
              class="text-base"
              >项目博客</NuxtLink
            >
          </button>
          <button class="btn btn-sm btn-ghost h-full font-medium">
            <NuxtLink
              to="/about"
              class="text-base"
              >关于我们</NuxtLink
            >
          </button>
        </div>
      </div>
      <div class="flex h-full flex-none">
        <div class="flex flex-row items-center justify-center">
          <button class="btn btn-sm btn-ghost h-full font-medium">
            <NuxtLink
              to="/about"
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
              <li class="">
                <NuxtLink
                  class="whitespace-nowrap"
                  to="https://github.com/zh-blogs/blog-daohang/issues/new?template=03-Blog+Information+Report.yml"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="ri-error-warning-line" />
                  博客问题反馈
                  <i
                    class="ri-external-link-line self-end text-xs text-neutral-500"
                  />
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  class="whitespace-nowrap"
                  to="https://github.com/zh-blogs/blog-daohang/issues/new?template=04-Modify+%26+Improve+Blog+Information+Report.yml"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="ri-edit-line" />
                  修改博客信息
                  <i
                    class="ri-external-link-line self-end text-xs text-neutral-500"
                  />
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  class="whitespace-nowrap"
                  to="https://github.com/zh-blogs/blog-daohang/issues/new?template=05-Selected+Blog+Application.yml"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="ri-hand" />
                  精选博客推荐
                  <i
                    class="ri-external-link-line ml-1 self-end text-xs text-neutral-500"
                  />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center before:mx-2 before:h-6 before:w-px before:bg-neutral-500 before:content-['']"
        >
          <button
            class="btn btn-square btn-xs btn-ghost p-3"
            :class="{ 'text-blue-500': colorMode.preference === 'light' }"
            @click="colorMode.preference = 'light'"
          >
            <i class="ri-sun-line text-base" />
          </button>
          <button
            class="btn btn-square btn-xs btn-ghost p-3"
            :class="{ 'text-blue-500': colorMode.preference === 'dark' }"
            @click="colorMode.preference = 'dark'"
          >
            <i class="ri-moon-line text-base" />
          </button>
          <button
            class="btn btn-square btn-xs btn-ghost p-3"
            :class="{ 'text-blue-500': colorMode.preference === 'system' }"
            @click="colorMode.preference = 'system'"
          >
            <i class="ri-computer-line text-base" />
          </button>
        </div>
        <div
          v-if="!session.user"
          class="flex flex-row items-center justify-center before:mx-2 before:h-6 before:w-px before:bg-neutral-500 before:content-['']"
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
          class="group relative flex w-auto flex-row items-center justify-center text-center text-sm font-normal whitespace-nowrap before:mx-3 before:h-6 before:w-px before:bg-neutral-500 before:content-['']"
        >
          <div
            class="rounded-lg px-3 py-1 hover:bg-neutral-300 dark:hover:bg-neutral-700"
          >
            <p>欢迎你，管理员</p>
            <p>
              {{ session.user.name }}<i class="ri-arrow-down-s-line ml-1" />
            </p>
          </div>
          <div
            class="absolute top-full right-0 hidden rounded-lg border bg-white whitespace-nowrap shadow-lg group-hover:block dark:border-neutral-700 dark:bg-neutral-800"
          >
            <NuxtLink
              to="/admin"
              class="flex w-full items-center rounded-t-lg px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              <i class="ri-speed-up-line mr-1" />
              进入控制台
            </NuxtLink>
            <button
              class="flex w-full items-center rounded-b-lg px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              @click="handleLogout"
            >
              <i class="ri-logout-box-r-line mr-1" />
              退出登录
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
const { openInPopup, clear, session } = useUserSession()

const handleLogout = async () => {
  await clear()
  const route = useRoute()
  if (route.path.startsWith('/admin')) {
    await navigateTo('/')
  }
}
</script>
