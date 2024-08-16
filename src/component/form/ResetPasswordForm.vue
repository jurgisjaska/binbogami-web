<script setup>

import api from "@/api.js";
import FormField from "@/component/form/FormField.vue";
import PasswordField from "@/component/form/PasswordField.vue";
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const token = ref(null);
const password = ref(null);
const repeatedPassword = ref(null);

const error = ref(null);

// verify that password reset token is still valid
(() => {
  const id = route.params.id ?? null;
  api.get("/p/reset-password/" + id)
    .then(r => {
      token.value = r.data.data.id;
    })
    .catch(e => {
      console.error(e.response?.data?.message || "Unexpected error");
      router.push({ name: "signup" });
    });
})();

const reset = () => {
  error.value = null;
  const data = {
    "password": password.value,
    "repeatedPassword": repeatedPassword.value,
    "token": token.value,
  };

  api.post("auth/reset-password", data)
    .then(() => {
      // redirect to signin page on success
      router.push({ name: "signin" });
    })
    .catch(e => {
      error.value = e.response?.data?.message || "Unexpected error";
    });
};

</script>

<template>
  <form class="reset-password-form" @submit.prevent="reset">

    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <p class="mb-6">
      You've requested to reset your password. Please enter your new password.
    </p>

    <PasswordField v-model="password" />
    <FormField label="Repeated Password" type="password" v-model="repeatedPassword" />

    <button type="submit" class="btn btn-primary mt-6">Reset Password</button>

    <hr>

    <div>
      Already have an account?
      <RouterLink class="is-link" :to="{name: 'signin'}">Sign In</RouterLink>
    </div>

  </form>
</template>
