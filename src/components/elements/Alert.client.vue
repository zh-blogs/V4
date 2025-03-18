<template>
  <Transition name="fade">
    <div
      v-if="alertVisible"
      role="alert"
      class="alert relative w-full max-w-xl gap-2 border-2"
      :class="typeClasses[innerOptions.type ?? 'tips'].alert"
    >
      <i
        v-if="innerOptions.alertIconVisible"
        class="self-start text-2xl"
        :class="typeClasses[innerOptions.type ?? 'tips'].icon"
      />
      <div class="">
        <h3
          v-if="innerOptions.title"
          class="text-base-content h-auto text-lg font-bold break-all"
        >
          {{ innerOptions.title }}
        </h3>
        <p class="text-base-content h-auto text-sm break-all">
          {{ innerOptions.message }}
        </p>
      </div>
      <button
        v-if="innerOptions.closeIconVisible"
        class="btn btn-sm btn-ghost self-start p-0"
        @click="closeAlert"
      >
        <i class="ri-close-line text-base-content text-xl" />
      </button>
      <div
        class="absolute bottom-0 left-0 h-2 w-full bg-blue-600"
        :style="{
          animation: `decrease ${innerOptions.duration}ms linear forwards`,
        }"
      />
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import type { AlertOptions } from '~/types/components'

const alertVisible = ref<boolean>(true)

const innerOptions = computed<AlertOptions>(() => ({
  alertIconVisible: props.options.alertIconVisible ?? true,
  closeIconVisible: props.options.closeIconVisible ?? true,
  title: props.options.title ?? '',
  message: props.options.message ?? '',
  type: props.options.type ?? 'tips',
  duration: props.options.duration ?? 5000,
}))

const typeClasses = {
  info: {
    alert: 'alert-info alert-soft !border-blue-400 dark:!border-blue-600',
    icon: 'ri-information-line text-blue-500',
  },
  success: {
    alert: 'alert-success alert-soft !border-green-400 dark:!border-green-600',
    icon: 'ri-checkbox-circle-line text-green-500',
  },
  warning: {
    alert:
      'alert-warning alert-soft !border-yellow-400 dark:!border-yellow-600',
    icon: 'ri-error-warning-line text-yellow-500',
  },
  error: {
    alert: 'alert-error alert-soft !border-red-400 dark:!border-red-600',
    icon: 'ri-close-circle-line text-red-500',
  },
  tips: {
    alert: ' !border-neutral-400 dark:!border-neutral-600',
    icon: 'ri-lightbulb-line text-neutral-500',
  },
}

const emit = defineEmits(['destroy'])

const closeAlert = () => {
  alertVisible.value = false
  // 添加延时确保动画完成后再销毁
  setTimeout(() => {
    emit('destroy')
  }, 500)
}

const props = defineProps<{
  options: AlertOptions
}>()

onMounted(() => {
  setTimeout(() => {
    closeAlert()
  }, innerOptions.value.duration)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@keyframes decrease {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
