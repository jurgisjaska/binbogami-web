<script setup>
import EmailField from '@/components/forms/EmailField.vue'
import DefaultField from '@/components/forms/fields/DefaultField.vue'
import PasswordField from '@/components/forms/PasswordField.vue'
import { useTokenStore } from '@/stores/token.js'
import { useUserStore } from '@/stores/user.js'
import { inject, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const authApi = inject('authApi')
const appApi = inject('appApi')

const router = useRouter()
const route = useRoute()

const tokenStore = useTokenStore()
const userStore = useUserStore()

const invitation = ref(null)

const email = ref(null)
const password = ref(null)
const repeatedPassword = ref(null)
const name = ref(null)
const surname = ref(null)
const position = ref(null)

const error = ref(null)

;(() => {
  const id = route.params.invitation ?? null
  error.value = null
  appApi
    .get('/p/invitation/' + id)
    .then((r) => {
      invitation.value = r.data.data
    })
    .catch((e) => {
      console.error(e.response?.data?.message || 'Unexpected error')
      router.push({ name: 'signup' })
    })
})()

const signup = () => {
  error.value = null
  const data = {
    email: email.value,
    password: password.value,
    repeatedPassword: repeatedPassword.value,
    name: name.value,
    surname: surname.value,
    position: position.value
  }

  if (invitation.value) {
    data.invitationId = invitation.value.invitation.id
  }

  authApi
    .post('auth/signup', data)
    .then((r) => {
      const data = r.data.data

      userStore.set(data.user)
      tokenStore.set(data.token)

      router.push('dashboard')
    })
    .catch((e) => {
      error.value = e.response?.data?.message || 'Unexpected error'
    })
}
</script>

<template>
  <div class="card mb-4" v-if="invitation">
    <header class="card-header">
      <div class="card-header-title">[ NAME ]</div>
    </header>
    <div class="card-content">
      <div class="content">[ DESCRIPTION ]</div>
    </div>
    <footer class="card-footer has-text-left">
      <div class="card-footer-item has-text-left is-small">
        Expire on&nbsp;<time :datetime="invitation.invitation.expiredAt">{{
          invitation.invitation.expiredAt
        }}</time>
      </div>
    </footer>
  </div>

  <h2 class="text-center h2 mb-4">Create new account</h2>
  <div class="alert alert-danger" role="alert" v-if="error">{{ error }}</div>

  <form class="signup-form" @submit.prevent="signup">
    <EmailField v-model="email" />
    <PasswordField v-model="password" />
    <DefaultField label="Repeated Password" type="password" v-model="repeatedPassword" />
    <DefaultField label="Name" type="text" v-model="name" />
    <DefaultField label="Surname" type="text" v-model="surname" />
    <DefaultField label="Position (optional)" type="text" v-model="position" />

    <div class="form-footer">
      <button type="submit" class="btn btn-primary w-100">Sign Up</button>
    </div>
  </form>
</template>
