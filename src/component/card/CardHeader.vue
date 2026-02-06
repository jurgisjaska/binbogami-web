<script setup>
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="card-header">
    <div class="row w-full">
      <div class="col">
        <h3 class="card-title mb-0">{{ title }}</h3>
        <p class="text-secondary m-0" v-if="subtitle">{{ subtitle || "" }}</p>
      </div>
      <div class="col-md-auto col-sm-12">
        <div class="ms-auto d-flex flex-wrap btn-list">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
