<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["download"]);
const onClick = (format) => {
  emit("download", format);
};
</script>

<template>
  <div class="dropdown">
    <a href="#" class="btn" data-bs-toggle="dropdown">
      <i class="fa fa-download me-2"></i> Download
    </a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="#" @click.prevent="onClick('csv')">
        <i class="fa fa-file-csv me-2"></i> CSV
      </a>
      <a class="dropdown-item" href="#" @click.prevent="onClick('excel')">
        <i class="fa fa-file-excel me-2"></i> Excel
      </a>
      <a class="dropdown-item" href="#" @click.prevent="onClick('pdf')">
        <i class="fa fa-file-pdf me-2"></i> PDF
      </a>
      <a class="dropdown-item" href="#" @click.prevent="onClick('json')">
        <i class="fa fa-file-code me-2"></i> JSON
      </a>
    </div>
  </div>
</template>