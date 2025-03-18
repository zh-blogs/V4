<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { $useAlert } = useNuxtApp()

if (import.meta.client) {
  let referrerURL: URL | null = null
  const referrer: string = window.document.referrer
  const oldSiteURL: string = 'zhblogs.ohyee.cc'
  if (referrer) {
    referrerURL = new URL(referrer)
    if (referrerURL.hostname === oldSiteURL) {
      $useAlert.info({
        title: '新站点启用通知',
        message: `您似乎是从我们的旧网站 ${oldSiteURL} 重定向过来的，我们已经启用全新域名和站点程序，请及时更新您所记载或使用的本站的旧信息`,
        duration: 10000,
      })
    }
  }
}
</script>
