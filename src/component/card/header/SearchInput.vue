<script setup>
defineProps({
  modelValue: String,
});
</script>

<template>
  <div class="input-group input-group-flat w-auto">
    <span class="input-group-text"><i class="fa fa-magnifying-glass"></i></span>
    <input
      type="text"
      class="form-control"
      autocomplete="off"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Search..."
    />
  </div>
</template>