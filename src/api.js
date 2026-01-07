import axios from "axios";
import router from "./router";

import { useTokenStore } from "@/store/token.js";
import { useUserStore } from "@/store/user.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL || "http://localhost:8101",
});

api.interceptors.request.use(
  (config) => {
    // @todo this feels incorrect
    const token = localStorage.getItem("binbogami_token");

    // @todo this should be changed later
    if (token && config.url.includes("v1/")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      useTokenStore().clear();
      useUserStore().clear();

      router.push("/signin");
    }
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      useTokenStore().clear();
      useUserStore().clear();

      router.push("/signin");
    }
    return Promise.reject(error);
  });

export default api;
