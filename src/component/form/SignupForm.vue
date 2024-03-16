<script setup>
import { ref } from "vue"
import FormField from "@/component/form/FormField.vue"
import { persist } from "@/token.js"
import { useRoute, useRouter } from "vue-router"
import api from "@/api.js"

const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const repeatedPassword = ref("");
const name = ref("");
const surname = ref("");

const error = ref("");
const invitation = ref("");
(() => {
  const invitationId = route.params.invitation ?? null
  if (invitationId) {
    api.get("/p/invitation/" + invitationId)
      .then((r) => {
        console.log(r.data)
        invitation.value = r.data.data
      })
      .catch((e) => {
        error.value = e.response.data.message
      })
  }
})();

const signup = () => {
  const data = {
    "email": email.value,
    "password": password.value,
    "repeatedPassword": repeatedPassword.value,
    "name": name.value,
    "surname": surname.value
  }

  if (invitation) {
    data.invitationId = invitation.invitation.id
  }

  api.post("auth", data)
    .then((r) => {
      persist(r.data.data.token)
      router.push("")
    })
    .catch((e) => {
      error.value = e.response.data.message
    })
}
</script>

<template>
  <div class="card" v-if="invitation">
    <div class="card-header">
      <div class="card-header-title">
        {{ invitation.organization.name }}
      </div>
    </div>
    <div class="card-content">
      <div class="content">
        {{ invitation.organization.description }}
        <br>
        Expire on {{ invitation.invitation.expiredAt }} <time :datetime="invitation.invitation.expiredAt">{{ invitation.invitation.expiredAt }}</time>
      </div>
    </div>
  </div>

  <div class="notification is-danger" v-if="error">
    <p>{{ error }}</p>
  </div>

  <form class="signin-form" @submit.prevent="signup">
    <FormField label="Email" type="email" v-model="email" />
    <FormField label="Password" type="password" v-model="password" />
    <FormField label="Repeated Password" type="password" v-model="repeatedPassword" />
    <FormField label="Name" type="text" v-model="name" />
    <FormField label="Surname" type="text" v-model="surname" />

    <button type="submit" class="button is-primary">Sign Up</button>
  </form>
</template>