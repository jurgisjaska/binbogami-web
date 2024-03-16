import { defineStore } from "pinia";

const storageName = "binbogami_organization";
export const useOrganizationStore = defineStore("organization", {
  state: () => ({
    organization: JSON.parse(localStorage.getItem(storageName)) || null,
  }),
  getters: {
    organization: (state) => state.organization,
  },
  actions: {
    set(organization) {
      this.organization = organization;
      localStorage.setItem(storageName, JSON.stringify(organization));
    },
    clear() {
      this.organization = null;
      localStorage.removeItem(storageName);
    },
  },
});