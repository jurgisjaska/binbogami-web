<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import {useTokenStore} from "@/store/token.js";
import {useUserStore} from "@/store/user.js";
import {computed} from "vue";
import {RouterLink, useRouter} from "vue-router";

const userStore = useUserStore();
const tokenStore = useTokenStore();
const router = useRouter();
const user = computed(() => userStore.get);

const signout = () => {
  tokenStore.clear();
  userStore.clear();

  router.push({name: "home"});
};

(() => {
  if(!user.value) {
    router.push({name: "signin"});
  }
})();

</script>

<template>
  <header class="navbar navbar-expand-md d-print-none">
    <div class="container">
      <div class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
        <RouterLink :to="{name: 'dashboard'}"><img src="@/asset/binbogami.png" alt="Binbogami"></RouterLink>
      </div>

      <ul class="navbar-nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" v-if="user">
        <li class="nav-item" :class="$route.name === 'dashboard' ? 'active' : ''">
          <RouterLink class="nav-link" :to="{name: 'dashboard'}" >Dashboard</RouterLink>
        </li>
        <li class="nav-item" :class="$route.meta.navigation === 'books' ? 'active' : ''">
          <RouterLink class="nav-link" :to="{name: 'books'}" >Books</RouterLink>
        </li>
        <li class="nav-item" :class="$route.meta.navigation === 'locations' ? 'active' : ''">
          <a class="nav-link" href="#">Locations</a>
        </li>
        <li class="nav-item" :class="$route.meta.navigation === 'categories' ? 'active' : ''">
          <RouterLink class="nav-link" :to="{name: 'categories'}" >Categories</RouterLink>
        </li>
        <li class="nav-item" :class="$route.meta.navigation === 'entries' ? 'active' : ''">
          <a class="nav-link" href="#">Entries</a>
        </li>
      </ul>

      <div class="navbar-nav flex-row order-md-last">
        <div class="d-none d-md-flex">
          <div class="nav-item">
            <a href="?theme=dark" class="nav-link px-0 hide-theme-dark" data-bs-toggle="tooltip"
               data-bs-placement="bottom" aria-label="Enable dark mode" data-bs-original-title="Enable dark mode">
              <i class="fa icon icon-2 fa-moon"></i>
            </a>
            <a href="?theme=light" class="nav-link px-0 hide-theme-light" data-bs-toggle="tooltip"
               data-bs-placement="bottom" aria-label="Enable light mode" data-bs-original-title="Enable light mode">
              <i class="fa icon icon-2 fa-sun"></i>
            </a>
          </div>
          <div class="nav-item dropdown d-none d-md-flex">
            <a href="#" class="nav-link px-0" data-bs-toggle="dropdown" tabindex="-1" aria-label="Show notifications"
               data-bs-auto-close="outside">
              <i class="fa icon icon-2 fa-bell"></i>
              <span class="badge bg-red"></span>
            </a>
            <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
              <div class="card">
                <div class="card-header d-flex">
                  <h3 class="card-title">Notifications</h3>
                  <div class="btn-close ms-auto" data-bs-dismiss="dropdown"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="nav-item dropdown">
            <a href="#" class="nav-link d-flex lh-1 p-0 px-2" data-bs-toggle="dropdown" aria-label="Open user menu"
               aria-expanded="false">
              <span class="avatar avatar-sm" style="background-image: url(https://picsum.photos/64/64)"> </span>
              <div class="d-none d-xl-block ps-2">
                <div>{{ user.name }} {{ user.surname }}</div>
                <div class="mt-1 small text-secondary">{{ user.position || "undefined" }}</div>
              </div>
            </a>
            <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <RouterLink class="dropdown-item" :to="{name: 'users_profile'}">
                <i class="fa-solid fa-user"></i> Profile
              </RouterLink>
              <div class="dropdown-divider"></div>
              <RouterLink class="dropdown-item" :to="{name: 'users_settings'}">
                <i class="fa-solid fa-gear"></i> Settings
              </RouterLink>
              <a class="dropdown-item text-danger" @click.prevent="signout" v-if="user">
                <i class="fa-solid fa-right-from-bracket "></i> Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>

      <!--      <div class="text-end" v-if="!user">-->
      <!--        <RouterLink class="btn btn-primary me-2" :to="{name: 'signin'}" v-if="!user">-->
      <!--          Sign In-->
      <!--        </RouterLink>-->
      <!--        <RouterLink class="btn btn-secondary" :to="{name: 'signup', params: {invitation: ''}}" v-if="!user">-->
      <!--          Sign Up-->
      <!--        </RouterLink>-->
      <!--      </div>-->

    </div>
  </header>
</template>

<style scoped>
.navbar-brand img {
  max-height: 32px;
}
</style>
