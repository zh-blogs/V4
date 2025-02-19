<template>
  <footer class="w-full mt-auto py-12">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col justify-center text-neutral-500 dark:text-neutral-500 text-lg leading-10">
        <div class="w-full text-center"><span>尝试链接几乎所有的中文博客</span></div>
        <div class="w-full text-center"><span>Copyright © 2022 - {{ year }} |
            <NuxtLink to="https://github.com/zh-blogs">
              <i class="ri-github-fill"></i> 中文博客列表导航项目
            </NuxtLink>
          </span></div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const year = computed(() => {
  return new Date().toLocaleDateString().split("/")[0]
})
</script>