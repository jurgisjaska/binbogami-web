<script setup>
import TableHead from '@/components/card/table/TableHead.vue'
import TableBody from "@/components/card/table/TableBody.vue";

defineProps({
  map: {
    type: Object,
    required: true
  },
  rows: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="table-responsive overflow-visible">
    <table class="table table-selectable card-table table-vcenter text-nowrap datatable">
      <TableHead :map="map"/>
      <TableBody :rows="rows" :map="map"/>
    </table>
  </div>
</template>
