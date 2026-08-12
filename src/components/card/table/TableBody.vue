<script setup>
defineProps({
  rows: {
    type: Array,
    required: true
  },
  map: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <tbody class="table-body">
    <tr v-for="row in rows" :key="row.id">
      <td></td>
      <td class="uuid-cell">
        <span class="uuid-text" :title="row.id">{{ row.id }}</span>
      </td>
      <template v-for="(value, key) in map" :key="key">
        <td v-if="key !== 'id'">
          {{ row[key] }}
        </td>
      </template>
      <td></td>
    </tr>
  </tbody>
</template>

<style scoped>
.uuid-cell {
  width: 1%;
  white-space: nowrap;
}

.uuid-text {
  display: inline-block;
  max-width: 18ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  transition: max-width 0.25s ease-in-out;
  cursor: pointer;
}

.uuid-cell:hover .uuid-text,
.uuid-text:hover {
  max-width: 36ch;
}
</style>
