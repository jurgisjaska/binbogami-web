<script setup>
import OrganizationCard from "@/component/organization/OrganizationCard.vue";
import { ref } from "vue";
import api from "@/api.js";

const organizations = ref(null);
let number = 0;
const error = ref(null);

(() => {
  api.get("/v1/organizations")
    .then((r) => {
      organizations.value = r.data.data;
      number = 5 - organizations.value.length;
      console.log(number);
    })
    .catch((e) => {
      error.value = e.response?.data?.message || "Unexpected error";
    });
})();
</script>

<template>
  <div class="signin-organization-view">

    <div class="alert alert-danger" v-if="error">{{ error }}</div>

    <div class="columns">
      <div class="column" v-for="organization in organizations" :key="organization.id">
        <OrganizationCard
          :name="organization.name"
          :description="organization.description"
          :organization="organization.id"
        />
      </div>
      <div class="column" v-for="i in number" :key="i"></div>
    </div>

  </div>
</template>

<style scoped>
.signin-organization-view {
  width: 25rem
}
</style>