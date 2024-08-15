<script setup>
import { useOrganizationStore } from "@/store/organization.js";
import { useTokenStore } from "@/store/token.js";
import { useUserStore } from "@/store/user.js";
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";

const userStore = useUserStore();
const tokenStore = useTokenStore();
const organizationStore = useOrganizationStore();
const router = useRouter();
const user = computed(() => userStore.get);

const signout = () => {
  tokenStore.clear();
  userStore.clear();
  organizationStore.clear();

  router.push({ name: "home" });
};
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <RouterLink class="navbar-brand" to="/">Binbogami</RouterLink>
      </div>

      <ul class="navbar-nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" v-if="user">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Books</a>
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
          <img src="https://avatars.githubusercontent.com/u/897925?v=4" alt="mdo" width="32" height="32"
               class="rounded-circle">
        </a>
        <ul class="dropdown-menu text-small shadow show"
            style="position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate3d(0.5px, 34px, 0px);"
            data-popper-placement="bottom-end">
          <li><a class="dropdown-item" href="#">Organizations</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li>
            <a class="dropdown-item" href="#">
              <i class="fa-regular fa-user"></i> Profile
            </a>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li>
            <a class="dropdown-item" @click.prevent="signout" v-if="user">
              <i class="fa-solid fa-right-from-bracket"></i> Sign out
            </a>
          </li>
        </ul>
      </div >

      <div class="text-end" v-if="!user">
        <RouterLink class="btn btn-primary me-2" :to="{name: 'signin'}" v-if="!user">
          Sign in
        </RouterLink>
        <RouterLink class="btn btn-secondary" :to="{name: 'signup', params: {invitation: ''}}" v-if="!user">
          Sign up
        </RouterLink>
      </div>

    </div>
  </nav>


</template>