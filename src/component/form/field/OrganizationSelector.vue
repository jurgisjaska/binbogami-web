<script setup>
import api from "@/api.js";
import { ref } from "vue";

const organizations = ref(null);
defineProps({
  modelValue: String,
});

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
  <div class="field mb-3">
    <label for="organization" class="form-label">Organization</label>
    <select
      name="organization"
      id="organization"
      class="form-select"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="o in organizations" :value="o.id" v-bind:key="o.id">{{ o.name }}</option>
    </select>
  </div>
</template>
