// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'manifest',
          href: './manifest.json',
        },
      ],
    },
  },
  build: {
    transpile: ['web-push'],
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  imports: {
    dirs: ['stores'],
  },
})
