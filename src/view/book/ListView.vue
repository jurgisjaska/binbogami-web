<script setup>
import { ref } from "vue";

const books = ref([]);
const closedBooks = ref([]);

(() => {
  // load books
  // load closed books

  // do i have an API for this?
})();

</script>

<template>
  <div class="list-view">

    <RouterLink class="btn btn-primary mb-3" :to="{name: 'books_create'}">
      <i class="fa-solid fa-plus"></i> Create Book
    </RouterLink>

    <div class="accordion" id="books">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#active-books"
                  aria-expanded="true" aria-controls="active-books">
            Active
          </button>
        </h2>
        <div id="active-books" class="accordion-collapse collapse show" data-bs-parent="#books">
          <div class="accordion-body">
            // books
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#closed-books" aria-expanded="false" aria-controls="closed-books">
            Closed
          </button>
        </h2>
        <div id="closed-books" class="accordion-collapse collapse" data-bs-parent="#books">
          <div class="accordion-body">
            // closed books
          </div>
        </div>
      </div>
    </div>

  </div>
</template>