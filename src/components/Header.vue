<template>
  <header class="bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 h-16 w-full shadow-xl relative">
    <div class="h-full max-w-6xl mx-auto flex flex-row items-center justify-center">
      <div class="h-full mx-10">
        <a href="/">
          <img class="h-full" src="/logo-dark.webp" alt="logo">
        </a>
      </div>
      <div class="h-full mx-10 flex ">
        <ul class="h-full flex flex-row">
          <li
            class="w-auto h-full px-4 text-xl font-bold hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center">
            <a href="/list">博客列表</a>
          </li>
          <li
            class="w-auto h-full px-4 text-xl font-bold hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center">
            <a href="/chart">数据统计</a>
          </li>
          <li
            class="w-auto h-full px-4 text-xl font-bold hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center">
            <a href="/docs">项目文档</a>
          </li>
          <li
            class="w-auto h-full px-4 text-xl font-bold hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center">
            <a href="/blog">博客动态</a>
          </li>
          <li
            class="w-auto h-full px-4 text-xl font-bold hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center">
            <a href="/about">关于我们</a>
          </li>
        </ul>
      </div>
      <div class="h-full mx-10 flex">
        <div class="flex flex-row items-center justify-center">
          <button @click="colorMode.preference = 'light'"
            class="p-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700"
            :class="{ 'text-blue-500': colorMode.preference === 'light' }">
            <i class="ri-sun-line text-xl"></i>
          </button>
          <button @click="colorMode.preference = 'dark'"
            class="p-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700"
            :class="{ 'text-blue-500': colorMode.preference === 'dark' }">
            <i class="ri-moon-line text-xl"></i>
          </button>
          <button @click="colorMode.preference = 'system'"
            class="p-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700"
            :class="{ 'text-blue-500': colorMode.preference === 'system' }">
            <i class="ri-computer-line text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
colorMode.preference = 'light'
const iconMode = computed(() => {
  if (import.meta.client) {
    return `/logo-${colorMode.value}.webp`
  }
  return `/logo-light.webp`
})
</script>

<style></style>