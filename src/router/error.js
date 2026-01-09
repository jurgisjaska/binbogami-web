import DefaultLayout from "@/layout/DefaultLayout.vue";
import ErrorLayout from "@/layout/ErrorLayout.vue";

export default [
  {
    path: "/:pathMatch(.*)*",
    name: "error_404",
    component: () => import("@/view/error/NotFoundView.vue"),
    meta: {
      layout: ErrorLayout,
      title: "Error",
    },
  },
];
