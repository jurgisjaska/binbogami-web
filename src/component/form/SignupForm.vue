<script setup>
import { ref } from "vue"
import axios from "axios"
import FormField from "@/component/form/FormField.vue"

const email = ref("")
const password = ref("")
const repeatedPassword = ref("")
const name = ref("")
const surname = ref("")

const signin = () => {
  const data = {
    "email": email.value,
    "password": password.value,
    "repeated_password": repeatedPassword.value,
    "name": name.value,
    "surname": surname.value
  }

  console.log(data)
  return

  axios.post("auth", data)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <form class="signin-form" @submit.prevent="signin">

    <div class="field">
      <div class="label">Email</div>
      <div class="control has-icons-left">
        <input type="email" class="input" placeholder="Email" v-model="email">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <div class="label">Password</div>
      <div class="control has-icons-left">
        <input type="password" class="input" placeholder="Password" v-model="password">
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
    </div>

    <FormField label="Repeated Password" type="password" icon="fa-key" :model="repeatedPassword"/>
    <FormField label="Name" type="text" icon="fa-key" :model="name"/>
    <FormField label="Surname" type="text" icon="fa-key" :model="surname"/>

    <button type="submit" class="button is-primary">Sign In</button>

  </form>
</template>