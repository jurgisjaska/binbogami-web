<script setup>
import { RouterView } from 'vue-router'
import NavigationBar from "@/components/navigation/NavigationBar.vue"
</script>

<template>
  <header>
    <NavigationBar></NavigationBar>
  </header>

  <div class="container">
    <RouterView />
  </div>
</template>
