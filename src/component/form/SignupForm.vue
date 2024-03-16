<script setup>
import { ref } from "vue"
import axios from "axios"
import FormField from "@/component/form/FormField.vue"

const email = ref("")
const password = ref("")
const repeatedPassword = ref("")
const name = ref("")
const surname = ref("")

const formError = ref("")

const signin = () => {
  const data = {
    "email": email.value,
    "password": password.value,
    "repeated_password": repeatedPassword.value,
    "name": name.value,
    "surname": surname.value
  }

  axios.post("auth", data)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      formError.value = error.response.data.message
    })
}
</script>

<template>
  <div class="notification is-danger" v-if="formError">
    <p>{{ formError }}</p>
  </div>

  <form class="signin-form" @submit.prevent="signin">
    <FormField label="Email" type="email" v-model="email" :errors="errors" />
    <FormField label="Password" type="password" v-model="password" :errors="errors" />
    <FormField label="Repeated Password" type="password" v-model="repeatedPassword" :errors="errors" />
    <FormField label="Name" type="text" v-model="name" :errors="errors" />
    <FormField label="Surname" type="text" v-model="surname" :errors="errors" />

    <button type="submit" class="button is-primary">Sign Up</button>
  </form>
</template>