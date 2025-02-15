<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="bg-slate-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 h-screen w-full">
    <div class="bg-neutral-100 dark:bg-neutral-900 max-w-7xl h-screen mx-auto flex items-center justify-center">
      <section class="h-96 w-full flex flex-col items-center justify-center">
        <div class="w-full max-w-3xl grid grid-cols-[1fr_auto_1fr] items-center">
          <div class="w-48 justify-self-end">
            <Logo class="h-full w-full" />
          </div>
          <div class="h-40 w-1 bg-gray-500 justify-self-center mx-8"></div>
          <div class="flex flex-col">
            <h2 class="text-3xl mb-2">{{ props.error?.statusCode }}</h2>
            <h3 class="text-2xl mt-2">{{ props.error?.message }}</h3>
          </div>
        </div>
        <NuxtLink to="/" class="text-neutral-600 dark:text-neutral-400 p-3 border-2 border-neutral-200 dark:border-neutral-800 hover:border-neutral-500 mt-8 text-2xl ">
          <i class="ri-arrow-go-back-fill"></i> 回到主页
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

<style lang="css" scoped>
[class^="ri-"]::before,
[class*="ri-"]::before {
  margin: 0;
}
</style>