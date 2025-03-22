<template>
  <div class="bg-base-200 flex h-screen w-full items-center justify-center">
    <div class="w-full max-w-80">
      <h2 class="text-zhblogs-red text-4xl font-bold">即将前往：</h2>
      <div class="my-7 w-full">
        <ElementsBlogCard
          v-if="blog"
          :blog="blog"
          :random="true"
          class="border-base-content border-2"
        ></ElementsBlogCard>
      </div>
      <div class="w-full text-center">
        <p>
          即将在
          <span class="mx-2 font-bold">
            {{ countDown }}
          </span>
          秒后跳转
        </p>
        <p class="opacity-50">
          您是通过导航前往该站点的第
          <span class="mx-2 font-bold">
            {{ (blog?.access_count ?? 0) + 1 }}
          </span>
          人
        </p>
      </div>
    </div>
    <div class="fixed bottom-0 w-full py-5">
      <div class="mx-auto max-w-3xl text-center font-bold opacity-50">
        <p>您即将前往外部网站</p>
        <p>本站仅对其站点信息进行收集，并不对网站其中的内容进行负责</p>
        <p>请您注意甄别信息，避免上当受骗</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { BlogVO } from '~/shared/types/blog'
import { MAIN_TAGS } from '~~/db/schema/blogs'
import type { ResultType } from '~~/server/result'

definePageMeta({
  layout: 'blank',
})

let timer: NodeJS.Timer | null = null

const randomSchema = z
  .object({
    recommen: z
      .preprocess(
        (val) => {
          if (val === 'true') return true
        },
        z.literal(true, { message: '参数错误' }),
      )
      .optional(),
    type: z
      .enum(MAIN_TAGS, {
        message: '你确定有这个主分类吗？',
      })
      .optional(),
  })
  .strict()

const countDown = ref<number>(10)
const blog = ref<BlogVO | null>(null)

const result = await randomSchema.safeParseAsync(useRoute().query)

if (result.error) {
  throw createError({
    statusCode: 400,
    statusMessage: '请检查随机页面的查询参数',
  })
}

if (result.success) {
  const params = {
    ...result.data,
    size: 1,
  }

  const { data: blogs } = useFetch<ResultType<BlogVO[]>>('/api/blog/random', {
    params,
  })

  if (blogs.value?.data !== null) {
    blog.value = blogs.value?.data[0] as BlogVO
  }
}

onBeforeMount(() => {
  clearInterval(Number(timer))
})

onMounted(async () => {
  timer = setInterval(() => {
    countDown.value--

    if (countDown.value <= 0 && blog.value?.url !== undefined) {
      clearInterval(Number(timer))
      $fetch('/api/blog/count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          id: blog.value.id,
        },
        keepalive: true,
      }).catch((err) => console.error('点击统计请求失败:', err))
      window.location.replace(blog.value?.url)
    }
  }, 1000)
})
</script>
