import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/view/HomeView.vue"
import DefaultLayout from "@/layout/DefaultLayout.vue";
import DashboardLayout from "@/layout/DashboardLayout.vue";
import AuthLayout from "@/layout/AuthLayout.vue";

// @todo add before checks for the token

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: DefaultLayout
      }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/view/AboutView.vue"),
      meta: {
        layout: DefaultLayout
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/view/DashboardView.vue"),
      meta: {
        layout: DashboardLayout
      }
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("@/view/auth/SigninView.vue"),
      meta: {
        layout: AuthLayout
      }
    },
    {
      path: "/signin/organization",
      name: "signin_organization",
      component: () => import("@/view/auth/SigninOrganizationView.vue"),
      meta: {
        layout: DefaultLayout
      }
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("@/view/auth/ForgotPasswordView.vue"),
      meta: {
        layout: AuthLayout
      }
    },
    {
      path: "/reset-password/:id",
      name: "reset-password",
      component: () => import("@/view/auth/ResetPasswordView.vue"),
      meta: {
        layout: AuthLayout
      }
    },
    {
      path: "/signup/organization",
      name: "signup_organization",
      component: () => import("@/view/auth/SignupOrganizationView.vue"),
      meta: {
        layout: DefaultLayout
      }
    },
    {
      path: "/signup/:invitation?",
      name: "signup",
      component: () => import("@/view/auth/SignupView.vue"),
      meta: {
        layout: AuthLayout
      }
    }
  ]
})

export default router
