<template>
  <div class="text-neutral-900 dark:text-neutral-200 max-w-4xl min-h-64 mx-auto my-0">
    <h2 class="text-4xl text-center font-bold mb-20">中文博客列表导航——博客动态</h2>
    <div>
      <article v-if="allPosts" v-for="post in allPosts" :key="post.path"
        class="p-5 mb-5 border-2 border-solid border-neutral-300 dark:border-neutral-600 rounded-xl">
        <a :href="post.path">
          <h3 class="text-2xl font-semibold">
            <i v-if="post.top" class="ri-pushpin-fill text-red-600 dark:text-red-700"></i>{{ post.title }}</h3>
        </a>
        <p class="my-3 mx-0">{{ post.description }}</p>
        <div class="flex justify-between mt-3 text-lg text-neutral-400 dark:text-neutral-500">
          <div>
            <i class="ri-calendar-fill"></i>
            <span>{{ new Date(post.date).toISOString().split('T')[0] }}</span>
          </div>
          <div>
            <i class="ri-archive-fill"></i>
            <span>{{ post.category }}</span>
          </div>
          <div>
            <i class="ri-price-tag-3-fill"></i>
            <span v-for="tag in post.tags" :key="tag" class="mr-2">{{ tag }}</span>
          </div>
        </div>
      </article>
      <h3 v-else class="text-2xl text-center font-bold mb-20">暂无内容。。。</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
const allPosts = await queryCollection('blog').order('top', "DESC").order('date', "DESC").all()
</script>