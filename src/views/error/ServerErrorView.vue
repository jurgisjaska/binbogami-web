<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="empty">
    <div class="empty-img">
      <img src="@/assets/error500.svg" alt="500 Error" />
    </div>
    <p class="empty-title">Oops… You just found an error page</p>
    <p class="empty-subtitle text-secondary">
      We are sorry but our server encountered an internal error
    </p>
    <div class="empty-action">
      <RouterLink :to="{ name: 'home' }" class="btn btn-primary btn-4">
        <i class="fa fa-arrow-left icon icon-2"></i> Return to Homepage
      </RouterLink>
    </div>
  </div>
</template>
