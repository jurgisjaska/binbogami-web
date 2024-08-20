<script setup>

import api from "@/api.js";
import EmailField from "@/component/form/EmailField.vue";
import { ref } from "vue";

const email = ref(null);
const error = ref(null);

const invite = () => {
  const data = [...email.value];

  api.post("auth/forgot-password", data)
    .then(() => {
      error.value = null;
    })
    .catch(e => {
      error.value = e.response?.data?.message || "Unexpected error";
    });
};
</script>

<template>
  <form class="organization-invitation-form" action="#" @submit.prevent="invite">

    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <EmailField v-model="email" />

    <button class="btn btn-primary" type="submit">
      <i class="fa-solid fa-plus"></i> Invite
    </button>
  </form>
</template>

<style scoped>

</style>