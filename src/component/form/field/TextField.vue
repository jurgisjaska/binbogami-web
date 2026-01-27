<script setup>
import {defineProps} from "vue";

defineProps({
  label: String,
  placeholder: String,
  modelValue: String,
  required: {
    type: Boolean,
    required: false,
    default: false,
  }
});
</script>

<template>
  <div class="field mb-3 row">
    <label class="col-3 col-form-label" :class="required ? 'required' : ''">{{ label }}</label>

    <div class="col">
      <textarea
          class="form-control"
          :placeholder="placeholder || label"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
