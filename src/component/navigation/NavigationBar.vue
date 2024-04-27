<script setup>
import { RouterLink, useRouter } from "vue-router";
import { computed } from "vue";
import { useUserStore } from "@/store/user.js";
import { useTokenStore } from "@/store/token.js";
import { useOrganizationStore } from "@/store/organization.js";

const userStore = useUserStore()
const tokenStore = useTokenStore()
const organizationStore = useOrganizationStore()
const router = useRouter()
const user = computed(() => userStore.get)

const signout = () => {
  tokenStore.clear();
  userStore.clear();
  organizationStore.clear();

  router.push({name: "home"});
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/">
        <img src="https://picsum.photos/112/23" width="112" height="28" alt="">
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
          {{ user?.name }} {{ user?.surname }}
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink class="button is-primary" :to="{name: 'signup', params: {invitation: ''}}" v-if="!user">
              <strong>Sign up</strong>
            </RouterLink>
            <RouterLink class="button is-light" :to="{name: 'signin'}" v-if="!user">Sign in</RouterLink>
            <button class="button is-danger" @click.prevent="signout" v-if="user">Sign out</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>