<script setup>
defineProps({
  label: String,
  type: String,
  placeholder: String,
  modelValue: String,
});
</script>

<template>
  <div class="field">
    <div class="label">{{ label }}</div>
    <div class="control">
      <input
        class="input"
        :type="type"
        :placeholder="placeholder || label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>