<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="field mb-3">
    <div class="form-label">{{ label }}</div>
    <input
      class="form-control-plaintext"
      type="text"
      :value="value"
      readonly
    />
  </div>
</template>