import DashboardLayout from "@/layout/DashboardLayout.vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import HomeView from "@/view/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

// separated routes
import authRoutes from "./auth.js";
import organizationRoutes from "./organization.js";
import userRoutes from "./user.js";
import bookRoutes from "./book.js";

// @todo add before checks for the token

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: DefaultLayout,
        title: "Home",
      },
    },
    ...authRoutes,
    ...organizationRoutes,
    ...userRoutes,
    ...bookRoutes,
    {
      path: "/about",
      name: "about",
      component: () => import("@/view/AboutView.vue"),
      meta: {
        layout: DefaultLayout,
        title: "About",
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/view/DashboardView.vue"),
      meta: {
        layout: DashboardLayout,
        title: "Dashboard",
      },
    },
  ],
});

export default router;
