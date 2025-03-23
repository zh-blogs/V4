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
        />

        <select
          v-model="filter.main_tag"
          class="select w-full min-w-50"
        >
          <option
            value="null"
            disabled
            selected
            hidden
          >
            请选择一个主标签
          </option>
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
          class="w-full flex-1"
          :value="subTags"
          :new="false"
          :placeholder-text="'请选择子标签进行筛选'"
          @update="handleSubTagFilter"
        />
        <div
          class="flex h-10 flex-row flex-nowrap items-center justify-center gap-3"
        >
          <button
            class="btn btn-primary btn-outline h-full"
            @click="handleFilter"
          >
            查询
          </button>
          <button
            class="btn btn-error btn-outline h-full"
            @click="handleFilter"
          >
            重置
          </button>
        </div>
      </div>
    </fieldset>
    <div class="mt-5">
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
        :data="showData"
      />
    </div>
    <div
      class="mt-20 flex flex-col items-center justify-center gap-2 sm:flex-row"
    >
      <div class="join">
        <button
          class="btn"
          :disabled="filter.page === 1"
          @click="handlePageChange(1)"
        >
          «
        </button>
        <button
          class="btn"
          :disabled="filter.page === 1"
          @click="handlePageChange(filter.page - 1)"
        >
          &lt;
        </button>

        <div class="input w-16">
          {{ filter.page }}
        </div>

        <button
          class="btn"
          :disabled="filter.page === filter.maxPage"
          @click="handlePageChange(filter.page + 1)"
        >
          &gt;
        </button>
        <button
          class="btn"
          :disabled="filter.page === filter.maxPage"
          @click="handlePageChange(filter.maxPage)"
        >
          »
        </button>
      </div>

      <div class="join">
        <input
          class="input join-item w-16"
          type="number"
          :value="filter.page"
        />
        <button class="btn join-item rounded-r-full">跳转</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogVO, MainTag } from '~/shared/types/blog'
import { MAIN_TAGS } from '~~/db/schema/blogs'
import type { SubTags } from '~~/server/api/blog/stats/sub-tag.get'
import type { ResultType } from '~~/server/result'

const mainTags = MAIN_TAGS.filter((item) => item !== '')
const { data: blogs, status } = useFetch<ResultType<BlogVO[]>>('/api/blog/list')
const { data: subTagStats } = useFetch<ResultType<SubTags[]>>(
  '/api/blog/stats/sub-tag',
)
const subTags = subTagStats.value?.data?.map((item) => item.name) ?? []

const originBlogsData: BlogVO[] = blogs.value?.data ?? []

const filteredData = ref<BlogVO[]>([])
const showData = ref<BlogVO[]>([])

const filter = reactive<{
  content: string
  main_tag: MainTag | null
  sub_tag: string[]
  size: 12 | 24 | 60
  page: number
  maxPage: number
}>({
  content: '',
  main_tag: null,
  sub_tag: [],
  size: 12,
  page: 1,
  maxPage: 0,
})

const handlePageChange = (page: number) => {
  if (page < 1 || page > filter.maxPage) return

  filter.page = page
  const start = (page - 1) * filter.size
  const end = start + filter.size
  showData.value = filteredData.value.slice(start, end)
}

const handleFilter = () => {
  filter.page = 1
  filteredData.value = originBlogsData
    .filter((item) => {
      if (filter.content) {
        return (
          item.name.toLowerCase().includes(filter.content.toLowerCase()) ||
          item.url.toLowerCase().includes(filter.content.toLowerCase())
        )
      }
      return true
    })
    .filter((item) => {
      if (filter.main_tag) {
        return item.main_tag === filter.main_tag
      }
      return true
    })
    .filter((item) => {
      if (filter.sub_tag.length > 0 && item.sub_tag !== null) {
        return filter.sub_tag.every((tag) => item.sub_tag?.includes(tag))
      }
      return true
    })

  filter.maxPage = Math.ceil(filteredData.value.length / filter.size)
  showData.value = filteredData.value.slice(0, filter.size)
}

const handleSubTagFilter = (sub_tags: string[]) => {
  filter.sub_tag = sub_tags
}

onMounted(() => {
  filteredData.value = originBlogsData
  filter.maxPage = Math.ceil(originBlogsData.length / filter.size)
  showData.value = filteredData.value.slice(0, filter.size)
})
</script>
