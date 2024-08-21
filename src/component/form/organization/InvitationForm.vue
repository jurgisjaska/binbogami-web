<script setup>
import api from "@/api.js";
import EmailField from "@/component/form/EmailField.vue";
import { defineEmits, ref } from "vue";

const email = ref(null);
const error = ref(null);
const success = ref(null);

const emit = defineEmits(["refresh"]);

const invite = () => {
  const data = {
    "email": [email.value],
  };

  api.post("v1/invitations", data)
    .then(() => {
      error.value = null;
      success.value = "Invitation sent successfully";
      email.value = null;
      emit("refresh", "invitations updated");
    })
    .catch(e => {
      error.value = e.response?.data?.message || "Unexpected error";
    });
};
</script>

<template>
  <form class="organization-invitation-form" action="#" @submit.prevent="invite">
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div class="alert alert-success" v-if="success">{{ success }}</div>

    <EmailField v-model="email" />

    <button class="btn btn-primary" type="submit">
      <i class="fa-solid fa-plus"></i> Invite
    </button>
  </form>
</template>
