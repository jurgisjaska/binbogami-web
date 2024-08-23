import DashboardLayout from "@/layout/DashboardLayout.vue";

export default [
  {
    path: "/users",
    name: "users_profile",
    component: () => import("@/view/user/ProfileView.vue"),
    meta: {
      layout: DashboardLayout,
      title: "Profile",
    },
  },
  {
    path: "/users/settings",
    name: "users_settings",
    component: () => import("@/view/user/SettingsView.vue"),
    meta: {
      layout: DashboardLayout,
      title: "Settings",
    },
  },
];