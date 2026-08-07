import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ErrorLayout from '@/layouts/ErrorLayout.vue'

export default [
  {
    path: '/500',
    name: 'error_500',
    component: () => import('@/views/error/ServerErrorView.vue'),
    meta: {
      layout: ErrorLayout,
      title: '500 Server Error'
    }
  },
  {
    path: '/404',
    name: 'error_404',
    component: () => import('@/views/error/NotFoundView.vue'),
    meta: {
      layout: ErrorLayout,
      title: '404 Not Found'
    }
  }
]
