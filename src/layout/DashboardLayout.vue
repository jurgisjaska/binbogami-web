<script setup lang="ts">
import SideMenu from '@/component/navigation/SideMenu.vue'
</script>

<template>
    <section class="columns">
      <SideMenu />

      <main class="column">
        <slot/>
      </main>
    </section>
</template>