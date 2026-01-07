<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useTokenStore } from "@/store/token.js";
import { useUserStore } from "@/store/user.js";
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";

const userStore = useUserStore();
const tokenStore = useTokenStore();
const router = useRouter();
const user = computed(() => userStore.get);

const signout = () => {
  tokenStore.clear();
  userStore.clear();

  router.push({ name: "home" });
};
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <RouterLink class="navbar-brand" to="/public">Binbogami</RouterLink>
      </div>

      <ul class="navbar-nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" v-if="user">
        <li class="nav-item">
          <RouterLink :to="{name: 'dashboard'}" class="nav-link">Dashboard</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{name: 'books'}">Books</RouterLink>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Locations</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Categories</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Entries</a>
        </li>
      </ul>

      <div class="flex-shrink-0 dropdown" v-if="user">
        <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle show"
           data-bs-toggle="dropdown" aria-expanded="true">
          <img src="https://avatars.githubusercontent.com/u/897925?v=4" alt="mdo" width="38" height="38"
               class="rounded-circle">
        </a>
        <ul class="dropdown-menu text-small shadow"
            style=""
            data-popper-placement="bottom-end">
          <li>
            <RouterLink class="dropdown-item" :to="{name: 'users_profile'}">
              <i class="fa-solid fa-user"></i> Profile
            </RouterLink>
          </li>
          <li>
            <RouterLink class="dropdown-item" :to="{name: 'users_settings'}" >
              <i class="fa-solid fa-gear"></i> Settings
            </RouterLink>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li>
            <a href="#" class="dropdown-item" @click.prevent="signout" v-if="user">
              <i class="fa-solid fa-right-from-bracket text-danger"></i> Sign Out
            </a>
          </li>
        </ul>
      </div>

      <div class="text-end" v-if="!user">
        <RouterLink class="btn btn-primary me-2" :to="{name: 'signin'}" v-if="!user">
          Sign In
        </RouterLink>
        <RouterLink class="btn btn-secondary" :to="{name: 'signup', params: {invitation: ''}}" v-if="!user">
          Sign Up
        </RouterLink>
      </div>

    </div>
  </nav>
</template>

<style scoped>
.dropdown-menu {
  position: absolute;
  inset: 0 0 auto auto;
  margin: 0;
  transform: translate3d(0.5px, 34px, 0px);
}
</style>
