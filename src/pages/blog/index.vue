<template>
  <div
    class="mx-auto my-0 min-h-64 max-w-4xl text-neutral-900 dark:text-neutral-200"
  >
    <h2 class="mb-20 text-center text-4xl font-bold">
      中文博客列表导航——博客动态
    </h2>
    <div v-if="allPosts">
      <article
        v-for="post in allPosts"
        :key="post.path"
        class="mb-5 rounded-xl border-2 border-solid border-neutral-300 p-5 dark:border-neutral-600"
      >
        <a :href="post.path">
          <h3 class="text-2xl font-semibold">
            <i
              v-if="post.top"
              class="ri-pushpin-fill text-red-600 dark:text-red-700"
            />{{ post.title }}
          </h3>
        </a>
        <p class="mx-0 my-3">
          {{ post.description }}
        </p>
        <div
          class="mt-3 flex justify-between text-lg text-neutral-400 dark:text-neutral-500"
        >
          <div>
            <i class="ri-calendar-fill" />
            <span>{{ new Date(post.date).toISOString().split('T')[0] }}</span>
          </div>
          <div>
            <i class="ri-archive-fill" />
            <span>{{ post.category }}</span>
          </div>
          <div>
            <i class="ri-price-tag-3-fill" />
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="mr-2"
              >{{ tag }}</span
            >
          </div>
        </div>
      </article>
    </div>
    <div v-else>
      <h3 class="mb-20 text-center text-2xl font-bold">暂无内容。。。</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const allPosts = await queryCollection('blog')
    .order('top', 'DESC')
    .order('date', 'DESC')
    .all()
</script>
