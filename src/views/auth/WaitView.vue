<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="empty">
    <div class="empty-img">
      <img src="@/assets/wait.svg" alt="Account Pending Confirmation" />
    </div>
    <p class="empty-title">Account Pending Confirmation</p>
    <p class="empty-subtitle text-secondary">
      Your account is currently waiting for confirmation. Please wait until an administrator
      confirms your access or check back later.
    </p>
    <div class="empty-action">
      <RouterLink :to="{ name: 'signin' }" class="btn btn-primary btn-4">
        <i class="fa fa-arrow-left icon icon-2"></i> Return to Sign In
      </RouterLink>
    </div>
  </div>
</template>
