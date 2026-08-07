<script setup>
import ReadonlyField from '@/components/form/ReadonlyField.vue'
import { useUserStore } from '@/stores/user.js'
import { computed } from 'vue'

const userStore = useUserStore()
const user = computed(() => userStore.get)
</script>

<template>
  <div class="profile-view" v-if="user">
    <div class="row">
      <div class="col-6">
        <ReadonlyField label="Name" :value="user?.name"></ReadonlyField>
        <ReadonlyField label="Surname" :value="user?.surname"></ReadonlyField>
        <ReadonlyField label="EMail" :value="user?.email"></ReadonlyField>
      </div>
      <div class="col-6">
        <ReadonlyField label="Created At" :value="user?.createdAt"></ReadonlyField>
      </div>
    </div>
  </div>
</template>
