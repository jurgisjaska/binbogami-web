<script setup>
import api from "@/api.js";
import BookList from "@/component/book/BookList.vue";
import {ref, watch} from "vue";
import Pagination from "@/component/Pagination.vue";

const active = ref([]);
const activeMetadata = ref({status: "active", page: 1});

const search = ref("");
let timeout;

// const closed = ref([]);
// const closedMetadata = ref([]);

const load = (books, metadata) => {
  api
      .get("/v1/books", {
        params: metadata.value,
      })
      .then((r) => {
        books.value = r.data.data;
        metadata.value = r.data.metadata;
      })
      .catch((e) => {
        console.error(e.response?.data?.message || "Unexpected error");
      });
};

// @todo working sorting
// @todo working search

const onChangePage = (books, metadata, n) => {
  metadata.value.page = n;
  activeMetadata.value.query = search;

  load(books, metadata);
};

const onActivePageChange = (n) => {
  onChangePage(active, activeMetadata, n);
};

// @todo move search to separate component
watch(search, (q) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    activeMetadata.value.query = q;
    activeMetadata.value.page = 1;
    load(active, activeMetadata);
  }, 500);
});

// Load books on page open.
load(active, activeMetadata);
</script>

<template>
  <div class="books card">
    <div class="card-header">
      <div class="row w-full">
        <div class="col">
          <h3 class="card-title mb-0">Books</h3>
          <p class="text-secondary m-0">Active accounting books</p>
        </div>
        <div class="col-md-auto col-sm-12">
          <div class="ms-auto d-flex flex-wrap btn-list">
            <div class="input-group input-group-flat w-auto">
              <span class="input-group-text"><i class="fa fa-magnifying-glass"></i></span>
              <input
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  v-model="search"
                  placeholder="Search..."
              />
            </div>

            <div class="dropdown">
              <a href="#" class="btn" data-bs-toggle="dropdown"><i class="fa fa-download me-2"></i> Download</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Third action</a>
              </div>
            </div>
            <RouterLink href="#" class="btn btn-primary" :to="{name: 'book', params: {book: null}}"><i
                class="fa fa-plus me-2"></i> Create Book
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive overflow-visible">
      <table class="table table-selectable card-table table-vcenter text-nowrap datatable">
        <thead>
        <tr>
          <th class="w-1"></th>
          <th>
            <button class="table-sort d-flex justify-content-between" data-sort="sort-name">Name</button>
          </th>
          <th>
            <button class="table-sort d-flex justify-content-between" data-sort="sort-description">Description
            </button>
          </th>
          <th>
            <button class="table-sort d-flex justify-content-between" data-sort="sort-author">Author</button>
          </th>
          <th>
            <button class="table-sort d-flex justify-content-between" data-sort="sort-created-at">Created At</button>
          </th>
          <th class="w-1"></th>
        </tr>
        </thead>
        <BookList :books="active"></BookList>
      </table>
    </div>
    <div class="card-footer">
      <div class="row g-2 justify-content-center justify-content-sm-between">
        <div class="col-auto d-flex align-items-center">
          <p class="m-0 text-secondary"></p>
        </div>
        <div class="col-auto">
          <Pagination :metadata="activeMetadata" @changePage="onActivePageChange"></Pagination>
        </div>
      </div>
    </div>
  </div>

</template>
