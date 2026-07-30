import DashboardLayout from '@/layouts/DashboardLayout.vue'

export default [
  {
    path: '/users',
    name: 'users_profile',
    component: () => import('@/views/user/ProfileView.vue'),
    meta: {
      layout: DashboardLayout,
      title: 'Profile'
    }
  },
  {
    path: '/users/settings',
    name: 'users_settings',
    component: () => import('@/views/user/SettingsView.vue'),
    meta: {
      layout: DashboardLayout,
      title: 'Settings'
    }
  }
]
