<script setup>
import api from "@/api.js";
import { useOrganizationStore } from "@/store/organization.js";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const organizationStore = useOrganizationStore();
const currentOrganization = computed(() => organizationStore.get);

const organizations = ref(null);

const change = (o) => {
  const data = {
    configuration: 1, // default organization
    value: o.id,
  };

  api.put("/v1/users/configurations", data)
    .then((r) => {
      const organization = r.data.data.organization;
      organizationStore.set(organization);
      router.push({ name: "dashboard" });
    })
    .catch((e) => {
      console.error(e.response?.data?.message || "Unexpected error");
    });
};

(() => {
  api.get("/v1/organizations")
    .then((r) => {
      organizations.value = r.data.data;
    })
    .catch((e) => {
      console.error(e.response?.data?.message || "Unexpected error");
    });
})();
</script>

<template>
  <div class="organization-manager px-3" v-if="currentOrganization">
    <div class="dropdown">
      <div class="btn-group" role="group">

        <div class="btn-group">
          <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
            {{ currentOrganization.name }}
          </button>
          <ul class="dropdown-menu">
            <li v-for="organization in organizations" :key="organization.id">
              <a
                class="dropdown-item"
                href="#"
                :class="organization.name === currentOrganization.name?'disabled':''"
                @click.prevent="change(organization)"
              >{{ organization.name }}</a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <RouterLink class="dropdown-item" :to="{name: 'organizations_create'}">
                <i class="fa-solid fa-plus"></i> Create Organization
              </RouterLink>
            </li>
          </ul>
        </div>

        <RouterLink :to="{name: 'organizations_invitations'}" class="btn btn-primary">
          <i class="fa-regular fa-paper-plane"></i>
        </RouterLink>

      </div>
    </div>
  </div>
</template>