<template>
  <header class="bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200 mb-12 h-14 w-full shadow-xl relative">
    <div class="h-full text-base font-bold max-w-7xl mx-auto flex flex-row items-center justify-between">
      <div class="h-full w-auto">
        <NuxtLink to="/">
          <ElementsLogo class="h-full w-full object-contain" />
        </NuxtLink>
      </div>
      <div class="h-full w-auto flex flex-1 items-center">
        <div class="h-10 w-full flex">
          <button type="button" title="查看博客列表"
            class="h-full w-auto px-3 rounded-lg hover:bg-neutral-300 hover:dark:bg-neutral-700 flex items-center">
            <NuxtLink to="/list">博客列表</NuxtLink>
          </button>
          <button type="button" title="查看数据统计"
            class="h-full w-auto px-3 rounded-lg hover:bg-neutral-300 hover:dark:bg-neutral-700 flex items-center">
            <NuxtLink to="/chart">数据统计</NuxtLink>
          </button>
          <button type="button" title="查看项目文档"
            class="h-full w-auto px-3 rounded-lg hover:bg-neutral-300 hover:dark:bg-neutral-700 flex items-center">
            <NuxtLink to="/docs">项目文档</NuxtLink>
          </button>
          <button type="button" title="查看项目博客"
            class="h-full w-auto px-3 rounded-lg hover:bg-neutral-300 hover:dark:bg-neutral-700 flex items-center">
            <NuxtLink to="/blog">项目博客</NuxtLink>
          </button>
          <button type="button" title="关于我们"
            class="h-full w-auto px-3 rounded-lg hover:bg-neutral-300 hover:dark:bg-neutral-700 flex items-center">
            <NuxtLink to="/about">关于我们</NuxtLink>
          </button>
        </div>
      </div>
      <div class="h-full mx-3 flex items-center">
        <div class="h-10 w-full flex">
          <button type="button" title="添加新博客"
            class="h-full w-auto px-3 rounded-lg hover:bg-neutral-300 hover:dark:bg-neutral-700 flex items-center">
            <i class="ri-add-line mr-1"></i>
            博客加入
          </button>
          <div class="relative group">
            <button type="button" title="查看反馈选项"
              class="h-full w-auto px-3 rounded-lg hover:bg-neutral-300 hover:dark:bg-neutral-700 flex items-center">
              <i class="ri-feedback-line mr-1"></i>
              项目反馈
              <i class="ri-arrow-down-s-line ml-1"></i>
            </button>
            <div
              class=" absolute hidden group-hover:block right-0 whitespace-nowrap bg-white dark:bg-neutral-800 rounded-lg shadow-lg border dark:border-neutral-700">
              <NuxtLink to="https://github.com/zh-blogs/blog-daohang/issues/new?template=03-Blog+Information+Report.yml"
                target="_blank" rel="noopener noreferrer"
                class="flex items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-t-lg">
                <i class="ri-error-warning-line mr-1"></i>
                博客问题反馈
                <i class="ri-external-link-line ml-1 text-xs text-neutral-500 self-end"></i>
              </NuxtLink>
              <NuxtLink
                to="https://github.com/zh-blogs/blog-daohang/issues/new?template=04-Modify+%26+Improve+Blog+Information+Report.yml"
                target="_blank" rel="noopener noreferrer"
                class="flex items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                <i class="ri-edit-line mr-1"></i>
                修改博客信息
                <i class="ri-external-link-line ml-1 text-xs text-neutral-500 self-end"></i>
              </NuxtLink>
              <NuxtLink
                to="https://github.com/zh-blogs/blog-daohang/issues/new?template=05-Selected+Blog+Application.yml"
                target="_blank" rel="noopener noreferrer"
                class="flex items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-b-lg">
                <i class="ri-hand mr-1"></i>
                精选博客推荐
                <i class="ri-external-link-line ml-1 text-xs text-neutral-500 self-end"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-center before:content-[''] before:h-6 before:w-px before:bg-neutral-500 before:mx-3">
          <button type="button" title="切换至浅色模式" @click="colorMode.preference = 'light'"
            class="p-1 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700"
            :class="{ 'text-blue-500': colorMode.preference === 'light' }">
            <i class="ri-sun-line py-1 px-0.5"></i>
          </button>
          <button type="button" title="切换至深色模式" @click="colorMode.preference = 'dark'"
            class="p-1 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700"
            :class="{ 'text-blue-500': colorMode.preference === 'dark' }">
            <i class="ri-moon-line py-1 px-0.5"></i>
          </button>
          <button type="button" title="跟随系统主题" @click="colorMode.preference = 'system'"
            class="p-1 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700"
            :class="{ 'text-blue-500': colorMode.preference === 'system' }">
            <i class="ri-computer-line py-1 px-0.5"></i>
          </button>
        </div>
        <div v-if="!session.user"
          class="flex flex-row items-center justify-center before:content-[''] before:h-6 before:w-px before:bg-neutral-500 before:mx-3">
          <button type="button" title="GitHub 登录" @click="openInPopup('/auth/github')"
            class="p-1 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700">
            <i class="ri-admin-line"></i>
          </button>
        </div>
        <div v-if="session.user"
          class="w-auto flex flex-row items-center justify-center before:content-[''] before:h-6 before:w-px before:bg-neutral-500 before:mx-3 text-sm text-center font-normal">
          <NuxtLink to="/admin" class="px-3 py-1 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700">
            <p>欢迎你，管理员</p>
            <p>{{ session.user.name }}</p>
          </NuxtLink>
        </div>
      </div>
      <!-- <div class="w-full text-center"><a href="https://github.com/zh-blogs"><i
        class="ri-github-fill"></i><span>zh-blogs/blog-daohang</span></a></div> -->
    </div>
  </header>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
const { openInPopup, session } = useUserSession();
</script>