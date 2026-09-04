import DashboardLayout from '@/layouts/DashboardLayout.vue'

export default [
  {
    path: '/locations/:location?',
    name: 'location',
    component: () => import('@/views/finance/location/LocationView.vue'),
    meta: {
      layout: DashboardLayout,
      title: 'Location',
      navigation: 'locations'
    }
  },
  {
    path: '/locations/',
    name: 'locations',
    component: () => import('@/views/finance/location/LocationsView.vue'),
    meta: {
      layout: DashboardLayout,
      title: 'Locations',
      navigation: 'locations'
    }
  }
]
