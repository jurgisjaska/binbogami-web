import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  getters: {
    organization: (state) => state.user,
  },
  actions: {
    set(user) {
      this.user = user;
    },
    clear() {
      this.user = null;
    },
  },
});