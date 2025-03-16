<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="grid h-fit min-h-10 w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
  >
    <template
      v-for="blog in data"
      :key="blog.bid"
    >
      <ElementsBlogCard
        :blog="blog"
        @click="showBlogDetail(blog)"
      />
    </template>

    <dialog
      ref="blogDetailElement"
      class="modal modal-bottom sm:modal-middle"
      @close="clearBlogDetailData()"
    >
      <div class="modal-box bg-base-200 w-full px-10 md:max-w-xl">
        <form method="dialog">
          <button class="btn btn-circle btn-ghost absolute top-5 right-5">
            ✕
          </button>
        </form>
        <div class="breadcrumbs w-fit text-sm opacity-50">
          <ul>
            <li>博客详情</li>
            <li>{{ blogDetailData?.name }}</li>
          </ul>
        </div>
        <div>
          <h2 class="py-3 text-3xl font-bold">
            <i class="ri-info-card-line font-light"></i>
            {{ blogDetailData?.name }}
          </h2>
        </div>
        <div class="leading-7">
          <div>
            <span class="whitespace-nowrap opacity-50 after:content-['：']">
              <i class="ri-profile-line"></i>
              BID
            </span>
            <span>{{ blogDetailData?.bid }}</span>
          </div>
          <div>
            <span class="whitespace-nowrap opacity-50 after:content-['：']">
              <i class="ri-bookmark-line"></i>
              主要分类
            </span>
            <div
              class="badge badge-md whitespace-nowrap"
              :class="getMainTagClass(blogDetailData?.main_tag ?? '')"
            >
              {{ blogDetailData?.main_tag || '无分类' }}
            </div>
          </div>
          <div>
            <span class="whitespace-nowrap opacity-50 after:content-['：']">
              <i class="ri-global-line"></i>
              站点地址
            </span>
            <ElementsBlogLink
              v-if="blogDetailData?.url && blogDetailData?.bid"
              :url="blogDetailData.url"
              :bid="blogDetailData.bid"
              class="text-primary break-all whitespace-normal"
            >
              {{ blogDetailData?.url }}
            </ElementsBlogLink>
          </div>
          <div>
            <span class="whitespace-nowrap opacity-50 after:content-['：']">
              <i class="ri-edit-line"></i>
              站点描述
            </span>
            <span>{{ blogDetailData?.sign || '该博客暂无描述~' }}</span>
          </div>
          <div>
            <span class="whitespace-nowrap opacity-50 after:content-['：']">
              <i class="ri-archive-drawer-line"></i>
              最近一次巡查状态
            </span>
            <div
              class="badge badge-md whitespace-nowrap"
              :class="getStatusClass(blogDetailData?.status as StatusType)"
            >
              {{ blogDetailData?.status }}
            </div>
          </div>
          <div class="divider"></div>
          <div class="flex flex-col sm:flex-row">
            <span class="whitespace-nowrap opacity-50 after:content-['：']">
              <i class="ri-bookmark-2-line"></i>
              补充分类
            </span>
            <div class="flex items-center gap-2">
              <template
                v-for="tag in blogDetailData?.sub_tag"
                :key="tag"
              >
                <div class="badge badge-md whitespace-nowrap">
                  {{ tag }}
                </div>
              </template>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row">
            <span class="whitespace-nowrap opacity-50 after:content-['：']">
              <i class="ri-map-2-line"></i>
              网站地图
            </span>
            <span class="break-all whitespace-normal">{{
              blogDetailData?.sitemap || '暂无网站地图'
            }}</span>
          </div>
          <div class="flex flex-col sm:flex-row">
            <span class="whitespace-nowrap opacity-50 after:content-['：']">
              <i class="ri-rss-line"></i>
              订阅地址
            </span>
            <div class="flex gap-2">
              <template
                v-for="feed in blogDetailData?.feed"
                :key="feed"
              >
                <span class="break-all whitespace-normal"> {{ feed }}</span>
              </template>
            </div>
          </div>
          <div>
            <span class="whitespace-nowrap opacity-50 after:content-['：']">
              <i class="ri-apps-line"></i>
              博客程序
            </span>
            <span>{{ blogDetailData?.arch || '未知' }}</span>
          </div>
          <div>
            <span class="whitespace-nowrap opacity-50 after:content-['：']">
              <i class="ri-timer-2-line"></i>
              加入时间
            </span>
            <span>{{ formatDate(blogDetailData?.join_time as Date) }}</span>
          </div>
          <div>
            <span class="whitespace-nowrap opacity-50 after:content-['：']">
              <i class="ri-time-line"></i>
              修改时间
            </span>
            <span>{{ formatDate(blogDetailData?.update_time as Date) }}</span>
          </div>
          <div class="flex">
            <span class="whitespace-nowrap opacity-50 after:content-['：']">
              <i class="ri-arrow-left-right-line"></i>
              收录来源
            </span>
            <span
              class="inline-block"
              v-html="getFromContent(blogDetailData?.from ?? [])"
            ></span>
          </div>
        </div>
      </div>
      <form
        method="dialog"
        class="modal-backdrop"
      >
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import type { BlogVO, StatusType } from '~/shared/types/blog'

let timer: null | NodeJS.Timeout = null
defineProps({
  data: {
    type: Object as PropType<BlogVO[]>,
    required: true,
  },
})

const blogDetailElement = ref<HTMLDialogElement | null>(null)
const blogDetailData = ref<BlogVO | null>(null)

const clearBlogDetailData = () => {
  if (timer !== null) {
    clearTimeout(timer)
  }
  if (blogDetailData.value !== null) {
    timer = setTimeout(() => {
      blogDetailData.value = null
    }, 200)
  }
}
const showBlogDetail = (blog: BlogVO) => {
  if (blog.sub_tag.length === 0) {
    blog.sub_tag.push('无补充分类')
  }
  if (!blog.feed.length) {
    blog.feed.push('暂无订阅地址')
  }
  if (blogDetailElement.value !== null) {
    blogDetailData.value = blog
    blogDetailElement.value?.showModal()
  }
}
</script>
