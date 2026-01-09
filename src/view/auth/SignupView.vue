<script setup>
import SignupForm from "@/component/form/SignupForm.vue"
import {RouterLink} from "vue-router";
</script>

<template>
<div class="signup-view">
  <header class="text-center mb-4">
    <RouterLink :to="{name: 'home'}">
      <img src="../../asset/binbogami.png" alt="Binbogami" class="navbar-brand-image">
    </RouterLink>
  </header>

  <div class="card card-md">
    <div class="card-body">
      <SignupForm />
    </div>
  </div>

  <footer class="text-center text-secondary mt-3">
    Already have account?
    <RouterLink class="is-link" :to="{name: 'signin'}">Sign In</RouterLink>
  </footer>
</div>
</template>

<style scoped>
.signup-view {
  display: contents;
}
</style>
