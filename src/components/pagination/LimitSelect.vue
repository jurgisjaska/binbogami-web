<script setup>
defineProps({
  modelValue: {
    type: Number,
    required: false,
    default: 25
  },
  options: {
    type: Array,
    required: false,
    default: () => [25, 50, 100]
  }
})

const emit = defineEmits(['change', 'update:modelValue'])
const onChange = (limit) => {
  const num = Number(limit)
  emit('update:modelValue', num)
  emit('change', num)
}
</script>

<template>
  <select class="form-select" :value="modelValue" @change="onChange($event.target.value)">
    <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
  </select>
</template>
