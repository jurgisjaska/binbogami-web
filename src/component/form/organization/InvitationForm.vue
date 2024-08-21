<script setup>
import api from "@/api.js";
import EmailField from "@/component/form/EmailField.vue";
import { defineEmits, defineProps, ref } from "vue";

const email = ref(null);
const error = ref(null);
const success = ref(null);

const emit = defineEmits(["refresh"]);
defineProps({
  membership: {
    type: Object,
    required: true,
  },
});

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
      success.value = null;
      error.value = e.response?.data?.message || "Unexpected error";
    });
};
</script>

<template>
  <form class="organization-invitation-form" action="#" @submit.prevent="invite">
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div class="alert alert-success" v-if="success">{{ success }}</div>

    <div class="alert alert-info" v-if="membership.role !== 4 && membership.role !== 3">
      Only organization owners and administrators allowed to invite new members.
    </div>

    <EmailField v-model="email" :disabled="membership.role !== 4 && membership.role !== 3" />

    <button class="btn btn-primary" type="submit" :disabled="membership.role !== 4 && membership.role !== 3">
      <i class="fa-solid fa-plus"></i> Invite
    </button>
  </form>
</template>
