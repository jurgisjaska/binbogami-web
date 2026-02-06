<script setup>

import CardHeader from "@/component/card/CardHeader.vue";
import DownloadDropdown from "@/component/card/header/DownloadDropdown.vue";
import SearchInput from "@/component/card/header/SearchInput.vue";
</script>

<template>
  <div class="categories card">
    <CardHeader title="Categories" subtitle="List of all categories">
      <SearchInput />
      <DownloadDropdown />
      <RouterLink href="#" class="btn btn-primary" :to="{name: 'category', params: {category: null}}">
        <i class="fa fa-plus me-2"></i> Create Category
      </RouterLink>
    </CardHeader>
  </div>
</template>
