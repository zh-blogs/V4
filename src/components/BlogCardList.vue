<template>
  <div
    class="grid h-fit min-h-10 w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
  >
    <div
      v-if="status === 'pending'"
      class="col-span-4 mx-auto"
    >
      <span
        class="loading loading-bars loading-md sm:loading-xl col-span-4"
      ></span>
    </div>
    <div
      v-else-if="status === 'error'"
      class="col-span-4 mx-auto"
    >
      <span>请求失败，请刷新重试</span>
    </div>
    <div
      v-else-if="status === 'success' && !result?.data"
      class="col-span-4 mx-auto"
    >
      <span>无数据</span>
    </div>

    <template
      v-for="blog in result?.data"
      v-else
      :key="blog.bid"
    >
      <ElementsBlogCard :blog="blog" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { BlogVO } from '~/shared/types/blog'
import type { ResultType } from '~~/server/result'

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
})

const {
  data: result,
  status,
  refresh,
} = useFetch<ResultType<BlogVO[]>>(props.path, {
  params: { size: 12 },
})

defineExpose({
  refresh,
})
</script>
