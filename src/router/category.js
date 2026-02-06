import DashboardLayout from "@/layout/DashboardLayout.vue";

export default [
  {
    path: "/categories/:category?",
    name: "category",
    component: () => import("@/view/category/CategoryView.vue"),
    meta: {
      layout: DashboardLayout,
      title: "Category",
      navigation: "categories",
    },
  },
  {
    path: "/categories/",
    name: "categories",
    component: () => import("@/view/category/CategoriesView.vue"),
    meta: {
      layout: DashboardLayout,
      title: "Categories",
      navigation: "categories",
    },
  },
];
