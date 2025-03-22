<template>
  <div class="mx-auto my-8 min-h-screen max-w-4xl px-4 py-20">
    <!-- 页面标题区域 -->
    <header class="mb-12">
      <h1
        class="text-center text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200"
      >
        中文博客列表导航
      </h1>
    </header>

    <!-- 文章列表 -->
    <div
      v-if="allPosts?.length"
      class="space-y-6"
    >
      <article
        v-for="post in allPosts"
        :key="post.path"
        class="group relative rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
      >
        <!-- 置顶标记 -->
        <div
          v-if="post.top"
          class="absolute top-4 right-4"
        >
          <i class="ri-pushpin-fill text-lg text-red-600 dark:text-red-500" />
        </div>

        <!-- 文章标题 -->
        <a
          :href="post.path"
          class="block"
        >
          <h2
            class="group-hover:text-primary-600 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
          >
            {{ post.title }}
          </h2>
        </a>

        <!-- 文章描述 -->
        <p class="mt-3 text-neutral-600 dark:text-neutral-400">
          {{ post.description }}
        </p>

        <!-- 文章元信息 -->
        <div
          class="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400"
        >
          <div class="flex items-center gap-1">
            <i class="ri-calendar-fill" />
            <time>{{ new Date(post.date).toLocaleDateString('zh-CN') }}</time>
          </div>
          <div class="flex items-center gap-1">
            <i class="ri-archive-fill" />
            <span>{{ post.category }}</span>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <i class="ri-price-tag-3-fill" />
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <!-- 空状态 -->
    <div
      v-else
      class="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700"
    >
      <i class="ri-article-line mb-4 text-4xl text-neutral-400" />
      <p class="text-lg text-neutral-600 dark:text-neutral-400">暂无文章</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const allPosts = await queryCollection('blog')
  .order('top', 'DESC')
  .order('date', 'DESC')
  .all()
</script>
