import { defineStore } from "pinia";

const storageName = "binbogami_user"
export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem(storageName)) || null,
  }),
  getters: {
    get: (state) => state.user,
  },
  actions: {
    set(user) {
      this.user = user;
      localStorage.setItem(storageName, JSON.stringify(user));
    },
    clear() {
      this.user = null;
      localStorage.removeItem(storageName);
    },
  },
});