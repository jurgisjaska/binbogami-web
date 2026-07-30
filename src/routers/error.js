import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ErrorLayout from '@/layouts/ErrorLayout.vue'

export default [
  {
    path: '/:pathMatch(.*)*',
    name: 'error_404',
    component: () => import('@/views/error/NotFoundView.vue'),
    meta: {
      layout: ErrorLayout,
      title: 'Error'
    }
  }
]
