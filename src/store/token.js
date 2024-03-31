import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

const storageName = "binbogami_token";
export const useTokenStore = defineStore("token", {
  state: () => ({
    token: localStorage.getItem(storageName) ? jwtDecode(localStorage.getItem(storageName)) : null,
  }),
  getters: {
    get: (state) => state.token,
  },
  actions: {
    set(token) {
      this.token = token;
      localStorage.setItem(storageName, token);
    },
    clear() {
      this.token = null;
      localStorage.removeItem(storageName);
    },
  },
});