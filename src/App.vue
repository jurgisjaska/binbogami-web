<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <Component :is="$route.meta.layout || 'div'">
    <RouterView />
  </Component>

</template>