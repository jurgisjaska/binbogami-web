<script setup>
import { ref } from "vue"
import axios from "axios"

const email = ref("")
const password = ref("")

const signin = () => {
  const data = {
    "email": email.value,
    "password": password.value
  }

  axios.put("auth", data)
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
        <input type="email" class="input" placeholder="Email" v-model="email" required>
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <div class="label">Password</div>
      <div class="control has-icons-left">
        <input type="password" class="input" placeholder="Password" v-model="password" required>
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
    </div>

    <button type="submit" class="button is-primary">Sign In</button>

  </form>
</template>