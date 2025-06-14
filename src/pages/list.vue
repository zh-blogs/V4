<template>
  <div class="px-10 py-20 xl:px-20">
    <h1 class="mb-10 text-center text-5xl">博客列表</h1>
    <fieldset class="fieldset border-base-300 rounded-box w-full border p-4">
      <legend class="fieldset-legend text-xl">筛选器</legend>

      <div class="flex w-full flex-col gap-2 sm:flex-row">
        <input
          v-model="filter.content"
          type="text"
          class="input w-full min-w-50"
          placeholder="以博客名称或 URL 进行筛选"
          @keyup.enter="handleFilter"
        />

        <select
          v-model="filter.main_tag"
          class="select w-full min-w-50"
        >
          <option value="">全部主标签</option>
          <template
            v-for="item in mainTags"
            :key="item"
          >
            <option :value="item">{{ item }}</option>
          </template>
        </select>
      </div>
      <div class="flex w-full flex-col gap-2 sm:flex-row">
        <ElementsInputSelect
          v-model="filter.sub_tag"
          class="w-full flex-1"
          :options="subTags"
          :new="false"
          :placeholder-text="'请选择子标签进行筛选'"
        />
        <div
          class="flex h-10 flex-row flex-nowrap items-center justify-center gap-3"
        >
          <button
            class="btn btn-primary btn-outline h-full"
            :disabled="pending"
            @click="handleFilter"
          >
            <span
              v-if="pending"
              class="loading loading-spinner loading-sm"
            ></span>
            查询
          </button>
          <button
            class="btn btn-error btn-outline h-full"
            @click="resetFilter"
          >
            重置
          </button>
        </div>
      </div>
    </fieldset>

    <div class="mt-5">
      <div
        v-if="pending"
        class="flex w-full justify-center py-20"
      >
        <span class="loading loading-spinner loading-lg"></span>
      </div>
      <div
        v-else-if="!listData?.data?.data || listData.data.data.length === 0"
        class="flex w-full justify-center py-20"
      >
        <div class="text-center">
          <div class="mb-2 text-gray-500">暂无数据</div>
          <button
            class="btn btn-sm btn-outline"
            @click="resetFilter"
          >
            重置筛选条件
          </button>
        </div>
      </div>
      <BlogCardList
        v-else
        :data="listData.data.data"
      />
    </div>

    <!-- 分页组件 -->
    <div
      v-if="listData?.data && listData.data.totalPages > 1"
      class="mt-20 flex flex-col items-center justify-center gap-4"
    >
      <!-- 分页信息 -->
      <div class="text-sm text-gray-500">
        共 {{ listData.data.total }} 条记录，第 {{ listData.data.page }} /
        {{ listData.data.totalPages }} 页
      </div>

      <!-- 分页按钮 -->
      <div class="flex items-center gap-2">
        <div class="join">
          <button
            class="btn join-item"
            :disabled="listData.data.page === 1 || pending"
            @click="handlePageChange(1)"
          >
            <i class="ri-skip-back-line"></i>
          </button>
          <button
            class="btn join-item"
            :disabled="listData.data.page === 1 || pending"
            @click="handlePageChange(listData.data.page - 1)"
          >
            <i class="ri-arrow-left-s-line"></i>
          </button>

          <!-- 页码按钮 -->
          <template
            v-for="page in paginationPages"
            :key="page"
          >
            <button
              v-if="page !== '...'"
              class="btn join-item"
              :class="{ 'btn-active': page === listData.data.page }"
              :disabled="pending"
              @click="handlePageChange(page as number)"
            >
              {{ page }}
            </button>
            <span
              v-else
              class="btn join-item btn-disabled"
              >...</span
            >
          </template>

          <button
            class="btn join-item"
            :disabled="
              listData.data.page === listData.data.totalPages || pending
            "
            @click="handlePageChange(listData.data.page + 1)"
          >
            <i class="ri-arrow-right-s-line"></i>
          </button>
          <button
            class="btn join-item"
            :disabled="
              listData.data.page === listData.data.totalPages || pending
            "
            @click="handlePageChange(listData.data.totalPages)"
          >
            <i class="ri-skip-forward-line"></i>
          </button>
        </div>

        <!-- 快速跳转 -->
        <div class="join">
          <input
            v-model="jumpPage"
            class="input join-item w-16 text-center"
            type="number"
            :min="1"
            :max="listData.data.totalPages"
            placeholder="页码"
            @keyup.enter="handleJumpPage"
          />
          <button
            class="btn join-item"
            :disabled="
              pending ||
              !jumpPage ||
              jumpPage < 1 ||
              jumpPage > listData.data.totalPages
            "
            @click="handleJumpPage"
          >
            跳转
          </button>
        </div>

        <!-- 每页数量选择 -->
        <select
          v-model="filter.pageSize"
          class="select select-sm w-20"
          @change="handlePageSizeChange"
        >
          <option :value="12">12</option>
          <option :value="24">24</option>
          <option :value="60">60</option>
        </select>
        <span class="text-sm text-gray-500">条/页</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MAIN_TAGS } from '~~/db/schema/blogs'
