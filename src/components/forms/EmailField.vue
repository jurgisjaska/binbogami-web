<script setup>
defineProps({
  modelValue: String,
  disabled: {
    type: Boolean,
    required: false
  },
  required: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<template>
  <div class="field mb-3">
    <label class="form-label" :class="{required: required}">Email</label>

    <div class="input-group input-group-flat">
      <span class="input-group-text"><i class="fas fa-envelope"></i></span>
      <input
        type="email"
        class="form-control"
        placeholder="Email"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :disabled="disabled"
      />
    </div>
  </div>
</template>
