import { defineStore } from "pinia";

export const useOrganizationStore = defineStore("organization", {
  state: () => ({
    organization: null,
  }),
  getters: {
    organization: (state) => state.organization,
  },
  actions: {
    set(organization) {
      this.organization = organization;
    },
    clear() {
      this.organization = null;
    },
  },
});