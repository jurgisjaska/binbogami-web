<script setup>
import api from "@/api.js";
import TextField from "@/component/form/field/TextField.vue";
import HorizontalField from "@/component/form/field/HorizontalField.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const name = ref(null);
const description = ref(null);
const closedAt = ref(null);
const deletedAt = ref(null);

const error = ref(null);
const success = ref(null);

let id = route.params.book ?? null;

const onSubmit = () => {
  error.value = null;
  success.value = null;

  const method = id ? "put" : "post";
  const url = id ? "/v1/books/" + id : "/v1/books";

  api[method](url, {
    "id": id,
    "name": name.value,
    "description": description.value
  })
      .then((r) => {
        if (r.data.data.id) {
          error.value = null;
          success.value = "Book " + (id ? "updated" : "created") + " successfully!";

          id = r.data.data.id;
          name.value = r.data.data.name;
          description.value = r.data.data.description;
          closedAt.value = r.data.data.closedAt;
          deletedAt.value = r.data.data.deletedAt;
        }
      })
      .catch((e) => {
        error.value = e.response?.data?.message || "Unexpected error";
      });
};

const onReset = () => {
  success.value = null;
  id = null;
};

const load = (id) => {
  error.value = null;
  api.get("/v1/books/" + id)
      .then(r => {
        name.value = r.data.data.name;
        description.value = r.data.data.description;
      })
      .catch(e => {
        error.value = e.response?.data?.message || "Unexpected error";
      });
};

if (id) load(id);
</script>

<template>
  <form class="book-form" @submit.prevent="onSubmit">
    <div class="alert alert-danger" v-if="error">
      <div class="alert-icon"><i class="fa fa-exclamation-circle"></i></div>
      {{ error }}
    </div>

    <div class="alert alert-success" v-if="success">
      <div class="alert-icon"><i class="fa fa-check"></i></div>
      {{ success }}
      <RouterLink :to="{name: 'books'}">Return to the books</RouterLink>
      <a href="#" @click.prevent="onReset" class="ms-2">Create a new Book</a>
    </div>

    <HorizontalField type="text" label="Name" placeholder="Book name" v-model="name" :required="true"/>
    <TextField label="Description" placeholder="Book description" v-model="description"/>

    <div class="field mb-3 row align-items-center" v-if="id">
      <label class="col-3 col-form-label" >Status</label>
      <div class="col">
        <span class="badge bg-green-lt" v-if="!closedAt && !deletedAt">Active</span>
        <span class="badge bg-default-lt" v-if="closedAt && !deletedAt">Closed</span>
        <span class="badge bg-red-lt" v-if="deletedAt">Deleted</span>
      </div>
    </div>

    <div class="text-end">
      <RouterLink :to="{name: 'books'}" class="btn btn-secondary me-2">Back</RouterLink>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>
