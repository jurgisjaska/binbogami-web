import DashboardLayout from '@/layouts/DashboardLayout.vue'

export default [
  {
    path: '/categories/:category?',
    name: 'category',
    component: () => import('@/views/finance/category/CategoryView.vue'),
    meta: {
      layout: DashboardLayout,
      title: 'Category',
      navigation: 'categories'
    }
  },
  {
    path: '/categories/',
    name: 'categories',
    component: () => import('@/views/finance/category/CategoriesView.vue'),
    meta: {
      layout: DashboardLayout,
      title: 'Categories',
      navigation: 'categories'
    }
  }
]
