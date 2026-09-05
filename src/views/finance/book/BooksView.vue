<script setup>
import CardFooter from '@/components/card/CardFooter.vue'
import CardHeader from '@/components/card/CardHeader.vue'
import CardTable from '@/components/card/CardTable.vue'
import DownloadDropdown from '@/components/card/header/DownloadDropdown.vue'
import SearchInput from '@/components/card/header/SearchInput.vue'
import LimitSelect from '@/components/pagination/LimitSelect.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import { inject, ref } from 'vue'

const api = inject('financeApi')

const books = ref([])
const metadata = ref({ page: 1 })
const load = () => {
  api
    .get('/v1/books', {
      params: metadata.value
    })
    .then((r) => {
      books.value = r.data.data
      metadata.value = r.data.metadata
    })
    .catch((e) => {
      console.error(e.response?.data?.message || 'Unexpected error')
    })
}

const onSearch = (q) => {
  metadata.value.search = q
  metadata.value.page = 1
  load()
}

const onPageChange = (n) => {
  metadata.value.page = n
  load()
}

const onDownload = (f) => {
  console.log(f)
}

const onLimitChange = (l) => {
  metadata.value.limit = l
  metadata.value.page = 1
  load()
}

const map = {
  name: 'Name',
  description: 'Description',
  createdAt: 'Created At'
}

// Load books on page open.
load()
</script>

<template>
  <div class="books card">
    <CardHeader title="Books" subtitle="List of books">
      <SearchInput v-model="metadata.search" @search="onSearch" />
      <DownloadDropdown @download="onDownload" />
      <RouterLink href="#" class="btn btn-primary" :to="{ name: 'book', params: { book: null } }">
        <i class="fa fa-plus me-2"></i> Create Book
      </RouterLink>
    </CardHeader>

    <CardTable :rows="books" :map="map" />

    <CardFooter>
      <div class="col-auto d-flex align-items-center">
        <LimitSelect v-model="metadata.limit" @change="onLimitChange" />
      </div>
      <div class="col-auto">
        <Pagination :page="metadata.page" :pages="metadata.pages" @change="onPageChange" />
      </div>
    </CardFooter>
  </div>
</template>
