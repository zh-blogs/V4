<template>
  <footer class="w-full mt-auto my-10 py-10">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col justify-center text-neutral-500 dark:text-neutral-500 text-lg leading-10">
        <div class="w-full text-center"><span>尝试链接几乎所有的中文博客</span></div>
        <div class="w-full text-center"><span>© 中文博客导航 2022 - {{ year }}</span></div>
        <div class="w-full text-center"><a href="https://github.com/zh-blogs"><i
              class="ri-github-fill"></i><span>zh-blogs/blog-daohang</span></a></div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const year = computed(() => {
  return new Date().toLocaleDateString().split("/")[0]
})
</script>