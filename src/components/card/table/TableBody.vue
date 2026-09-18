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
      <td>
        <input
          class="form-check-input m-0 align-middle table-selectable-check"
          type="checkbox"
          :value="row.id"
        />
      </td>
      <slot name="prepend" :row="row" />
      <template v-for="(value, key) in map" :key="key">
        <td v-if="key !== 'id'">
          <slot :name="key" :row="row" :value="row[key]">
            {{ row[key] }}
          </slot>
        </td>
      </template>
      <slot name="append" :row="row">
        <td></td>
      </slot>
    </tr>
  </tbody>
</template>
