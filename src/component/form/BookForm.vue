<script setup>
import api from "@/api.js";
import FormField from "@/component/form/FormField.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const name = ref(null);
const description = ref(null);
const organization = ref(null);
const error = ref(null);

const submit = () => {
  error.value = null;
};

(() => {
  const id = route.params.book ?? null;
  error.value = null;
  api.get("/v1/books/" + id)
    .then(r => {
      name.value = r.data.data.name;
      description.value = r.data.data.description;
      organization.value = r.data.data.organization;
    })
    .catch(e => {
      error.value = e.response?.data?.message || "Unexpected error";
    });
})();
</script>

<template>
  <form class="book-form" @submit.prevent="submit">
    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <div class="row">
      <div class="col-6">
        <FormField type="text" label="Name" placeholder="Book name" v-model="name" />
        <FormField type="text" label="Description" placeholder="Book description" v-model="description" />
      </div>
      <div class="col-6">
        <FormField type="text" label="Organization" placeholder="Organization" v-model="organization" />
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>