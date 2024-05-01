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
  <div class="field">
    <div class="label">
      Password
      <RouterLink
        :to="{name: 'forgot-password'}"
        class="forgot-password is-pulled-right has-text-link"
        v-if="forgot"
      >
        Forgot password?
      </RouterLink>
    </div>
    <div class="control has-icons-left">
      <input type="password" class="input" placeholder="Password"
             :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
      >
      <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
      </span>
    </div>
  </div>
</template>

<style scoped>
.forgot-password {
  font-weight: normal;
}
</style>