<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { Credentials } from '~~/types/auth'

  definePageMeta({
    layout: 'guest',
    middleware: ['guest'],
  })

  const auth = useAuth()
  const { isAuthenticated } = storeToRefs(auth)
  const router = useRouter()
  const credentials = useState(
    'credetials',
    (): Credentials => ({
      email: null,
      password: null,
      rememberMe: false,
    })
  )
  watch(isAuthenticated, () => {
    if (isAuthenticated.value) {
      router.push({ name: 'index' })
    }
  })
</script>

<template>
  <div class="w-full px-4">
    <div class="flex items-center space-x-2">
      <img class="h-14 w-14" src="/icon.svg" alt="antoni" />
      <div>
        <p class="text-3xl font-medium leading-none tracking-widest text-slate-800">antoni</p>
        <span class="mt-0.5 block leading-none text-slate-500">app in de buurt</span>
      </div>
    </div>
    <form class="mt-8" @submit.prevent="auth.signIn(credentials)">
      <div>
        <label for="email" class="block text-sm text-slate-600">E-mailadres</label>
        <input type="email" id="email" class="mt-2 w-full rounded-md border-slate-300" v-model="credentials.email" />
      </div>
      <div class="mt-4">
        <label for="password" class="block text-sm text-slate-600">Wachtwoord</label>
        <input
          type="password"
          id="password"
          class="mt-2 w-full rounded-md border-slate-300"
          v-model="credentials.password"
        />
      </div>
      <div class="mt-6">
        <button
          type="submit"
          class="h-10 w-full rounded-md bg-pink-600 px-4 text-center font-medium text-pink-100 hover:bg-pink-500"
        >
          Inloggen
        </button>
      </div>
    </form>
  </div>
</template>
