<script setup>
import { defineProps } from "vue";

defineProps({
  label: String,
  placeholder: String,
  modelValue: String,
});
</script>

<template>
  <div class="field mb-3">
    <div class="form-label">{{ label }}</div>
    <textarea
      class="form-control"
      :placeholder="placeholder || label"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
