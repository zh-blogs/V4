import { checkEnv } from "./env.check"
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/color-mode', 'nuxt-auth-utils'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src/',
  serverDir: 'server/',
  css: ['~/assets/css/main.css', 'remixicon/fonts/remixicon.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
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
  hooks: {
    'ready': () => {
      checkEnv()
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
    database: {
      type: 'd1',
      bindingName: "zhblogs"
    }
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
  },
  runtimeConfig: {
    oauth: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        redirectURL: process.env.REDIRECT_URL
      }
    }
  }
})