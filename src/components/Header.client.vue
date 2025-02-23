<template>
  <header class="bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200 h-14 w-full mb-12 shadow-xl">
    <div class="navbar max-w-7xl mx-auto h-full">
      <div class="flex-none flex h-full">
        <NuxtLink to="/">
          <ElementsLogo class="h-full w-full object-contain" />
        </NuxtLink>
      </div>
      <div class="flex-1 flex h-full">
        <div class="h-10 w-full flex self-end">
          <button class="btn btn-ghost btn-sm font-medium">
            <NuxtLink to="/list" class="text-base ">博客列表</NuxtLink>
          </button>
          <button class="btn btn-ghost btn-sm font-medium">
            <NuxtLink to="/charts" class="text-base ">数据统计</NuxtLink>
          </button>
          <button class="btn btn-ghost btn-sm font-medium">
            <NuxtLink to="/docs" class="text-base ">项目文档</NuxtLink>
          </button>
          <button class="btn btn-ghost btn-sm font-medium">
            <NuxtLink to="/blog" class="text-base ">项目博客</NuxtLink>
          </button>
          <button class="btn btn-ghost btn-sm font-medium">
            <NuxtLink to="/about" class="text-base ">关于我们</NuxtLink>
          </button>
        </div>
      </div>
      <div class="flex-none flex h-full">
        <div class="h-10 w-full flex self-end">
          <button class="btn btn-ghost btn-sm font-medium">
            <NuxtLink to="/about" class="text-base ">
              <i class="ri-add-line"></i>
              博客加入
            </NuxtLink>
          </button>
          <div class="dropdown dropdown-hover">
            <button tabindex="0" role="button" class="btn btn-ghost btn-sm font-medium !text-base">
              <i class="ri-feedback-line"></i>
              项目反馈
              <i class="ri-arrow-down-s-line"></i>
            </button>
            <ul tabindex="0" class="dropdown-content menu bg-neutral-100 dark:bg-neutral-800 rounded-box z-1 shadow-sm">
              <li class="">
                <NuxtLink class="whitespace-nowrap"
                  to="https://github.com/zh-blogs/blog-daohang/issues/new?template=03-Blog+Information+Report.yml"
                  target="_blank" rel="noopener noreferrer">
                  <i class="ri-error-warning-line"></i>
                  博客问题反馈
                  <i class="ri-external-link-line text-xs text-neutral-500 self-end"></i>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="whitespace-nowrap"
                  to="https://github.com/zh-blogs/blog-daohang/issues/new?template=04-Modify+%26+Improve+Blog+Information+Report.yml"
                  target="_blank" rel="noopener noreferrer">
                  <i class="ri-edit-line"></i>
                  修改博客信息
                  <i class="ri-external-link-line text-xs text-neutral-500 self-end"></i>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="whitespace-nowrap"
                  to="https://github.com/zh-blogs/blog-daohang/issues/new?template=05-Selected+Blog+Application.yml"
                  target="_blank" rel="noopener noreferrer">
                  <i class="ri-hand mr-1"></i>
                  精选博客推荐
                  <i class="ri-external-link-line ml-1 text-xs text-neutral-500 self-end"></i>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center before:content-[''] before:h-6 before:w-px before:bg-neutral-500 before:mx-2">
          <button @click="colorMode.preference = 'light'" class="btn btn-square btn-xs btn-ghost p-3"
            :class="{ 'text-blue-500': colorMode.preference === 'light' }">
            <i class="ri-sun-line text-base"></i>
          </button>
          <button @click="colorMode.preference = 'dark'" class="btn btn-square btn-xs btn-ghost p-3"
            :class="{ 'text-blue-500': colorMode.preference === 'dark' }">
            <i class="ri-moon-line text-base"></i>
          </button>
          <button @click="colorMode.preference = 'system'" class="btn btn-square btn-xs btn-ghost p-3"
            :class="{ 'text-blue-500': colorMode.preference === 'system' }">
            <i class="ri-computer-line text-base"></i>
          </button>
        </div>
        <div v-if="!session.user"
          class="flex flex-row items-center justify-center before:content-[''] before:h-6 before:w-px before:bg-neutral-500 before:mx-2">
          <button @click="openInPopup('/auth/github')" class="btn btn-square btn-xs btn-ghost p-3">
            <i class="ri-admin-line text-base"></i>
          </button>
        </div>
        <div v-if="session.user"
          class="group relative w-auto whitespace-nowrap flex flex-row items-center justify-center before:content-[''] before:h-6 before:w-px before:bg-neutral-500 before:mx-3 text-sm text-center font-normal">
          <div class="px-3 py-1 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700">
            <p>欢迎你，管理员</p>
            <p>{{ session.user.name }}<i class="ri-arrow-down-s-line ml-1"></i></p>
          </div>
          <div
            class="absolute top-full hidden group-hover:block right-0 whitespace-nowrap bg-white dark:bg-neutral-800 rounded-lg shadow-lg border dark:border-neutral-700">
            <NuxtLink to="/admin"
              class="flex w-full items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-t-lg">
              <i class="ri-speed-up-line mr-1"></i>
              进入控制台
            </NuxtLink>
            <button @click="handleLogout"
              class="flex w-full items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-b-lg">
              <i class="ri-logout-box-r-line mr-1"></i>
              退出登录
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
const { openInPopup, clear, session } = useUserSession();

const handleLogout = async () => {
  await clear();
  const route = useRoute();
  if (route.path.startsWith('/admin')) {
    await navigateTo('/');
  }
};
</script>