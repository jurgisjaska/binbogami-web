<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from "@/components/navigation/NavigationBar.vue"
</script>

<template>
  <header>
    <NavigationBar></NavigationBar>
<!--    <div class="wrapper">-->
<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
<!--    </div>-->
  </header>

  <RouterView />
</template>
