import { createApp, h } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import Alert from '~/components/elements/Alert.vue'
import type { AlertOptions } from '~/types/components'

interface AlertInstance extends ComponentPublicInstance {
  _container: HTMLElement
}

let currentAlertInstance: AlertInstance | null = null

export default defineNuxtPlugin(() => {
  const show = (options: AlertOptions) => {
    if (currentAlertInstance) {
      document.body.removeChild(currentAlertInstance._container)
      currentAlertInstance = null
    }

    const container = document.createElement('div')
    container.className =
      'fixed left-1/2 -translate-x-1/2 top-16 w-full px-4 z-50 flex flex-col items-center gap-4'
    document.body.appendChild(container)

    const app = createApp({
      setup() {
        return () =>
          h(Alert, {
            options,
            onDestroy: () => {
              document.body.removeChild(container)
              currentAlertInstance = null
            },
          })
      },
    })

    currentAlertInstance = app.mount(container) as AlertInstance
    currentAlertInstance._container = container

    return currentAlertInstance
  }

  const success = (options: AlertOptions | string) => {
    const alertOptions: AlertOptions =
      typeof options === 'string'
        ? { message: options, type: 'success' }
        : { ...options, type: 'success' }
    return show(alertOptions)
  }

  const error = (options: AlertOptions | string) => {
    const alertOptions: AlertOptions =
      typeof options === 'string'
        ? { message: options, type: 'error' }
        : { ...options, type: 'error' }
    return show(alertOptions)
  }

  const info = (options: AlertOptions | string) => {
    const alertOptions: AlertOptions =
      typeof options === 'string'
        ? { message: options, type: 'info' }
        : { ...options, type: 'info' }
    return show(alertOptions)
  }

  const warning = (options: AlertOptions | string) => {
    const alertOptions: AlertOptions =
      typeof options === 'string'
        ? { message: options, type: 'warning' }
        : { ...options, type: 'warning' }
    return show(alertOptions)
  }

  return {
    provide: {
      useAlert: {
        success,
        error,
        info,
        warning,
      },
    },
  }
})
