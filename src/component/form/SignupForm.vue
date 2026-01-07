<script setup>
import api from "@/api.js";
import EmailField from "@/component/form/EmailField.vue";
import FormField from "@/component/form/FormField.vue";
import PasswordField from "@/component/form/PasswordField.vue";
import { useTokenStore } from "@/store/token.js";
import { useUserStore } from "@/store/user.js";
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const tokenStore = useTokenStore();
const userStore = useUserStore();

const invitation = ref(null);

const email = ref(null);
const password = ref(null);
const repeatedPassword = ref(null);
const name = ref(null);
const surname = ref(null);

const error = ref(null);

(() => {
  const id = route.params.invitation ?? null;
  error.value = null;
  api.get("/p/invitation/" + id)
    .then((r) => {
      invitation.value = r.data.data;
    })
    .catch((e) => {
      console.error(e.response?.data?.message || "Unexpected error");
      router.push({ name: "signup" });
    });
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

      router.push("dashboard");
    })
    .catch((e) => {
      error.value = e.response?.data?.message || "Unexpected error";
    });
};
</script>

<template>
  <div class="card mb-4" v-if="invitation">
    <header class="card-header">
      <div class="card-header-title">
        [ NAME ]
      </div>
    </header>
    <div class="card-content">
      <div class="content">
        [ DESCRIPTION ]
      </div>
    </div>
    <footer class="card-footer has-text-left">
      <div class="card-footer-item has-text-left is-small">
        Expire on&nbsp;<time :datetime="invitation.invitation.expiredAt">{{ invitation.invitation.expiredAt }}</time>
      </div>
    </footer>
  </div>

  <div class="alert aler-danger" v-if="error">{{ error }}</div>

  <form class="signup-form" @submit.prevent="signup">
    <EmailField v-model="email" />
    <PasswordField v-model="password" />
    <FormField label="Repeated Password" type="password" v-model="repeatedPassword" />
    <FormField label="Name" type="text" v-model="name" />
    <FormField label="Surname" type="text" v-model="surname" />

    <div class="d-flex justify-content-between">
      <button type="submit" class="btn btn-primary mt-6">Sign Up</button>

      <button class="btn btn-secondary">
        <i class="fa-brands fa-google"></i>
      </button>
    </div>

    <hr>

    <div>
      Already have an account?
      <RouterLink class="is-link" :to="{name: 'signin'}">Sign In</RouterLink>
    </div>

  </form>
</template>
