<template>
  <div class="py-10">
    <section class="lg w-full overflow-hidden py-10 pl-[10%] md:px-[20%]">
      <div
        class="mx-auto mb-10 w-full border-l-[20px] border-x-[#ce161c] pt-7 pb-9 pl-5 sm:px-[10%] md:border-x-[20px]"
      >
        <h2 class="my-5 text-6xl font-bold">集博栈</h2>
        <h3 class="my-5 text-3xl opacity-30">原中文博客列表导航</h3>
        <h4 class="my-3 text-2xl">尝试链接几乎所有的中文博客</h4>
      </div>
    </section>
    <div class="divider mx-auto w-9/10"></div>
    <section class="w-full px-[10%] py-20 sm:px-15">
      <div class="mb-10 flex items-end justify-between px-10">
        <div class="leading-10">
          <h3 class="text-2xl font-bold">随机博客</h3>
          <p class="text opacity-40">点击卡片查看博客详情</p>
        </div>
        <div class="flex gap-2">
          <button
            class="btn btn-outline btn-ghost btn-md font-normal"
            @click="refreshData"
          >
            <i class="ri-refresh-line"></i>刷新
          </button>
          <NuxtLink to="/list">
            <button class="btn btn-outline btn-ghost btn-md font-normal">
              查看更多
              <i class="ri-arrow-right-line"></i>
            </button>
          </NuxtLink>
        </div>
      </div>
      <BlogCardList
        ref="blogCardList"
        path="/api/blog/random"
      />
    </section>
    <div class="divider mx-auto w-9/10"></div>
    <section class="my-10 flex w-full">
      <div class="stats stats-horizontal mx-auto w-fit text-center">
        <div class="stat">
          <div class="stat-title">
            巡检正常博客数量
            <div
              class="tooltip tooltip-bottom"
              data-tip="脚本巡检，仅供参考"
            >
              <i class="ri-information-line"></i>
            </div>
          </div>
          <div class="stat-value">{{ count?.data?.accessible }}</div>
          <!-- TODO: <div class="stat-desc">上次巡检时间：</div> -->
        </div>
        <div class="stat">
          <div class="stat-title">总博客数量</div>
          <div class="stat-value">{{ count?.data?.total }}</div>
        </div>

        <div class="stat">
          <div class="stat-title">审核通过博客数量</div>
          <div class="stat-value">{{ count?.data?.passed }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">精选博客数量</div>
          <div class="stat-value">{{ count?.data?.recommen }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BlogCardList from '~/components/BlogCardList.vue'
import type { BlogStats } from '~~/server/api/blog/count.get'
import type { ResultType } from '~~/server/result'

const { data: count } = useFetch<ResultType<BlogStats>>('/api/blog/count')
const blogCardList = ref<InstanceType<typeof BlogCardList> | null>(null)

const refreshData = () => {
  blogCardList.value?.refresh()
}
</script>
