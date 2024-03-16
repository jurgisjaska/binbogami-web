import { defineStore } from "pinia";

export const tokenStore = defineStore("token", {
  state: () => ({
    token: null,
  }),
  getters: {
    token: (state) => state.token,
  },
  actions: {
    set(token) {
      this.token = token;
    },
    clear() {
      this.token = null;
    },
  },
});