import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/view/HomeView.vue"

// @todo add before checks for the token

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/view/AboutView.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/view/DashboardView.vue")
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("@/view/SigninView.vue")
    },
    {
      path: "/signin/organization",
      name: "signin_organization",
      component: () => import("@/view/SigninOrganizationView.vue")
    },
    {
      path: "/signup/organization",
      name: "signup_organization",
      component: () => import("@/view/SignupOrganizationView.vue")
    },
    {
      path: "/signup/:invitation?",
      name: "signup",
      component: () => import("@/view/SignupView.vue")
    }
  ]
})

export default router
