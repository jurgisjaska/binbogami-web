<script setup>
import api from "@/api.js";
import CardFooter from "@/component/card/CardFooter.vue";
import CardHeader from "@/component/card/CardHeader.vue";
import CardTable from "@/component/card/CardTable.vue";
import DownloadDropdown from "@/component/card/header/DownloadDropdown.vue";
import SearchInput from "@/component/card/header/SearchInput.vue";
import LimitSelect from "@/component/pagination/LimitSelect.vue";
import Pagination from "@/component/pagination/Pagination.vue";
import { ref, watch } from "vue";

const categories = ref([]);
const metadata = ref({ page: 1 });
const load = () => {
  api
    .get("/v1/categories", {
      params: metadata.value,
    })
    .then((r) => {
      categories.value = r.data.data;
      metadata.value = r.data.metadata;
    })
    .catch((e) => {
      console.error(e.response?.data?.message || "Unexpected error");
    });
};

const onPageChange = (n) => {
  metadata.value.page = n;
  load();
};

const search = ref("");
let timeout;
watch(search, (q) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    metadata.value.search = q;
    metadata.value.page = 1;
    load();
  }, 500);
});

const onDownload = (f) => {
  console.log(f);
};

// Load categories on page open.
load();
</script>

<template>
  <div class="categories card">
    <CardHeader title="Categories" subtitle="List of all categories">
      <SearchInput v-model="search" />
      <DownloadDropdown @download="onDownload" />
      <RouterLink href="#" class="btn btn-primary" :to="{name: 'category', params: {category: null}}">
        <i class="fa fa-plus me-2"></i> Create Category
      </RouterLink>
    </CardHeader>

    <CardTable :items="categories" />

    <CardFooter>
      <div class="col-auto d-flex align-items-center">
        <LimitSelect />
      </div>
      <div class="col-auto">
        <Pagination :metadata="metadata" @changePage="onPageChange"></Pagination>
      </div>
    </CardFooter>
  </div>
</template>
