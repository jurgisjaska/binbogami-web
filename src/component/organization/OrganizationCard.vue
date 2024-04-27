<script setup>
import { defineProps, ref } from "vue";
import api from "@/api.js";
import { useOrganizationStore } from "@/store/organization.js";
import { useRouter } from "vue-router";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true
  }
})

const router = useRouter();
const error = ref(null);
const organizationStore = useOrganizationStore();

const open = () => {
  const data = {
    configuration: 1, // default organization
    value: props.organization
  }

  api.put("/v1/users/configurations", data)
    .then((r) => {
      console.log(r)

      const organization = r.data.data.organization;
      organizationStore.set(organization);
      router.push({ name: "dashboard" });
    })
    .catch((e) => {
      // should i just do nothing in this case
      // error in the card probably is bit too much ... :/
      error.value = e.response?.data?.message || "Unexpected error";
    });
};
</script>

<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img
          src="https://picsum.photos/200/200"
          alt="Placeholder image"
        />
      </figure>
    </div>

    <header class="card-header">
      <p class="card-header-title">{{ props.name }}</p>
    </header>

    <div class="card-content">
      <div class="content">{{ props.description }}</div>
    </div>

    <footer class="card-footer">
      <a href="#" class="card-footer-item" @click.prevent="open">Open</a>
    </footer>
  </div>
</template>

<style scoped>

</style>