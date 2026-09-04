<script setup>
/**
 * @deprecated Use @/views/finance/book/BookView.vue instead.
 */
import BookForm from '@/components/forms/BookForm.vue'
</script>

<template>
  <div class="book-view card">
    <div class="card-header">
      <h3 class="card-title">Book information</h3>
    </div>
    <div class="card-body">
      <BookForm />
    </div>
  </div>
</template>
