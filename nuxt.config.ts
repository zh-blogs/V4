import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    'nuxt-auth-utils',
    '@nuxt/fonts',
    '@nuxt/eslint',
    'nuxt-security',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh',
      },
      title: '中文博客列表导航',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
  css: ['~/assets/css/main.css', 'remixicon/fonts/remixicon.css'],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    storage: 'localStorage',
    storageKey: 'color-mode',
    dataValue: 'theme',
    classPrefix: '',
    classSuffix: '',
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3,
        },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
          langs: [
            'js',
            'jsx',
            'json',
            'ts',
            'tsx',
            'vue',
            'css',
            'html',
            'vue',
            'bash',
            'md',
            'mdc',
            'yaml',
            'java',
          ],
        },
      },
    },
    database: {
      type: 'postgres',
      url: process.env.DATABASE_URL!,
    },
  },
  runtimeConfig: {
    oauth: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    },
  },
  srcDir: 'src/',
  serverDir: 'server/',
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      stylistic: {
        semi: false,
        indent: 2,
        quotes: 'single',
      },
    },
  },
  fonts: {
    provider: 'google',
    devtools: true,
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      styles: ['normal', 'italic'],
    },
    experimental: {
      processCSSVariables: true,
    },
  },
  security: {
    enabled: process.env.NODE_ENV === 'production' ? true : false,
  },
})
