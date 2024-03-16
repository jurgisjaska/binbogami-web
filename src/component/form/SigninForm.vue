<script setup>
import { ref } from "vue"
import api from "../../api.js"

const email = ref("")
const password = ref("")

const error = ref("")

const signin = () => {
  const data = {
    "email": email.value,
    "password": password.value
  }

  api.put("auth", data)
    .then((r) => {
      localStorage.setItem("binbogami_token", r.data.data.token)
    })
    .catch((e) => {
      error.value = e.response.data.message;
    })
}
</script>

<template>
  <form class="signin-form" @submit.prevent="signin">

    <div class="notification is-danger" v-if="error">
      <p>{{ error }}</p>
    </div>

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

    <button type="submit" class="button is-primary">Sign In</button>

  </form>
</template>