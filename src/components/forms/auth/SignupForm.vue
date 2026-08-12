<script setup>
import EmailField from '@/components/forms/EmailField.vue'
import DefaultField from '@/components/forms/fields/DefaultField.vue'
import PasswordField from '@/components/forms/PasswordField.vue'
import { useTokenStore } from '@/stores/token.js'
import { useUserStore } from '@/stores/user.js'
import moment from 'moment'
import { inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const authApi = inject('authApi')

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

const formatDate = (date) => (date ? moment(date).format('YYYY-MM-DD HH:mm') : '')

;(() => {
  const id = route.params.invitation ?? null
  if (!id) return
  error.value = null
  authApi
    .get('/auth/invitation/' + id)
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
    data.invitationId = invitation.value.id
  }

  authApi
    .post('auth/signup', data)
    .then((r) => {
      const response = r.data.data
      const user = response?.user

      if (user?.confirmedAt === null) {
        router.push({ name: 'wait' })
        return
      }

      userStore.set(response.user)
      tokenStore.set(response.token)

      router.push({ name: 'dashboard' })
    })
    .catch((e) => {
      error.value = e.response?.data?.message || 'Unexpected error'
    })
}
</script>

<template>
  <div class="card mb-4" v-if="invitation">
    <div class="card-status-start bg-primary"></div>
    <div class="card-body">
      <h3 class="card-title">Invitation</h3>
      <div class="text-secondary">
        You have been invited to create an account. This invitation expires on
        <time :datetime="invitation.expiredAt">{{ formatDate(invitation.expiredAt) }}</time
        >.
      </div>
    </div>
  </div>

  <h2 class="text-center h2 mb-4">Create new account</h2>
  <div class="alert alert-danger" role="alert" v-if="error">{{ error }}</div>

  <form class="signup-form" @submit.prevent="signup">
    <EmailField v-model="email" :required="true" />
    <PasswordField v-model="password" :required="true" />
    <DefaultField
      label="Repeated Password"
      type="password"
      v-model="repeatedPassword"
      :required="true"
    />
    <DefaultField label="Name" type="text" v-model="name" :required="true" />
    <DefaultField label="Surname" type="text" v-model="surname" :required="true" />
    <DefaultField label="Position" type="text" v-model="position" />

    <div class="form-footer">
      <button type="submit" class="btn btn-primary w-100">Sign Up</button>
    </div>
  </form>
</template>
