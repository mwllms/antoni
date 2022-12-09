import { defineStore } from 'pinia'
import { Credentials, AuthState } from '~~/types/auth'

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    error: null,
  }),

  actions: {
    async signIn(credentials: Credentials) {
      try {
        await $fetch('/api/auth/signin', {
          method: 'POST',
          body: credentials,
        })
        this.error = null
        await this.me()
      } catch (err: any) {
        this.user = null
        this.isAuthenticated = false
        console.log(err)
        this.error = err.response._data.message
      }
    },
    async me() {
      try {
        const user = await $fetch('/api/auth/me', { headers: useRequestHeaders(['cookie']) as HeadersInit })
        this.error = null
        this.user = user
        this.isAuthenticated = true
      } catch (err: any) {
        this.$reset()
      }
    },
    async signOut() {
      try {
        await $fetch('/api/auth/signout', {
          method: 'POST',
        })
        this.$reset()
      } catch (err: any) {
        this.error = err.response._data.message
      }
    },
  },
})
