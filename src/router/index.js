import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/view/HomeView.vue"
import DefaultLayout from "@/layout/DefaultLayout.vue";
import DashboardLayout from "@/layout/DashboardLayout.vue";

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
      component: () => import("@/view/SigninView.vue"),
      meta: {
        layout: DefaultLayout
      }
    },
    {
      path: "/signin/organization",
      name: "signin_organization",
      component: () => import("@/view/SigninOrganizationView.vue"),
      meta: {
        layout: DefaultLayout
      }
    },
    {
      path: "/signup/organization",
      name: "signup_organization",
      component: () => import("@/view/SignupOrganizationView.vue"),
      meta: {
        layout: DefaultLayout
      }
    },
    {
      path: "/signup/:invitation?",
      name: "signup",
      component: () => import("@/view/SignupView.vue"),
      meta: {
        layout: DefaultLayout
      }
    }
  ]
})

export default router
