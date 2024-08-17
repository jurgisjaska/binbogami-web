<script setup>
import NavigationBar from "@/component/navigation/NavigationBar.vue";
</script>

<template>
    <div class="container">
      <header class="mb-3">
        <NavigationBar />
      </header>

      <div class="container">
        <h6 class="mb-4">{{ $route.meta.title || "Dashboard" }}</h6>
        <slot/>
      </div>
    </div>
</template>