<template>
  <div
    v-if="blog"
    class="prose prose-neutral dark:prose-invert prose-a:no-underline max-w-none px-30 py-20"
  >
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
