<script setup>
import api from "@/api.js";
import TextField from "@/component/form/field/TextField.vue";
import FormField from "@/component/form/FormField.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const name = ref(null);
const description = ref(null);
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
        <TextField label="Description" placeholder="Book description" v-model="description" />
      </div>
      <div class="col-6"></div>
    </div>
  </form>
</template>
