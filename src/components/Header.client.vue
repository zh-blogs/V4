<template>
  <header class="bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 h-16 w-full shadow-xl relative">
    <div class="h-full text-base font-semibold max-w-7xl mx-auto flex flex-row items-center justify-between">
      <div class="h-full mx-3 flex items-center">
        <NuxtLink href="/">
          <Logo class="h-14 w-14" />
        </NuxtLink>
      </div>
      <div class="h-full mx-3 flex ">
        <ul class="h-full flex flex-row">
          <li class="w-auto h-full px-3 hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center">
            <NuxtLink href="/list">博客列表</NuxtLink>
          </li>
          <li class="w-auto h-full px-3 hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center">
            <NuxtLink href="/chart">数据统计</NuxtLink>
          </li>
          <li class="w-auto h-full px-3 hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center">
            <NuxtLink href="/docs">项目文档</NuxtLink>
          </li>
          <li class="w-auto h-full px-3 hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center">
            <NuxtLink href="/blog">项目博客</NuxtLink>
          </li>
          <li class="w-auto h-full px-3 hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center">
            <NuxtLink href="/about">关于我们</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="h-full mx-3 flex ">
        <ul class="h-full flex flex-row">
          <li class="w-auto h-full px-3 hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center">
            <NuxtLink href="/docs">申请加入</NuxtLink>
          </li>
          <li class="w-auto h-full px-3 hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center">
            <NuxtLink href="/blog">问题反馈</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="h-full mx-3 flex">
        <div class="flex flex-row items-center justify-center">
          <button @click="colorMode.preference = 'light'"
            class="p-1 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700"
            :class="{ 'text-blue-500': colorMode.preference === 'light' }">
            <i class="ri-sun-line "></i>
          </button>
          <button @click="colorMode.preference = 'dark'"
            class="p-1 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700"
            :class="{ 'text-blue-500': colorMode.preference === 'dark' }">
            <i class="ri-moon-line "></i>
          </button>
          <button @click="colorMode.preference = 'system'"
            class="p-1 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700"
            :class="{ 'text-blue-500': colorMode.preference === 'system' }">
            <i class="ri-computer-line "></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
</script>

<style></style>