<template>
  <div
    v-if="page"
    class="prose prose-neutral dark:prose-invert prose-a:no-underline max-w-none px-30 py-20"
  >
    <ContentRenderer :value="page" />
  </div>
  <div v-else>Page Not Found</div>
</template>

<script lang="ts" setup>
const pageName = '/about'
const { data: page } = await useAsyncData(pageName, () => {
  return queryCollection('page').path('/about').first()
})
</script>
