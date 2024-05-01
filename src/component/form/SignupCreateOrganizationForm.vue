<script setup>
import FormField from "@/component/form/FormField.vue";
import { ref } from "vue";
import api from "@/api.js";
import { useRouter } from "vue-router";
import { useOrganizationStore } from "@/store/organization.js";

const router = useRouter();
const organizationStore = useOrganizationStore();

const name = ref("");
const description = ref("");

const error = ref("");

const createOrganization = () => {
  error.value = null;
  const data = {
    name: name.value,
    description: description.value,
  };

  api.post("v1/organizations", data)
    .then((r) => {
      const data = r.data.data;
      organizationStore.set(data);
      router.push({ name: "dashboard" });
    })
    .catch((e) => {
      error.value = e.response?.data?.message || "Unexpected error";
    });
};
</script>

<template>
  <div class="notification is-danger" v-if="error">
    <p>{{ error }}</p>
  </div>

  <form class="signup-organization-form" @submit.prevent="createOrganization">
    <h1>Create organization</h1>

    <FormField label="Name" type="text" v-model="name" />
    <FormField label="Description" type="text" v-model="description" />

    <button type="submit" class="button is-primary">Create Organization</button>
  </form>
</template>