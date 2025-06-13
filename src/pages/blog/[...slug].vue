<template>
  <div
    v-if="blog"
    class="prose prose-neutral dark:prose-invert prose-a:no-underline max-w-none px-30 py-20"
  >
    <h1 class="w-full text-center">{{ blog.title }}</h1>
    <div class="my-5 flex w-full justify-center">
      <!-- 文章元信息 -->
      <div
        class="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400"
      >
        <div class="flex items-center gap-1">
          <i class="ri-calendar-fill" />
          <time>{{ new Date(blog.date).toLocaleDateString('zh-CN') }}</time>
        </div>
        <div class="flex items-center gap-1">
          <i class="ri-archive-fill" />
          <span>{{ blog.category }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <i class="ri-price-tag-3-fill" />
          <span
            v-for="tag in blog.tags"
            :key="tag"
            class="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <ContentRenderer :value="blog" />
  </div>
  <div v-else>Blog Not Found</div>
</template>

<script lang="ts" setup>
const COLLECTION_NAME = 'blog'
const route = useRoute()
const slug = route.params.slug
const path = computed(() => {
  if (Array.isArray(slug)) {
    return `/${COLLECTION_NAME}/` + slug.join('/')
  }
  return `/${COLLECTION_NAME}/` + slug
})
const { data: blog } = await useAsyncData(`${path.value}`, () => {
  return queryCollection(COLLECTION_NAME).path(path.value).first()
})
</script>
