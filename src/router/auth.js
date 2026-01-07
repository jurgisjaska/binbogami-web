import AuthLayout from "@/layout/AuthLayout.vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";

export default [
  {
    path: "/signin",
    name: "signin",
    component: () => import("@/view/auth/SigninView.vue"),
    meta: {
      layout: AuthLayout,
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/view/auth/ForgotPasswordView.vue"),
    meta: {
      layout: AuthLayout,
    },
  },
  {
    path: "/reset-password/:id",
    name: "reset-password",
    component: () => import("@/view/auth/ResetPasswordView.vue"),
    meta: {
      layout: AuthLayout,
    },
  },
  {
    path: "/signup/:invitation?",
    name: "signup",
    component: () => import("@/view/auth/SignupView.vue"),
    meta: {
      layout: AuthLayout,
    },
  },
];
