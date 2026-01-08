<script setup>
import { RouterLink } from "vue-router";

defineProps({
  modelValue: String,
  forgot: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <div class="field mb-3">
    <label class="form-label d-flex justify-content-between">
      <span>Password</span>
      <RouterLink
        :to="{name: 'forgot-password'}"
        class="forgot-password "
        v-if="forgot"
        tabindex="-1"
      >
        Forgot password?
      </RouterLink>
    </label>
    <div class="input-group input-group-flat">
      <span class="input-group-text"><i class="fas fa-key"></i></span>
      <input type="password" class="form-control" placeholder="Password"
             :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
  </div>
</template>
