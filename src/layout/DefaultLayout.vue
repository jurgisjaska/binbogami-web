<script setup>

import NavigationBar from "@/component/navigation/NavigationBar.vue";
</script>

<template>
  <div class="container">
    <header class="mb-5">
      <NavigationBar />
    </header>
    <slot />
  </div>
</template>