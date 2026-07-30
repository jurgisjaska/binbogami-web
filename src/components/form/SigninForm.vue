<script setup>
import EmailField from '@/components/form/EmailField.vue'
import PasswordField from '@/components/form/PasswordField.vue'
import { useTokenStore } from '@/stores/token.js'
import { useUserStore } from '@/stores/user.js'
import { inject, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const authApi = inject('authApi')
const tokenStore = useTokenStore()
const userStore = useUserStore()

const router = useRouter()

const email = ref('')
const password = ref('')

const error = ref(null)

const signin = () => {
  error.value = null
  const data = {
    email: email.value,
    password: password.value
  }

  authApi
    .put('auth/signin', data)
    .then((r) => {
      const token = r.data.data.token
      const user = r.data.data.user

      tokenStore.set(token)
      userStore.set(user)

      router.push({ name: 'dashboard' })
    })
    .catch((e) => {
      error.value = e.response?.data?.message || 'Unexpected error'
    })
}
</script>

<template>
  <form class="signin-form" @submit.prevent="signin">
    <h2 class="text-center h2 mb-4">Sign In to your account</h2>
    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <EmailField v-model="email" />
    <PasswordField v-model="password" :forgot="true" />

    <div class="form-footer">
      <button type="submit" class="btn btn-primary w-100">Sign In</button>
    </div>
  </form>
</template>
