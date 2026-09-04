import DashboardLayout from '@/layouts/DashboardLayout.vue'

export default [
  {
    path: '/entries/:entry?',
    name: 'entry',
    component: () => import('@/views/finance/entry/EntryView.vue'),
    meta: {
      layout: DashboardLayout,
      title: 'Entry',
      navigation: 'entries'
    }
  },
  {
    path: '/entries/',
    name: 'entries',
    component: () => import('@/views/finance/entry/EntriesView.vue'),
    meta: {
      layout: DashboardLayout,
      title: 'Entries',
      navigation: 'entries'
    }
  }
]
