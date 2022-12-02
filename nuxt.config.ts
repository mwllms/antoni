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
})
