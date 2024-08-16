<script setup>
import { defineProps, ref } from "vue";
import api from "@/api.js";
import { useOrganizationStore } from "@/store/organization.js";
import { useRouter } from "vue-router";

// @todo is it necessary to have `const props` ?
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
  <div class="card mb-3">

    <div class="row g-0">
      <div class="col-4">
        <img
          class="img-fluid rounded-start"
          src="https://picsum.photos/200/200"
          alt="Placeholder image"
        />
      </div>
      <div class="col-8">
        <header class="card-header">
          <h5 class="card-title mb-0">{{ props.name }}</h5>
        </header>

        <div class="card-body">
          <div class="card-text">{{ props.description }}</div>
        </div>

        <footer class="card-footer">
          <a href="#" class="btn btn-primary" @click.prevent="open">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open
          </a>
        </footer>
      </div>
    </div>

  </div>
</template>

<style scoped>
.img-fluid {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>