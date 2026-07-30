<script setup>
import NavigationBar from '@/components/Navigation.vue'
</script>

<template>
  <div class="container">
    <header class="mb-4">
      <NavigationBar />
    </header>
    <slot />
  </div>
</template>
