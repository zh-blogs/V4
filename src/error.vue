<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <div class="h-screen w-full">
    <div
      class="bg-base-200 mx-auto flex h-screen max-w-7xl items-center justify-center"
    >
      <section class="flex h-96 w-full flex-col items-center justify-center">
        <div
          class="grid w-full max-w-5xl grid-cols-[1fr_auto_1fr] items-center"
        >
          <div class="w-48 justify-self-end">
            <ElementsLogo class="h-full w-full" />
          </div>
          <div class="mx-8 h-40 w-1 justify-self-center bg-neutral-500" />
          <div class="flex flex-col">
            <h2 class="mb-2 text-4xl">
              {{ props.error?.statusCode }}
            </h2>
            <h3 class="mt-2 text-xl">
              {{ props.error?.message }}
            </h3>
          </div>
        </div>
        <NuxtLink
          to="/"
          class="btn btn-xl btn-outline"
        >
          <i class="ri-arrow-go-back-fill" /> 回到主页
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

<style lang="css" scoped>
[class^='ri-']::before,
[class*='ri-']::before {
  margin: 0;
}
</style>
