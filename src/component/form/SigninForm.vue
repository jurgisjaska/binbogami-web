<script setup>
import { ref } from "vue";
import api from "@/api.js";
import { useTokenStore } from "@/store/token.js";
import { useUserStore } from "@/store/user.js";
import { useOrganizationStore } from "@/store/organization.js";
import { useRouter } from "vue-router";

const tokenStore = useTokenStore();
const userStore = useUserStore();
const organizationStore = useOrganizationStore();

const router = useRouter();

const email = ref("");
const password = ref("");

const error = ref("");

const signin = () => {
  error.value = null;
  const data = {
    "email": email.value,
    "password": password.value,
  };

  api.put("auth", data)
    .then((r) => {
      const token = r.data.data.token;
      const user = r.data.data.user;
      const organization = r.data.data.organization;
      const member = r.data.data.member;

      tokenStore.set(token);
      userStore.set(user);
      organizationStore.set(organization);

      if (!member) {
        router.push({ name: "signup_organization" });
        return;
      }

      if (member && !organization) {
        router.push({ name: "signin_organization" });
        return;
      }

      router.push({ name: "dashboard" });
    })
    .catch((e) => {
      console.error(e);
      error.value = e.response?.data?.message || "Unexpected error";
    });
};
</script>

<template>
  <form class="signin-form" @submit.prevent="signin">

    <div class="notification is-danger" v-if="error">
      <p>{{ error }}</p>
    </div>

    <div class="field">
      <div class="label">Email</div>
      <div class="control has-icons-left">
        <input type="email" class="input" placeholder="Email" v-model="email">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <div class="label">Password</div>
      <div class="control has-icons-left">
        <input type="password" class="input" placeholder="Password" v-model="password">
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
    </div>

    <button type="submit" class="button is-primary">Sign In</button>

  </form>
</template>