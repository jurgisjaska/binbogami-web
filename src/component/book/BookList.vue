<script setup>
import {defineEmits, defineProps} from "vue";
import moment from "moment";
import BookAction from "@/component/book/BookAction.vue";

const emit = defineEmits(["reload"]);
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

const onActionCompleted = () => {
  emit("reload");
};

const onActionFailed = () => {
  // @todo add some kind of indication on action failure
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
          <button class="btn align-text-top" data-bs-toggle="dropdown">Actions <i class="fa fa-angle-down ms-2"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#"></a>
            <BookAction action="close" :id="book.id" @actionCompleted="onActionCompleted"
                        @actionFailed="onActionFailed">
              <i class="fa fa-circle-xmark me-2"></i> Close
            </BookAction>
            <BookAction action="delete" actionClass="dropdown-item text-danger" :id="book.id"
                        @actionCompleted="onActionCompleted" @actionFailed="onActionFailed">
              <i class="fa fa-trash me-2"></i> Delete
            </BookAction>
          </div>
        </div>
      </div>
    </td>
  </tr>
  </tbody>
</template>

<style scoped>
td.description {
  max-width: 200px;
}
</style>
