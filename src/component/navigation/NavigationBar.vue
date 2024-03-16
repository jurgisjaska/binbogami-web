<script setup>
import { RouterLink } from "vue-router"
import { ref } from "vue"
import { useUserStore } from "@/store/user.js";

const userStore = useUserStore()

const email = ref(userStore ? userStore.email : "");

</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/">
        <img src="https://picsum.photos/112/23" width="112" height="28">
      </RouterLink>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/">Home</RouterLink>
        <RouterLink class="navbar-item" to="/about">About</RouterLink>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          {{ email }}
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink class="button is-primary" :to="{name: 'signup', params: {invitation: ''}}">
              <strong>Sign up</strong>
            </RouterLink>
            <RouterLink class="button is-light" :to="{name: 'signin'}">Sign in</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>