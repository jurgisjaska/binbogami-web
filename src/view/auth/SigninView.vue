<script setup>
import SigninForm from "@/component/form/SigninForm.vue";
import {RouterLink} from "vue-router";
</script>

<template>
  <div class="signin-view">
    <header class="text-center mb-4">
      <RouterLink :to="{name: 'home'}">
        <img src="../../asset/binbogami.png" alt="Binbogami" class="navbar-brand-image">
      </RouterLink>
    </header>

    <div class="card card-md">
      <div class="card-body">
        <SigninForm/>
      </div>
      <div class="hr-text">or</div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <button class="btn btn-4 w-100"><i class="fa-brands fa-google icon icon-2"></i> Sign In with Google</button>
          </div>
          <div class="col">
            <button class="btn btn-4 w-100"><i class="fa-brands fa-x-twitter icon icon-2"></i> Sign In with X</button>
          </div>
        </div>
      </div>
    </div>

    <footer class="text-center text-secondary mt-3">
      Dont have an account?
      <RouterLink class="is-link" :to="{name: 'signup', params: {invitation: ''}}">Sign Up</RouterLink>
    </footer>
  </div>
</template>

<style scoped>
.signin-view {
  display: contents;
}
</style>
