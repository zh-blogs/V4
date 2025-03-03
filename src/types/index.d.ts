import type { AlertOptions } from './components'

declare module '#app' {
  interface NuxtApp {
    $useAlert: {
      success(options: AlertOptions | string): void
      error(options: AlertOptions | string): void
      info(options: AlertOptions | string): void
      warning(options: AlertOptions | string): void
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $useAlert: {
      success(options: AlertOptions | string): void
      error(options: AlertOptions | string): void
      info(options: AlertOptions | string): void
      warning(options: AlertOptions | string): void
    }
  }
}

export {}
