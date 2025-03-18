<template>
  <div class="py-10">
    <section class="lg w-full overflow-hidden px-[10%] py-10 md:px-[20%]">
      <div
        class="border-x-zhblogs-red mx-auto mb-10 w-full px-0 pt-7 pb-9 md:border-x-[20px] md:px-20"
      >
        <h2
          class="md:text-base-content text-zhblogs-red my-5 text-6xl font-bold"
        >
          集博栈
        </h2>
        <h3 class="my-5 text-3xl opacity-30">原中文博客列表导航</h3>
        <h4 class="my-3 text-2xl">尝试链接几乎所有的中文博客</h4>
      </div>
    </section>
    <div class="divider mx-auto w-9/10"></div>
    <section class="w-full px-[10%] py-20 sm:px-15">
      <div
        class="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-0 sm:px-0"
      >
        <div class="leading-10">
          <h3 class="text-2xl font-bold">随机博客</h3>
          <p class="text opacity-40">点击卡片查看博客详情</p>
        </div>
        <div class="flex gap-2">
          <button
            class="btn btn-outline btn-ghost btn-md p-2 font-normal"
            @click="refresh()"
          >
            <i class="ri-refresh-line"></i>刷新
          </button>
          <NuxtLink to="/list">
            <button
              class="btn btn-outline btn-ghost btn-md p-2 font-normal whitespace-nowrap"
            >
              查看更多
              <i class="ri-arrow-right-line"></i>
            </button>
          </NuxtLink>
        </div>
      </div>
      <div
        v-if="status === 'pending'"
        class="col-span-4 flex w-full justify-center"
      >
        <span
          class="loading loading-bars loading-md sm:loading-xl col-span-4"
        ></span>
      </div>
      <div
        v-else-if="status === 'error'"
        class="col-span-4 mx-auto flex w-full justify-center"
      >
        <span>请求失败，请刷新重试</span>
      </div>
      <div
        v-else-if="status === 'success' && !blogs?.data"
        class="col-span-4 mx-auto flex w-full justify-center"
      >
        <span>无数据</span>
      </div>
      <BlogCardList
        ref="blogCardList"
        :data="blogs?.data ?? []"
      />
    </section>
    <div class="divider mx-auto w-9/10"></div>
    <section class="my-10 flex w-full">
      <div
        class="stats stats-horizontal mx-auto flex w-fit flex-wrap justify-center text-center"
      >
        <div class="stat w-fit !border-none">
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
        <div class="stat w-fit !border-none">
          <div class="stat-title">总博客数量</div>
          <div class="stat-value">{{ count?.data?.total }}</div>
        </div>

        <div class="stat w-fit !border-none">
          <div class="stat-title">审核通过博客数量</div>
          <div class="stat-value">{{ count?.data?.passed }}</div>
        </div>
        <div class="stat w-fit !border-none">
          <div class="stat-title">精选博客数量</div>
          <div class="stat-value">{{ count?.data?.recommen }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { BlogVO } from '~/shared/types/blog'
import type { BlogStats } from '~~/server/api/blog/count.get'
import type { ResultType } from '~~/server/result'

const { data: count } = useFetch<ResultType<BlogStats>>('/api/blog/count')
const {
  data: blogs,
  status,
  refresh,
} = useFetch<ResultType<BlogVO[]>>('/api/blog/random', {
  params: { size: 12 },
})
</script>
