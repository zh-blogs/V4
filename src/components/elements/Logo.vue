<template>
  <ClientOnly>
    <img
      :src="logoPath"
      alt="logo"
      v-bind="$attrs"
    />
  </ClientOnly>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
const logoPath = computed(() => {
  if (colorMode.preference === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches === true
      ? '/logo-dark.webp'
      : '/logo-light.webp'
  }
  return colorMode.preference === 'dark'
    ? '/logo-dark.webp'
    : '/logo-light.webp'
})
</script>
