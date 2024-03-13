<script setup>
defineProps({
  label: String,
  type: String,
  placeholder: String,
  model: Object,
  icon: String
})
</script>

<template>
  <div class="field">
    <div class="label">{{ label }}</div>
    <div class="control has-icons-left">
      <input type="{{ type }}" class="input" :placeholder="placeholder || label" :value="model">
      <span class="icon is-small is-left">
          <i class="fas {{ icon }}"></i>
        </span>
    </div>
  </div>
</template>