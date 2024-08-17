<script setup>
import api from "@/api.js";
import { ref } from "vue";

const invitations = ref(null);
const error = ref(null);

(() => {
  api.get("/v1/invitations")
    .then((r) => {
      invitations.value = r.data.data;
    })
    .catch((e) => {
      console.error(e.response?.data?.message || "Unexpected error");
    });
})();
</script>

<template>
  <div class="invitation-view">
    <div class="card bg-body-tertiary">
      <div class="card-body">
        <div class="d-flex justify-content-between mb-4">
          <p>Invite new members by email to join your organization.</p>
          <button class="btn btn-primary rounded-circle ms-auto">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>

        <div class="alert alert-danger" v-if="error">{{ error }}</div>

        <ul class="list-group list-group-flush">
          <li class="list-group-item bg-body-tertiary d-flex justify-content-between align-items-center">
            An item

            <div class="btn-group ms-auto" role="group">
              <!-- action to do something with the invitation -->
              <button class="btn btn-danger">aaa</button>
              <button class="btn btn-primary">aaa</button>
            </div>
          </li>
          <li class="list-group-item bg-body-tertiary">A second item</li>
          <li class="list-group-item bg-body-tertiary">A third item</li>
          <li class="list-group-item bg-body-tertiary">A fourth item</li>
          <li class="list-group-item bg-body-tertiary">And a fifth one</li>
        </ul>

      </div>
    </div>
  </div>
</template>