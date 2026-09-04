<script setup>
import CardFooter from '@/components/card/CardFooter.vue'
import CardHeader from '@/components/card/CardHeader.vue'
import CardTable from '@/components/card/CardTable.vue'
import DownloadDropdown from '@/components/card/header/DownloadDropdown.vue'
import SearchInput from '@/components/card/header/SearchInput.vue'
import LimitSelect from '@/components/pagination/LimitSelect.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import { inject, ref, watch } from 'vue'

const api = inject('financeApi')

const locations = ref([])
const metadata = ref({ page: 1 })
const load = () => {
  api
    .get('/v1/locations', {
      params: metadata.value
    })
    .then((r) => {
      locations.value = r.data.data
      metadata.value = r.data.metadata
    })
    .catch((e) => {
      console.error(e.response?.data?.message || 'Unexpected error')
    })
}

const onPageChange = (n) => {
  metadata.value.page = n
  load()
}

const search = ref('')
let timeout
watch(search, (q) => {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    metadata.value.search = q
    metadata.value.page = 1
    load()
  }, 500)
})

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

// Load locations on page open.
load()
</script>

<template>
  <div class="locations card">
    <CardHeader title="Locations" subtitle="List of locations">
      <SearchInput v-model="search" />
      <DownloadDropdown @download="onDownload" />
      <RouterLink
        href="#"
        class="btn btn-primary"
        :to="{ name: 'location', params: { location: null } }"
      >
        <i class="fa fa-plus me-2"></i> Create Location
      </RouterLink>
    </CardHeader>

    <CardTable :rows="locations" :map="map" />

    <CardFooter>
      <div class="col-auto d-flex align-items-center">
        <LimitSelect @change="onLimitChange" />
      </div>
      <div class="col-auto">
        <Pagination :metadata="metadata" @changePage="onPageChange"></Pagination>
      </div>
    </CardFooter>
  </div>
</template>
