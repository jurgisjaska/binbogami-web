<script setup>
import ReadonlyField from "@/component/form/ReadonlyField.vue";
import { useUserStore } from "@/store/user.js";
import { computed } from "vue";

const userStore = useUserStore();
const user = computed(() => userStore.get);
</script>

<template>
  <div class="profile-view">
    <div class="row">
      <div class="col-6">

        <ReadonlyField label="Name" :value="user.name"></ReadonlyField>
        <ReadonlyField label="Surname" :value="user.surname"></ReadonlyField>
        <ReadonlyField label="EMail" :value="user.email"></ReadonlyField>

      </div>
      <div class="col-6">

        <ReadonlyField label="Created At" :value="user.createdAt"></ReadonlyField>

      </div>
    </div>
  </div>
</template>