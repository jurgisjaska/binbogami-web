<script setup>
import api from "@/api.js";
import FormField from "@/component/form/FormField.vue";
import TextField from "@/component/form/TextField.vue";
import { useOrganizationStore } from "@/store/organization.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const organizationStore = useOrganizationStore();

const name = ref(null);
const description = ref(null);
const error = ref(null);

const create = () => {
  error.value = null;
  const data = {
    name: name.value,
    description: description.value,
  };

  api.post("/v1/organizations", data)
    .then((r) => {
      const organization = r.data.data;

      const configuration = {
        configuration: 1,
        value: organization.id,
      };

      api.put("/v1/users/configurations", configuration)
        .then((r) => {
          const organization = r.data.data.organization;
          organizationStore.set(organization);
          router.push({ name: "dashboard" });
        })
        .catch((e) => {
          console.error(e.response?.data?.message || "Unexpected error");
        });
    })
    .catch((e) => {
      error.value = e.response?.data?.message || "Unexpected error";
    });
};
</script>

<template>
  <form class="create-form" @submit.prevent="create">
    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <div class="row">
      <div class="col-6">
        <FormField
          type="text"
          label="Name"
          placeholder="Organization name"
          v-model="name"
        />
      </div>
      <div class="col-6">
        <TextField
          type="text"
          label="Description"
          placeholder="Organization description"
          v-model="description"
        />
      </div>
    </div>

    <button type="submit" class="btn btn-primary">
      <i class="fa-solid fa-plus"></i> Create Organization
    </button>

  </form>
</template>