import type { SubTags } from '~~/server/api/blog/stats/sub-tag.get'
import type { ListResult } from '~~/server/api/blog/list.get'
import type { ResultType } from '~~/server/result'

const mainTags = MAIN_TAGS.filter((item) => item !== '')

// 获取子标签数据
const { data: subTagStats } = await useFetch<ResultType<SubTags[]>>(
  '/api/blog/stats/sub-tag',
)
const subTags = computed(
  () => subTagStats.value?.data?.map((item) => item.name) ?? [],
)

// 筛选条件
const filter = reactive({
  content: '',
  main_tag: '',
  sub_tag: [] as string[],
  page: 1,
  pageSize: 12 as 12 | 24 | 60,
})

// 跳转页码
const jumpPage = ref<number>()

// 构建查询参数
const queryParams = computed(() => {
  const params: Record<string, string> = {
    page: filter.page.toString(),
    pageSize: filter.pageSize.toString(),
  }

  if (filter.content) params.content = filter.content
  if (filter.main_tag) params.main_tag = filter.main_tag
  if (filter.sub_tag.length > 0) params.sub_tag = filter.sub_tag.join(',')

  return params
})

// 获取列表数据
const { data: listData, pending } = await useFetch<ResultType<ListResult>>(
  '/api/blog/list',
  {
    query: queryParams,
    server: false,
  },
)

// 计算分页页码
const paginationPages = computed(() => {
  if (!listData.value?.data) return []

  const current = listData.value.data.page
  const total = listData.value.data.totalPages
  const pages: (number | string)[] = []

  if (total <= 7) {
    // 总页数较少，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 总页数较多，智能显示页码
    pages.push(1)

    if (current > 4) {
      pages.push('...')
    }

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== total) {
        pages.push(i)
      }
    }

    if (current < total - 3) {
      pages.push('...')
    }

    if (total > 1) {
      pages.push(total)
    }
  }

  return pages
})

// 处理分页
const handlePageChange = (page: number) => {
  if (
    page < 1 ||
    !listData.value?.data ||
    page > listData.value.data.totalPages
  )
    return
  filter.page = page
  jumpPage.value = page
}

// 处理跳转
const handleJumpPage = () => {
  if (jumpPage.value) {
    handlePageChange(jumpPage.value)
  }
}

// 处理每页数量变化
const handlePageSizeChange = () => {
  filter.page = 1
  jumpPage.value = 1
}

// 处理筛选
const handleFilter = () => {
  filter.page = 1
  jumpPage.value = 1
}

// 重置筛选
const resetFilter = () => {
  filter.content = ''
  filter.main_tag = ''
  filter.sub_tag = []
  filter.page = 1
  filter.pageSize = 12
  jumpPage.value = 1
}

// 监听列表数据变化，更新跳转页码
watch(
  () => listData.value?.data?.page,
  (newPage) => {
    if (newPage) {
      jumpPage.value = newPage
    }
  },
  { immediate: true },
)
</script>
