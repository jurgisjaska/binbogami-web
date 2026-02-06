<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import {defineEmits, defineProps} from "vue";

const emit = defineEmits(["changePage"]);
defineProps({
  metadata: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <ul class="pagination m-0 ms-auto">
    <li class="page-item" :class="metadata.page === 1 ? 'disabled' : ''">
      <a class="page-link" href="#" @click.prevent="emit('changePage', metadata.page - 1)">
        <i class="fa fa-chevron-left"></i>
      </a>
    </li>

    <li
        class="page-item"
        v-for="n in metadata.pages"
        :key="n"
        :class="metadata.page === n ? 'active' : ''"
    >
      <a class="page-link" href="#" @click.prevent="emit('changePage', n)">{{ n }}</a>
    </li>

    <li class="page-item" :class="metadata.page === metadata.pages ? 'disabled' : ''">
      <a class="page-link" href="#" @click.prevent="emit('changePage', metadata.page + 1)">
        <i class="fa fa-chevron-right"></i>
      </a>
    </li>
  </ul>
</template>
