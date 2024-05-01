<script setup>
import { RouterView } from 'vue-router'
import NavigationBar from "@/component/navigation/NavigationBar.vue"
</script>

<template>
  <Component :is="$route.meta.layout || 'div'">
    <header>
      <NavigationBar></NavigationBar>
    </header>

    <RouterView />
  </Component>

</template>
