<script setup>
import api from "@/api.js";
import InvitationForm from "@/component/form/organization/InvitationForm.vue";
import moment from "moment";
import { ref } from "vue";

const invitations = ref(null);
const error = ref(null);

// @todo verify the role of user!

// Load invitations from the backend API.
const load = () => {
  api.get("/v1/invitations")
    .then((r) => {
      invitations.value = r.data.data;
    })
    .catch((e) => {
      console.error(e.response?.data?.message || "Unexpected error");
    });
};

// Load in open.
load();
</script>

<template>
  <div class="invitation-view">
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div class="row">
      <div class="col-6">
        <p>Invite new members by email to join your organization.</p>
        <InvitationForm @refresh="load"/>
      </div>
      <div class="col-6">
        <p>Already invited</p>

        <ul class="list-group">
          <li class="list-group-item" v-for="invitation in invitations" :key="invitation.id">
            {{ invitation.email }}
            <span class="badge text-bg-success" v-if="invitation.openedAt">Read</span>
            <span class="badge text-bg-success" v-if="invitation.deletedAt">Accepted</span>
            <span
              class="badge text-bg-danger"
              v-if="moment(invitation.expiredAt).format('YYYY-MM-DD hh:mm:ss') < moment().format('YYYY-MM-DD hh:mm:ss') && invitation.deletedAt === null"
            >Expired</span>
          </li>
        </ul>


      </div>
    </div>
  </div>
</template>