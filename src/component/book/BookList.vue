<script setup>
import { defineProps } from "vue";

defineProps({
  books: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul class="list-group book-list">
    <RouterLink
      class="list-group-item list-group-item-action"
      v-for="book in books"
      :key="book.id" :to="{name: 'book', params: {book: book.id}}"
    >
      {{ book.name }}
    </RouterLink>
  </ul>
</template>