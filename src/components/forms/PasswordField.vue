<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  modelValue: String,
  forgot: {
    type: Boolean,
    required: false,
    default: false
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
    <label class="form-label" :class="{ required: required }">
      <span class="form-label-description" v-if="forgot">
        <RouterLink :to="{ name: 'forgot-password' }" class="forgot-password" tabindex="-1">
          Forgot password?
        </RouterLink>
      </span>
      <span>Password</span>
    </label>
    <div class="input-group input-group-flat">
      <span class="input-group-text"><i class="fas fa-key"></i></span>
      <input
        type="password"
        class="form-control"
        placeholder="Password"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
