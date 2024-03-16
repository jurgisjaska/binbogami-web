import { defineStore } from "pinia";

const storageName = "binbogami_token"
export const useTokenStore = defineStore("token", {
  state: () => ({
    token: JSON.parse(localStorage.getItem(storageName)) || null,
  }),
  getters: {
    token: (state) => state.token,
  },
  actions: {
    set(token) {
      this.token = token;
      localStorage.setItem(storageName, JSON.stringify(token));
    },
    clear() {
      this.token = null;
      localStorage.removeItem(storageName);
    },
  },
});