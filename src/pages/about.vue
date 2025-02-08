<template>
  <div v-if="page" class="prose prose-neutral dark:prose-invert max-w-none px-24 prose-a:no-underline">
    <ContentRenderer :value="page" />
  </div>
  <div v-else>Page Not Found</div>
</template>

<script lang="ts" setup>
const pageName = "/about"
const { data: page } = await useAsyncData(pageName, () => {
  return queryCollection("page").path("/about").first();
})
</script>