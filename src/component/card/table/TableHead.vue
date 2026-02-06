<script setup>
defineProps({
  items: {
    type: Object,
    required: true,
  },
});
</script>

<template>
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
</template>