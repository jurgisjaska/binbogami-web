<script setup>
defineProps({
  modelValue: String,
});
</script>

<template>
  <div class="field">
    <div class="label">Email</div>
    <div class="control has-icons-left">
      <input
        type="email"
        class="input"
        placeholder="Email"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
      <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
    </div>
  </div>
</template>