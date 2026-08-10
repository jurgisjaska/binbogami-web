import AuthLayout from '@/layouts/AuthLayout.vue'

export default [
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/auth/SigninView.vue'),
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPasswordView.vue'),
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: '/reset-password/:id',
    name: 'reset-password',
    component: () => import('@/views/auth/ResetPasswordView.vue'),
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: '/signup/:invitation?',
    name: 'signup',
    component: () => import('@/views/auth/SignupView.vue'),
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: '/wait',
    name: 'wait',
    component: () => import('@/views/auth/WaitView.vue'),
    meta: {
      layout: AuthLayout
    }
  }
]
