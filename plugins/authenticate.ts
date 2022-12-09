import { useAuth } from '~~/stores/useAuth'
export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuth()
  await auth.me()
})
