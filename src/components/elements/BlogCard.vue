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
      <ElementsBlogLink
        :url="blog.url"
        :bid="blog.bid"
        class="text-primary w-fit text-xs"
        @click.stop
        >{{ blog.url }}
      </ElementsBlogLink>
      <div class="flex justify-between">
        <div class="flex gap-2">
          <i class="ri-time-fill opacity-40"></i>
          <i class="ri-arrow-left-right-fill opacity-40"></i>
          <i
            v-if="blog.feed.length !== 0"
            class="ri-rss-fill opacity-40"
          ></i>
          <i
            v-if="blog.sitemap"
            class="ri-map-2-fill opacity-40"
          ></i>
        </div>
        <div>
          <i class="ri-more-fill text-base"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogVO } from '~/shared/types/blog'

defineEmits(['click'])
defineProps({
  blog: {
    type: Object as PropType<BlogVO>,
    required: true,
  },
})
</script>
