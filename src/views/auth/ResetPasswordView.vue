<script setup>
import ResetPasswordForm from '@/components/forms/auth/ResetPasswordForm.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="reset-password-view">
    <header class="text-center mb-4">
      <RouterLink :to="{ name: 'home' }">
        <img src="../../assets/binbogami.png" alt="Binbogami" class="navbar-brand-image" />
      </RouterLink>
    </header>

    <div class="card card-md">
      <div class="card-body">
        <ResetPasswordForm />
      </div>
    </div>
  </div>
</template>

<style scoped>
.reset-password-view {
  display: contents;
}
</style>
