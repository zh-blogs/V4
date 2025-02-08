// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src/',
  css: ['~/assets/css/main.css', 'remixicon/fonts/remixicon.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh'
      },
      title: "中文博客列表导航",
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3
        },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
          langs: ['js', 'jsx', 'json', 'ts', 'tsx', 'vue', 'css', 'html', 'vue', 'bash', 'md', 'mdc', 'yaml', 'java']
        }
      }
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    storage: 'localStorage',
    storageKey: 'color-mode',
    classPrefix: '',
    classSuffix: ''
  }
})
