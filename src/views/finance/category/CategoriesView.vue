<script setup>
import CardFooter from '@/components/card/CardFooter.vue'
import CardHeader from '@/components/card/CardHeader.vue'
import CardTable from '@/components/card/CardTable.vue'
import DownloadDropdown from '@/components/card/header/DownloadDropdown.vue'
import SearchInput from '@/components/card/header/SearchInput.vue'
import LimitSelect from '@/components/pagination/LimitSelect.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import { inject, ref } from 'vue'
import TableHead from '@/components/card/table/TableHead.vue'
import TableBody from '@/components/card/table/TableBody.vue'
import CategoryIconButton from '@/components/category/CategoryIconButton.vue'

const api = inject('financeApi')

const categories = ref([])
const metadata = ref({ page: 1 })
const load = () => {
  api
    .get('/v1/categories', {
      params: metadata.value
    })
    .then((r) => {
      categories.value = r.data.data
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

const onDownload = (f) => {
  console.log(f)
}

const onLimitChange = (l) => {
  metadata.value.limit = l
  metadata.value.page = 1
  load()
}

const onPageChange = (n) => {
  metadata.value.page = n
  load()
}

const sort = ref(null)
const order = ref(null)
const onSort = (field) => {
  if (sort.value === field) {
    order.value = order.value === 'asc' ? 'desc' : 'asc'
  } else {
    sort.value = field
    order.value = 'asc'
  }

  metadata.value.sort = field
  metadata.value.order = order.value
  load()
}

const getSortClass = (field) => (sort.value === field ? order.value : '')

const map = {
  name: 'Name',
  description: 'Description',
  createdAt: 'Created At'
}

// Load categories on page open.
load()
</script>

<template>
  <div class="categories card">
    <CardHeader title="Categories" subtitle="List of categories">
      <SearchInput v-model="metadata.search" @search="onSearch" />
      <DownloadDropdown @download="onDownload" />
      <RouterLink
        href="#"
        class="btn btn-primary"
        :to="{ name: 'category', params: { category: null } }"
      >
        <i class="fa fa-plus me-2"></i> Create Category
      </RouterLink>
    </CardHeader>

    <CardTable>
      <TableHead>
        <th class="w-1"></th>
        <th>
          <button
            type="button"
            class="table-sort d-flex justify-content-between"
            :class="getSortClass('name')"
            @click="onSort('name')"
          >
            Name
          </button>
        </th>
        <th>
          <button
            type="button"
            class="table-sort d-flex justify-content-between"
            :class="getSortClass('description')"
            @click="onSort('description')"
          >
            Description
          </button>
        </th>
        <th>
          <button
            type="button"
            class="table-sort d-flex justify-content-between"
            :class="getSortClass('created_at')"
            @click="onSort('created_at')"
          >
            Created At
          </button>
        </th>
      </TableHead>
      <TableBody :rows="categories" :map="map">
        <template #prepend="{ row }">
          <td class="w-1">
            <CategoryIconButton :category="row" />
          </td>
        </template>
      </TableBody>
    </CardTable>

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
