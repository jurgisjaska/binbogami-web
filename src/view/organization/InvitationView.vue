<script setup>
import api from "@/api.js";
import InvitationForm from "@/component/form/organization/InvitationForm.vue";
import Pagination from "@/component/Pagination.vue";
import moment from "moment";
import { ref } from "vue";

const invitations = ref(null);
const metadata = ref({ pages: 0 });
const error = ref(null);

const membership = ref({role: 0});

// @todo get user role in the organization
// that can be done from membership

// Load invitations from the backend API
const load = (page) => {
  api
    .get("/v1/invitations", {params: {page}})
    .then((r) => {
      invitations.value = r.data.data;
      metadata.value = r.data.metadata;
    })
    .catch((e) => {
      console.error(e.response?.data?.message || "Unexpected error");
    });
};

(() => {
  api
    .get("/v1/members")
    .then((r) => {
      membership.value = r.data.data;
      console.log(r.data.data);
    })
    .catch((e) => {
      console.error(e.response?.data?.message || "Unexpected error");
    });
})();

// Load on open
load(1);
</script>

<template>
  <div class="invitation-view">
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div class="row">
      <div class="col-6">
        <p>Invite new members by email to join your organization.</p>
        <InvitationForm @refresh="load(1)" :membership="membership" />
      </div>
      <div class="col-6">
        <p>Already invited</p>

        <ul class="list-group mb-3">
          <li class="list-group-item" v-for="invitation in invitations" :key="invitation.id">
            <div class="d-flex">
              <div>
                <p>{{ invitation.email }}</p>
                <small>Expire at: {{ moment(invitation.expiredAt).format('YYYY-MM-DD hh:mm') }}</small>
              </div>
              <div class="ms-auto">
                <span class="badge text-bg-success ms-2" v-if="invitation.openedAt">Read</span>
                <span class="badge text-bg-success ms-2" v-if="invitation.deletedAt">Accepted</span>
                <span
                  class="badge text-bg-danger ms-2"
                  v-if="moment(invitation.expiredAt).format('YYYY-MM-DD hh:mm:ss') < moment().format('YYYY-MM-DD hh:mm:ss') && invitation.deletedAt === null"
                >Expired</span>
              </div>
            </div>
          </li>
        </ul>

        <Pagination :metadata="metadata" @change-page="load"/>

      </div>
    </div>
  </div>
</template>