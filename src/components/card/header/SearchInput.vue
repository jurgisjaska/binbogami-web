<script setup>
import {ref, watch} from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  delay: {
    type: Number,
    default: 500
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

const query = ref(props.modelValue)
let timeout

watch(
    () => props.modelValue,
    (val) => {
      query.value = val || ''
    }
)

watch(query, (val) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    emit('update:modelValue', val)
    emit('search', val)
  }, props.delay)
})
</script>

<template>
  <div class="input-group input-group-flat w-auto">
    <span class="input-group-text"><i class="fa fa-magnifying-glass"></i></span>
    <input
        v-model="query"
        type="text"
        class="form-control"
        autocomplete="off"
        placeholder="Search..."
    />
  </div>
</template>
