<script setup>
import api from "@/api.js";
import BookList from "@/component/book/BookList.vue";
import { ref } from "vue";

const activeBooks = ref([]);
const closedBooks = ref([]);

(() => {
  api
    .get("/v1/books")
    .then((r) => {
      r.data.data.forEach((book) => {
        console.log(book);

        if (book.closedAt !== null) {
          closedBooks.value.push(book);
        } else {
          activeBooks.value.push(book);
        }
      });
    })
    .catch((e) => {
      console.error(e.response?.data?.message || "Unexpected error");
    });
})();
</script>

<template>
  <div class="list-view">

    <RouterLink class="btn btn-primary mb-3" :to="{name: 'book', params: {book: 'create'}}">
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

            <BookList :books="activeBooks" />

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

            <BookList :books="closedBooks" />

          </div>
        </div>
      </div>
    </div>

  </div>
</template>