<script setup>

import api from "@/api.js";
import EmailField from "@/component/form/EmailField.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const email = ref(null);
const error = ref(null);
const success = ref(null);

const forgot = () => {
  error.value = null;
  success.value = null;
  const data = {
    "email": email.value,
  };

  api.post("auth/forgot-password", data)
    .then((r) => {
      if (r.data.status === "success") {
        error.value = null;
        success.value = "Please check your inbox for instructions on how to reset your password."
      }
    })
    .catch(e => {
      success.value = null;
      error.value = e.response?.data?.message || "Unexpected error";
    })
};

</script>

<template>
  <form class="forgot-password-form" @submit.prevent="forgot">

    <div class="notification is-danger" v-if="error">{{ error }}</div>
    <div class="notification is-success" v-if="success">{{ success }}</div>

    <p class="mb-6">
      Please enter your registered email address
      below and we'll send you instructions on how to reset your password.
    </p>

    <EmailField v-model="email" />

    <button type="submit" class="btn btn-primary mt-6">Send</button>

    <hr>

    <div>
      Dont have an account?
      <RouterLink class="is-link" :to="{name: 'signup', params: {invitation: ''}}">Sign Up</RouterLink>
    </div>

  </form>
</template>
