<script setup>
defineProps({
  label: String,
  type: String,
  placeholder: String,
  modelValue: String,
  required: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<template>
  <div class="field mb-3">
    <div class="form-label" :class="{required: required}">{{ label }}</div>
    <input
      class="form-control"
      :type="type"
      :placeholder="placeholder || label"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
