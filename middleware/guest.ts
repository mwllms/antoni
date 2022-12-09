import { useAuth } from '~~/stores/useAuth'
import { storeToRefs } from 'pinia'
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth()
  const { isAuthenticated } = storeToRefs(auth)
  if (isAuthenticated.value) {
    return navigateTo({ name: 'index' })
  }
})
