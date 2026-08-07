<script setup>
import ForgotPasswordForm from '@/components/forms/auth/ForgotPasswordForm.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="forgot-password-view">
    <header class="text-center mb-4">
      <RouterLink :to="{ name: 'home' }">
        <img src="../../assets/binbogami.png" alt="Binbogami" class="navbar-brand-image" />
      </RouterLink>
    </header>

    <div class="card card-md">
      <div class="card-body">
        <ForgotPasswordForm />
      </div>
    </div>

    <footer class="text-center text-secondary mt-3">
      Dont have an account?
      <RouterLink class="is-link" :to="{ name: 'signup', params: { invitation: '' } }"
        >Sign Up</RouterLink
      >
    </footer>
  </div>
</template>

<style scoped>
.forgot-password-view {
  display: contents;
}
</style>
