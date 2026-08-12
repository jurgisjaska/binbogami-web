<script setup>
const emit = defineEmits(['change'])
const onChange = (limit) => {
  emit('change', limit)
}
</script>

<template>
  <select class="form-select" @change="onChange($event.target.value)">
    <option value="25">25</option>
    <option value="50">50</option>
    <option value="100">100</option>
  </select>
</template>
