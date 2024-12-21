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
    path: "/books/:book",
    name: "book",
    component: () => import("@/view/book/BookView.vue"),
    meta: {
      layout: DashboardLayout,
      title: "Book",
    },
  },
];