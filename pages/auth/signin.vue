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
  <div>
    <form @submit.prevent="auth.signIn(credentials)">
      <div>
        <label for="email">E-mailadres</label>
        <input type="email" id="email" v-model="credentials.email" />
      </div>
      <div>
        <label for="password">Wachtwoord</label>
        <input type="password" id="password" v-model="credentials.password" />
      </div>
      <div>
        <button type="submit">Inloggen</button>
      </div>
    </form>
  </div>
</template>
