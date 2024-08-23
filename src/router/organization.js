import DashboardLayout from "@/layout/DashboardLayout.vue";

export default [
  {
    path: "/organizations/invitations",
    name: "organizations_invitations",
    component: () => import("@/view/organization/InvitationView.vue"),
    meta: {
      layout: DashboardLayout,
      title: "Invitations",
    },
  },
  {
    path: "/organizations/create",
    name: "organizations_create",
    component: () => import("@/view/organization/CreateView.vue"),
    meta: {
      layout: DashboardLayout,
      title: "Create Organization",
    },
  },
];