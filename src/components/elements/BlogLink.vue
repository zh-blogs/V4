<template>
  <NuxtLink
    :to="props.url"
    rel="noopener"
    target="_blank"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
})

const handleClick = async () => {
  try {
    setTimeout(() => {
      $fetch('/api/blog/count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          id: props.id,
        },
        keepalive: true,
      }).catch((err) => console.error('点击统计请求失败:', err))
    }, 0)
  } catch (error) {
    console.error('点击跟踪发生错误:', error)
  }
}
</script>
