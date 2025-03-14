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

// const modalOpen = ref(false)
// // 关闭模态框
// const closeModal = () => {
//   modalOpen.value = false
// }

// // 根据主标签返回对应的样式类
// const getMainTagClass = (tag) => {
//   const tagMap = {
//     生活: 'bg-green-100 text-green-800',
//     技术: 'bg-blue-100 text-blue-800',
//     知识: 'bg-purple-100 text-purple-800',
//     整合: 'bg-indigo-100 text-indigo-800',
//     采集: 'bg-yellow-100 text-yellow-800',
//     综合: 'bg-gray-100 text-gray-800',
//     '': 'bg-gray-100 text-gray-800',
//   }

//   return tagMap[tag] || 'bg-gray-100 text-gray-800'
// }

// // 根据状态返回对应的样式类
// const getStatusClass = (status) => {
//   const statusMap = {
//     OK: 'bg-green-100 text-green-800',
//     待审核: 'bg-yellow-100 text-yellow-800',
//     暂停更新: 'bg-red-100 text-red-800',
//   }

//   return statusMap[status] || 'bg-gray-100 text-gray-800'
// }

// // 格式化日期
// const formatDate = (dateString) => {
//   if (!dateString) return '未知'

//   try {
//     const date = new Date(dateString)
//     return date.toLocaleDateString('zh-CN', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//       hour: '2-digit',
//       minute: '2-digit',
//     })
//   } catch (e) {
//     return '日期格式错误' + e.message
//   }
// }

defineExpose({
  refresh,
})
</script>
