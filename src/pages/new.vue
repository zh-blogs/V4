<template>
  <div class="mx-auto max-w-3xl px-4 py-15">
    <h1 class="mb-6 text-3xl font-bold">欢迎加入集博栈</h1>
    <div class="alert alert-info alert-soft items-start border-2 py-5">
      <i class="ri-information-line text-2xl"></i>
      <div>
        <h2 class="text-2xl">提交须知：</h2>
        <div class="text-base-content mt-3 pr-10 leading-7">
          <p>
            在收录博客网站时，我们会遵循本站已公开的文档对您的博客进行评估判定，以判断您的博客是否符合收录标准。
          </p>
          <p>
            任何人均可以对我们现行的标准文档提出异议，我们会依照对应的意见或建议修改并完善我们的标准。
          </p>
          <p>
            为了确保优质的博客收录质量，我们会根据以下标准对您提交的博客进行评估：以下是收录简要要求，细则请移步本站文档进行查阅：
          </p>
          <ol class="ml-6 list-decimal">
            <li>遵守相关法律法规，内容健康向上</li>
            <li>网站主要语言为中文</li>
            <li>
              拥有3篇以上的原创博文
              <span class="text-sm">（不包含 SEO 文章）</span>
            </li>
            <li>
              符合博客基本属性：
              <ul class="ml-6 list-disc">
                <li>内容具有个人见解和知识沉淀</li>
                <li>保持独立运营维护</li>
              </ul>
            </li>
          </ol>
          <p class="font-bold">
            带有
            <span class="required mx-0.5"></span>
            的是必填项，但是为了更好的展示您的博客，建议您花一点时间将可选项信息也一并完善一下
          </p>
        </div>
      </div>
    </div>
    <div class="py-5">
      <form
        class="space-y-6"
        @submit.prevent="handleSubmit"
      >
        <!-- 博客名称 -->
        <fieldset class="fieldset">
          <legend class="required fieldset-legend text-xl">博客名称</legend>
          <input
            v-model="formData.name"
            type="text"
            class="input w-full"
            :class="{ 'border-error border-2': errors.name }"
            placeholder="您的博客名称"
            @blur="validateField('name')"
          />
          <p
            v-if="errors.name"
            class="fieldset-label text-error text-sm font-bold"
          >
            {{ errors.name }}
          </p>
        </fieldset>

        <!-- 博客地址 -->
        <fieldset class="fieldset">
          <legend class="required fieldset-legend text-xl">博客地址</legend>
          <label
            class="input w-full"
            :class="{ 'border-error border-2': errors.url }"
          >
            <select
              v-model="urlProtocol"
              class="h-full pr-2"
            >
              <option
                value="https://"
                selected
              >
                https://
              </option>
              <option value="http://">http://</option>
            </select>
            <input
              v-model="urlAddress"
              type="text"
              placeholder="您的博客地址"
              @blur="handleUrlBlur"
            />
          </label>
          <p
            v-if="errors.url"
            class="fieldset-label text-error text-sm font-bold"
          >
            {{ errors.url }}
          </p>
        </fieldset>

        <!-- 博客简介 -->
        <fieldset class="fieldset">
          <legend class="required fieldset-legend text-xl">博客简介</legend>
          <textarea
            v-model="formData.sign"
            type="text"
            class="textarea w-full"
            :class="{ 'border-error border-2': errors.sign }"
            placeholder="请用尽可能简洁的语句对您的博客进行描述"
            @blur="validateField('sign')"
          />
          <p
            v-if="errors.sign"
            class="fieldset-label text-error text-sm font-bold"
          >
            {{ errors.sign }}
          </p>
        </fieldset>

        <!-- 主标签 -->
        <fieldset class="fieldset">
          <legend class="required fieldset-legend text-xl">主分类</legend>
          <select
            v-model="formData.main_tag"
            class="select w-full sm:w-1/2"
            :class="{ 'border-error border-2': errors.main_tag }"
            @blur="validateField('main_tag')"
          >
            <option
              value=""
              disabled
              selected
            >
              请选择一个主分类
            </option>
            <template
              v-for="item in mainTags"
              :key="item"
            >
              <option :value="item">{{ item }}</option>
            </template>
          </select>
          <p
            v-if="errors.main_tag"
            class="fieldset-label text-error text-sm font-bold"
          >
            {{ errors.main_tag }}
          </p>
        </fieldset>

        <!-- 子标签 -->
        <fieldset class="fieldset">
          <legend class="fieldset-legend text-xl">子分类</legend>
          <ElementsInputSelect
            class="w-full sm:w-1/2"
            :value="subTags"
            :class="{ 'border-error border-2': errors.sub_tag }"
            @update="handleSubTagUpdate"
          />
          <p
            v-if="errors.sub_tag"
            class="fieldset-label text-error text-sm font-bold"
          >
            {{ errors.sub_tag }}
          </p>
        </fieldset>

        <!-- 订阅地址 -->
        <fieldset class="fieldset">
          <legend class="fieldset-legend text-xl">订阅地址</legend>
          <label
            class="input w-full"
            :class="{ 'border-error border-2': errors.feed }"
          >
            <select
              v-model="urlProtocol"
              class="pr-2"
            >
              <option
                value="https://"
                selected
              >
                https://
              </option>
              <option value="http://">http://</option>
            </select>
            <input
              v-model="feedAddress"
              type="text"
              placeholder="您的博客地址"
              @blur="handleFeedBlur"
            />
          </label>
          <p
            v-if="errors.feed"
            class="fieldset-label text-error text-sm font-bold"
          >
            {{ errors.feed }}
          </p>
        </fieldset>

        <!-- 网站地图 -->
        <fieldset class="fieldset">
          <legend class="fieldset-legend text-xl">网站地图</legend>
          <label
            class="input w-full"
            :class="{ 'border-error border-2': errors.sitemap }"
          >
            <select
              v-model="urlProtocol"
              class="pr-2"
            >
              <option
                value="https://"
                selected
              >
                https://
              </option>
              <option value="http://">http://</option>
            </select>
            <input
              v-model="sitemapAddress"
              type="text"
              placeholder="您的博客地址"
              @blur="handleSitemapBlur"
            />
          </label>
          <p
            v-if="errors.sitemap"
            class="fieldset-label text-error text-sm font-bold"
          >
            {{ errors.sitemap }}
          </p>
        </fieldset>

        <!-- 友链页面 -->
        <fieldset class="fieldset">
          <legend class="fieldset-legend text-xl">友链页面</legend>
          <label
            class="input w-full"
            :class="{ 'border-error border-2': errors.link_page }"
          >
            <select
              v-model="urlProtocol"
              class="pr-2"
            >
              <option
                value="https://"
                selected
              >
                https://
              </option>
              <option value="http://">http://</option>
            </select>
            <input
              v-model="linkPageAddress"
              type="text"
              placeholder="您的博客地址"
              @blur="handleLinkPageBlur"
            />
          </label>
          <p
            v-if="errors.link_page"
            class="fieldset-label text-error text-sm font-bold"
          >
            {{ errors.link_page }}
          </p>
        </fieldset>

        <!-- 博客架构 -->
        <fieldset class="fieldset">
          <legend class="fieldset-legend text-xl">博客程序</legend>
          <input
            v-model="formData.arch"
            type="text"
            class="input w-full"
            :class="{ 'border-error border-2': errors.arch }"
            placeholder="您博客使用的程序"
            @blur="validateField('arch')"
          />
          <p
            v-if="errors.arch"
            class="fieldset-label text-error text-sm font-bold"
          >
            {{ errors.arch }}
          </p>
        </fieldset>

        <button
          type="submit"
          class="btn btn-primary text-base"
        >
          提交
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ZodError } from 'zod'
import { WebSubmitSchema, type WebSubmit } from '../shared/types/blog'
import { MAIN_TAGS } from '~~/db/schema/blogs'
import type { SubTags } from '~~/server/api/blog/stats/sub-tag.get'
import type { ResultType } from '~~/server/result'

