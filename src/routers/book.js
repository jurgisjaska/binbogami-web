import DashboardLayout from '@/layouts/DashboardLayout.vue'

export default [
  {
    path: '/books/:book?',
    name: 'book',
    component: () => import('@/views/finance/book/BookView.vue'),
    meta: {
      layout: DashboardLayout,
      title: 'Book',
      navigation: 'books'
    }
  },
  {
    path: '/books/',
    name: 'books',
    component: () => import('@/views/finance/book/BooksView.vue'),
    meta: {
      layout: DashboardLayout,
      title: 'Books',
      navigation: 'books'
    }
  }
]
