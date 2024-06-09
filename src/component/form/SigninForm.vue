<script setup>
import api from "@/api.js";
import EmailField from "@/component/form/EmailField.vue";
import PasswordField from "@/component/form/PasswordField.vue";
import { useOrganizationStore } from "@/store/organization.js";
import { useTokenStore } from "@/store/token.js";
import { useUserStore } from "@/store/user.js";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const tokenStore = useTokenStore();
const userStore = useUserStore();
const organizationStore = useOrganizationStore();

const router = useRouter();

const email = ref("");
const password = ref("");

const error = ref(null);

const signin = () => {
  error.value = null;
  const data = {
    "email": email.value,
    "password": password.value,
  };

  api.put("auth/signin", data)
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
      error.value = e.response?.data?.message || "Unexpected error";
    });
};
</script>

<template>
  <form class="signin-form" @submit.prevent="signin">

    <div class="notification is-danger" v-if="error">
      <p>{{ error }}</p>
    </div>

    <EmailField v-model="email" />
    <PasswordField v-model="password" :forgot="true" />

    <button type="submit" class="button is-primary is-fullwidth mt-6">Sign In</button>
    Se
    <hr>

    <div class="has-text-centered">
      Dont have an account?
      <RouterLink class="is-link" :to="{name: 'signup', params: {invitation: ''}}">Sign Up</RouterLink>
    </div>

  </form>
</template>