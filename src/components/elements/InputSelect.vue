<template>
  <div
    ref="dropdownRef"
    class="relative"
    v-bind="$attrs"
  >
    <!-- 选择框和已选区域 -->
    <div
      class="select flex h-fit w-full flex-wrap items-center py-2"
      @click="handleClick"
    >
      <!-- 已选 -->
      <div
        v-for="tag in selectedTags"
        :key="tag"
        class="badge badge-info badge-outline text-base-content gap-1 whitespace-nowrap"
      >
        <span>{{ tag }}</span>
        <button
          class="text-error text-base"
          @click.stop="removeTag(tag)"
        >
          ×
        </button>
      </div>

      <!-- 输入框 -->
      <input
        ref="inputElemet"
        v-model="inputValue"
        type="text"
        class="min-w-20 grow px-1 outline-none"
        :placeholder="selectedTags.length > 0 ? '' : props.placeholderText"
        @input="handleInputChange"
      />
    </div>

    <!-- 下拉选项列表 -->
    <div
      v-if="isOpen"
      class="bg-base-300 absolute z-10 mt-1 max-h-72 w-full overflow-y-auto rounded border shadow-lg"
    >
      <template v-if="filteredTags.length > 0">
        <div
          v-for="tag in filteredTags"
          :key="tag"
          class="hover:bg-base-200 cursor-pointer px-4 py-2 text-sm"
          @click="selectTag(tag)"
        >
          {{ tag }}
        </div>
      </template>
      <div
        v-else
        class="p-2"
      >
        <div class="text-base-content/70 my-1 px-2">找不到匹配结果</div>
        <button
          v-if="props.new"
          class="btn btn-primary btn-soft btn-sm text-base-content w-full justify-start text-sm font-normal"
          @click="createNewTag"
        >
          新创建 "{{ inputValue }}"
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Array as PropType<string[]>, default: () => [] }, // 修改 value 为 modelValue
  value: { type: Array as PropType<string[]>, required: true },
  new: { type: Boolean, default: true },
  placeholderText: { type: String, default: '请下拉选择或者输入进行搜索' },
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]] // 添加 v-model 事件
  update: [value: string[]]
}>()

const dropdownRef = ref<HTMLElement | null>(null)
const inputElemet = ref<HTMLInputElement | null>(null)

const isOpen = ref(false)
const inputValue = ref('')

const tags = ref<string[]>(props.value)
const selectedTags = ref<string[]>([])
const filteredTags = ref<string[]>([...tags.value])

const handleClick = () => {
  inputElemet.value?.focus()
  isOpen.value = true
}

// 处理输入变化
const handleInputChange = () => {
  if (inputValue.value.trim() === '') {
    filteredTags.value = tags.value.filter(
      (tag) => !selectedTags.value.includes(tag),
    )
  } else {
    filteredTags.value = tags.value.filter(
      (tag) =>
        !selectedTags.value.includes(tag) &&
        tag.toLowerCase().includes(inputValue.value.toLowerCase()),
    )
  }
}

// 选择
const selectTag = (tag: string) => {
  if (!selectedTags.value.includes(tag)) {
    selectedTags.value.push(tag)
    filteredTags.value = tags.value.filter(
      (tag) => !selectedTags.value.includes(tag),
    )
  }
  emit('update', selectedTags.value)
  inputValue.value = ''
}

// 移除已选
const removeTag = (tag_name: string) => {
  selectedTags.value = selectedTags.value.filter((tag) => tag !== tag_name)
  filteredTags.value = tags.value.filter(
    (tag) => !selectedTags.value.includes(tag),
  )
  emit('update', selectedTags.value)
}

// 创建新内容
const createNewTag = () => {
  if (inputValue.value.trim() !== '') {
    const newTag: string = inputValue.value.trim()
    selectedTags.value.push(newTag)
    filteredTags.value = tags.value.filter(
      (tag) => !selectedTags.value.includes(tag),
    )
    emit('update', selectedTags.value)
    inputValue.value = ''
  }
}

// 处理点击外部事件
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

// 生命周期钩子
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(
  selectedTags,
  (newVal) => {
    emit('update', newVal)
    emit('update:modelValue', newVal)
  },
  { deep: true },
)

watch(
  () => props.modelValue,
  (newVal) => {
    selectedTags.value = newVal
  },
  { immediate: true },
)
</script>
