<template>
  <Transition name="fade">
    <div role="alert" class="alert min-w-xl gap-2 " :class="typeClasses[innerOptions.type ?? 'tips'].alert">
      <i v-if="innerOptions.alertIconVisible" class="text-2xl self-start"
        :class="typeClasses[innerOptions.type ?? 'tips'].icon"></i>
      <div class="">
        <h3 v-if="innerOptions.title" class="font-bold text-lg h-auto break-all">{{ innerOptions.title }}</h3>
        <div class="text-sm h-auto break-all">{{ innerOptions.message }} </div>
      </div>
      <button v-if="innerOptions.closeIconVisible" class="btn btn-sm btn-ghost self-start p-0" @click="closeAlert">
        <i class=" ri-close-line text-xl"></i>
      </button>
      <div class="absolute w-full h-0.5"></div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import type { AlertOptions } from '~/types/components';

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
    alert: 'alert-info alert-soft',
    icon: 'ri-information-line text-blue-500',
  },
  success: {
    alert: 'alert-success alert-soft',
    icon: 'ri-checkbox-circle-line text-green-500',
  },
  warning: {
    alert: 'alert-warning alert-soft',
    icon: 'ri-error-warning-line text-yellow-500',
  },
  error: {
    alert: 'alert-error alert-soft',
    icon: 'ri-close-circle-line text-red-500',
  },
  tips: {
    alert: '',
    icon: 'ri-lightbulb-line text-neutral-500',
  }
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
</style>