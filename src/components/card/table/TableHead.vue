<script setup>
defineProps({
  map: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <thead>
    <tr>
      <th class="w-1"></th>
      <th class="w-1 uuid-col">
        <button class="table-sort d-flex justify-content-between" data-sort="sort-id">
          ID
        </button>
      </th>
      <template v-for="(value, key) in map" :key="key">
        <th v-if="key !== 'id'">
          <button class="table-sort d-flex justify-content-between" :data-sort="'sort-' + key">
            {{ value }}
          </button>
        </th>
      </template>
      <th class="w-1"></th>
    </tr>
  </thead>
</template>

<style scoped>
.uuid-col {
  width: 1%;
  white-space: nowrap;
}
</style>

