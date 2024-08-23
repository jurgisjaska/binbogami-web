import DashboardLayout from "@/layout/DashboardLayout.vue";

export default [
  {
    path: "/books",
    name: "books",
    component: () => import("@/view/book/ListView.vue"),
    meta: {
      layout: DashboardLayout,
      title: "Books",
    },
  },
  {
    path: "/books/create",
    name: "books_create",
    component: () => import("@/view/book/CreateView.vue"),
    meta: {
      layout: DashboardLayout,
      title: "Create new Book",
    },
  },
];