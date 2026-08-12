<script setup>
import DefaultField from '@/components/forms/fields/DefaultField.vue'
import PasswordField from '@/components/forms/PasswordField.vue'
import { inject, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const authApi = inject('authApi')
const router = useRouter()
const route = useRoute()

const token = ref(null)
const password = ref(null)
const repeatedPassword = ref(null)

const error = ref(null)
const success = ref(false)
const countdown = ref(10)
let timer = null

// verify that password reset token is still valid
;(() => {
  const id = route.params.id ?? null
  authApi
    .get('/auth/reset-password/' + id)
    .then((r) => {
      token.value = r.data.data.id
    })
    .catch((e) => {
      console.error(e.response?.data?.message || 'Unexpected error')
      router.push({ name: 'error_404' })
    })
})()

const reset = () => {
  error.value = null
  const data = {
    password: password.value,
    repeatedPassword: repeatedPassword.value,
    token: token.value
  }

  authApi
    .post('auth/reset-password', data)
    .then(() => {
      success.value = true
      countdown.value = 10
      timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          if (timer) {
            clearInterval(timer)
            timer = null
          }
          router.push({ name: 'signin' })
        }
      }, 1000)
    })
    .catch((e) => {
      error.value = e.response?.data?.message || 'Unexpected error'
    })
}

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<template>
  <div class="reset-password-form">
    <div class="alert alert-danger" v-if="error" role="alert">
      <div class="alert-icon"><i class="fa fa-exclamation-circle"></i></div>
      <div>{{ error }}</div>
    </div>
    <div class="alert alert-success" v-if="success" role="alert">
      <div class="alert-icon"><i class="fa fa-check"></i></div>
      <div>
        <div class="alert-heading">Password has been reset successfully.</div>
        <div class="alert-description">
          Redirecting to
          <RouterLink class="alert-link" :to="{ name: 'signin' }">Sign In</RouterLink> in
          {{ countdown }} seconds.
        </div>
      </div>
    </div>

    <form @submit.prevent="reset" v-if="!success">
      <p class="mb-6">You've requested to reset your password. Please enter your new password.</p>

      <PasswordField v-model="password" />
      <DefaultField label="Repeated Password" type="password" v-model="repeatedPassword" />

      <button type="submit" class="btn btn-primary mt-6">Reset Password</button>
    </form>

    <hr />

    <div>
      Already have an account?
      <RouterLink class="is-link" :to="{ name: 'signin' }">Sign In</RouterLink>
    </div>
  </div>
</template>
