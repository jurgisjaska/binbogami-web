<script setup>
import { ref } from 'vue';

defineOptions({
  name: 'SearchInput',
});

const search = ref(null);
</script>

<template>
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
</template>