const { $useAlert } = useNuxtApp()

const { data: subTagStats } = useFetch<ResultType<SubTags[]>>(
  '/api/blog/stats/sub-tag',
)
const subTags = subTagStats.value?.data?.map((item) => item.name) ?? []

const mainTags = MAIN_TAGS.filter((item) => item !== '')

const formData = reactive<WebSubmit>({
  name: '',
  url: '',
  sign: '',
  main_tag: '',
  sub_tag: [] as string[],
  feed: null,
  from: ['WebSubmit'],
  sitemap: null,
  link_page: null,
  arch: '',
})

const errors = reactive<{ [K in Exclude<keyof WebSubmit, 'from'>]: string }>({
  name: '',
  url: '',
  sign: '',
  main_tag: '',
  sub_tag: '',
  feed: '',
  sitemap: '',
  link_page: '',
  arch: '',
})

const urlProtocol = ref<string>('https://')
const urlAddress = ref<string>('')
const sitemapAddress = ref<string>('')
const linkPageAddress = ref<string>('')
const feedAddress = ref<string>('')

const handleUrlBlur = () => {
  formData.url = urlProtocol.value + urlAddress.value
  validateField('url')
}

const handleSubTagUpdate = (tags: string[]) => {
  formData.sub_tag = tags
  validateField('sub_tag')
}

const handleSitemapBlur = () => {
  if (sitemapAddress.value) {
    formData.sitemap = urlProtocol.value + sitemapAddress.value
    validateField('sitemap')
  }
}

const handleLinkPageBlur = () => {
  if (linkPageAddress.value) {
    formData.link_page = urlProtocol.value + linkPageAddress.value
    validateField('link_page')
  }
}
const handleFeedBlur = () => {
  if (feedAddress.value) {
    formData.feed = [
      {
        name: '默认',
        url: urlProtocol.value + feedAddress.value,
      },
    ]
    validateField('link_page')
  }
}

const validateField = async (field: keyof typeof errors) => {
  console.log(formData)
  try {
    const partialSchema = WebSubmitSchema.shape[field]
    await partialSchema.parseAsync(formData[field])
    errors[field] = ''
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldError = error.errors[0]
      if (fieldError) {
        errors[field] = fieldError.message
      }
    }
  }
}

const handleSubmit = async () => {
  try {
    const data = await WebSubmitSchema.parseAsync(formData)
    const result = await $fetch('/api/blog/new', {
      method: 'POST',
      body: data,
    })
    if (result.code === 200) {
      Object.assign(formData, {
        name: '',
        url: '',
        sign: '',
        main_tag: '',
        sub_tag: [],
        feed: null,
        from: ['WebSubmit'],
        sitemap: null,
        link_page: null,
        arch: '',
      })
      urlAddress.value = ''
      sitemapAddress.value = ''
      linkPageAddress.value = ''
      feedAddress.value = ''
      $useAlert.success('提交成功！')
    } else {
      $useAlert.error(result.message)
    }
  } catch (error) {
    if (error instanceof ZodError) {
      $useAlert.error('请根据提示修改提交信息！')
      error.errors.forEach((err) => {
        const key = err.path[0]
        if (key && key in errors) {
          errors[key as keyof typeof errors] = err.message
        }
      })
    }
  }
}
</script>
