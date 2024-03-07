<script setup>
import { ref } from "vue"

const email = ref("")
const password = ref("")

const signin = () => {
  console.log(email.value)
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