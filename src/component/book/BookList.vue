<script setup>
import {defineProps} from "vue";
import moment from "moment";

defineProps({
  books: {
    type: Array,
    required: true,
  },
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  return moment(dateString).format("YYYY-MM-DD HH:mm");
};
</script>

<template>
  <tbody class="table-tbody">
  <tr v-for="book in books" :key="book.id">
    <td>
      <input class="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select book"
             :value="book.id">
    </td>
    <td>
      <RouterLink :to="{name: 'book', params: {book: book.id}}">{{ book.name }}</RouterLink>
    </td>
    <td class="text-truncate description">{{ book.description }}</td>
    <td>{{ book.createdBy }}</td>
    <td>{{ formatDate(book.createdAt) }}</td>
    <td class="text-end">
      <div class="btn-list flex-nowrap">
        <RouterLink class="btn btn-1" :to="{name: 'book', params: {book: book.id}}" aria-label="Edit book">
          <i class="fa fa-pen-to-square"></i>
        </RouterLink>
        <div class="dropdown">
          <button class="btn align-text-top" data-bs-toggle="dropdown">Actions <i class="fa fa-angle-down ms-2"></i></button>
          <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item text-danger" href="#"><i class="fa fa-trash me-2"></i> Delete </a>
          </div>
        </div>
      </div>
    </td>
  </tr>
  </tbody>
</template>

<style scoped>
td.description{
  max-width: 200px;
}
</style>
