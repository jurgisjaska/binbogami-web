<script setup>
import EmailField from '@/components/forms/EmailField.vue'
import { inject, ref } from 'vue'
import { RouterLink } from 'vue-router'

const authApi = inject('authApi')

const email = ref(null)
const error = ref(null)
const success = ref(null)

const forgot = () => {
  error.value = null
  success.value = null
  const data = {
    email: email.value
  }

  authApi
    .post('auth/forgot-password', data)
    .then((r) => {
      if (r.data.status === 'success') {
        error.value = null
        success.value = 'Please check your inbox for instructions on how to reset your password.'
      }
    })
    .catch((e) => {
      success.value = null
      error.value = e.response?.data?.message || 'Unexpected error'
    })
}
</script>

<template>
  <form class="forgot-password-form" @submit.prevent="forgot">
    <div class="alert alert-danger" role="alert" v-if="error">{{ error }}</div>
    <div class="alert alert-success" role="alert" v-if="success">{{ success }}</div>

    <p class="text-secondary mb-4">
      Please enter your registered email address below and we'll send you instructions on how to
      reset your password.
    </p>

    <EmailField v-model="email" />

    <div class="form-footer">
      <button type="submit" class="btn btn-primary w-100">Send</button>
    </div>
  </form>
</template>
