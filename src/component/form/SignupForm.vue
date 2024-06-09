<script setup>
import { ref } from "vue";
import FormField from "@/component/form/FormField.vue";
import EmailField from "@/component/form/EmailField.vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import api from "@/api.js";
import { useTokenStore } from "@/store/token.js";
import { useUserStore } from "@/store/user.js";
import { useOrganizationStore } from "@/store/organization.js";
import PasswordField from "@/component/form/PasswordField.vue";

const router = useRouter();
const route = useRoute();

const tokenStore = useTokenStore();
const userStore = useUserStore();
const organizationStore = useOrganizationStore();

const email = ref(null);
const password = ref(null);
const repeatedPassword = ref(null);
const name = ref(null);
const surname = ref(null);

const error = ref(null);

// load details about invitation
const invitation = ref(null);
(() => {
  const invitationId = route.params.invitation ?? null;
  if (invitationId) {
    error.value = null;
    api.get("/p/invitation/" + invitationId)
      .then((r) => {
        invitation.value = r.data.data;
      })
      .catch((e) => {
        error.value = e.response?.data?.message || "Unexpected error";
      });
  }
})();

const signup = () => {
  error.value = null;
  const data = {
    "email": email.value,
    "password": password.value,
    "repeatedPassword": repeatedPassword.value,
    "name": name.value,
    "surname": surname.value,
  };

  if (invitation.value) {
    data.invitationId = invitation.value.invitation.id;
  }

  api.post("auth/signup", data)
    .then((r) => {
      const data = r.data.data;

      userStore.set(data.user);
      tokenStore.set(data.token);
      organizationStore.set(data.organization);

      router.push({ name: data.member ? "dashboard" : "signup_organization" });
    })
    .catch((e) => {
      error.value = e.response?.data?.message || "Unexpected error";
    });
};
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
        Expire on {{ invitation.invitation.expiredAt }}
        <time :datetime="invitation.invitation.expiredAt">{{ invitation.invitation.expiredAt }}</time>
      </div>
    </div>
  </div>

  <div class="notification is-danger" v-if="error">
    <p>{{ error }}</p>
  </div>

  <form class="signup-form" @submit.prevent="signup">
    <EmailField v-model="email"/>
    <PasswordField v-model="password"/>
    <FormField label="Repeated Password" type="password" v-model="repeatedPassword" />
    <FormField label="Name" type="text" v-model="name" />
    <FormField label="Surname" type="text" v-model="surname" />

    <button type="submit" class="button is-primary  is-fullwidth mt-6">Sign Up</button>

    <hr>

    <div class="has-text-centered">
      Already have an account?
      <RouterLink class="is-link" :to="{name: 'signin'}">Sign In</RouterLink>
    </div>

  </form>
</template>