<template>
  <div
    class="card bg-base-100 cursor-pointer px-5 pt-3 pb-2 transition-all hover:z-10 hover:scale-110 hover:border hover:border-neutral-500 hover:shadow-xs"
    @click="$emit('click', blog)"
  >
    <div class="mb-1 flex justify-between">
      <span class="text-sm opacity-40">BID: {{ blog.bid }}</span>
      <div
        class="badge badge-sm whitespace-nowrap"
        :class="getMainTagClass(blog.main_tag)"
      >
        {{ blog.main_tag || '无分类' }}
      </div>
    </div>
    <div class="card-title">
      <h2 class="flex-1 truncate">{{ blog.name }}</h2>
    </div>
    <div class="card-body gap-1 p-0">
      <NuxtLink
        :to="blog.url"
        rel="noopener"
        target="_blank"
        class="text-primary w-fit text-xs"
        >{{ blog.url }}
      </NuxtLink>
      <div class="flex justify-between">
        <!-- eslint-disable vue/no-v-html -->
        <div class="hidden gap-2 sm:flex">
          <div class="tooltip tooltip-top">
            <div
              class="tooltip-content text-left"
              v-html="getJoinTime(blog.join_time)"
            ></div>
            <i class="ri-time-fill opacity-40"></i>
          </div>
          <div class="tooltip tooltip-top">
            <div
              class="tooltip-content text-left"
              v-html="getFromContent(blog.from)"
            ></div>
            <i class="ri-arrow-left-right-fill opacity-40"></i>
          </div>
          <div
            v-if="blog.feed[0]"
            class="tooltip tooltip-top"
          >
            <div
              class="tooltip-content text-left"
              v-html="'订阅链接：' + blog.feed.join('<br />')"
            ></div>
            <i class="ri-rss-fill opacity-40"></i>
          </div>
          <div
            v-if="blog.sitemap"
            class="tooltip tooltip-top"
          >
            <div class="tooltip-content text-left">
              站点地图： {{ blog.sitemap }}
            </div>
            <i class="ri-map-2-fill opacity-40"></i>
          </div>
        </div>
        <div class="flex gap-2 sm:hidden">
          <i class="ri-time-fill opacity-40"></i>
          <i class="ri-arrow-left-right-fill opacity-40"></i>
          <i class="ri-rss-fill opacity-40"></i>
          <i class="ri-map-2-fill opacity-40"></i>
        </div>
        <div>
          <i class="ri-more-fill text-base"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogVO, FromSource, MainTag } from '~/shared/types/blog'
import formateDate from '~/shared/utils/formateDate'

defineEmits(['click'])
defineProps({
  blog: {
    type: Object as PropType<BlogVO>,
    required: true,
  },
})

type TagMap = {
  [k in MainTag]: string
}

type FromMap = {
  [k in FromSource]: string
}

const getMainTagClass = (tag: MainTag): string => {
  const tagMap: TagMap = {
    生活: 'badge-success',
    技术: 'badge-info',
    知识: 'badge-primary',
    整合: 'badge-neutral',
    采集: 'badge-warning',
    综合: 'badge-accent',
    '': 'opacity-40',
  }

  return tagMap[tag]
}

const getFromContent = (from: FromSource[]): string => {
  const fromMap: FromMap = {
    CIB: '中文独立博客列表',
    BoYouQuan: '博友圈',
    BlogFinder: 'BlogFinder',
    BKZ: '优秀个人独立博客导航',
    Travellings: '开往',
    WebSubmit: '网站提交',
    AdminAdd: '管理员添加',
    LinkPageSearch: '友链发现',
    OldData: '旧版本数据',
  }
  return '来源：' + from.map((item) => fromMap[item]).join('<br/>')
}

const getJoinTime = (join_time: Date): string => {
  return '加入时间：' + formateDate(join_time)
}
</script>
