<script setup>
defineProps({
  label: String,
  type: String,
  placeholder: String,
  modelValue: String,
});
</script>

<template>
  <div class="field mb-3">
    <div class="form-label">{{ label }}</div>
      <input
        class="form-control"
        :type="type"
        :placeholder="placeholder || label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
  </div>
</template>