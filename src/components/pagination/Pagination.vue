<!-- eslint-disable vue/multi-word-components-names -->
<script setup>
const props = defineProps({
  page: {
    type: Number,
    required: false,
    default: 1
  },
  pages: {
    type: Number,
    required: false,
    default: 1
  }
})

const emit = defineEmits(['change'])
const onChange = (targetPage) => {
  if (targetPage === props.page || targetPage < 1 || targetPage > props.pages) {
    return
  }
  emit('change', targetPage)
}
</script>

<template>
  <ul class="pagination m-0 ms-auto">
    <li class="page-item" :class="page === 1 ? 'disabled' : ''">
      <a class="page-link" href="#" @click.prevent="onChange(page - 1)">
        <i class="fa fa-chevron-left"></i>
      </a>
    </li>

    <li class="page-item" v-for="n in pages" :key="n" :class="page === n ? 'active' : ''">
      <a class="page-link" href="#" @click.prevent="onChange(n)">{{ n }}</a>
    </li>

    <li class="page-item" :class="page === pages ? 'disabled' : ''">
      <a class="page-link" href="#" @click.prevent="onChange(page + 1)">
        <i class="fa fa-chevron-right"></i>
      </a>
    </li>
  </ul>
</template>
