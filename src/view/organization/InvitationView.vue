<script setup>
import api from "@/api.js";
import EmailField from "@/component/form/EmailField.vue";
import InvitationForm from "@/component/form/organization/InvitationForm.vue";
import moment from "moment";
import { ref } from "vue";

const invitations = ref(null);
const error = ref(null);

const now = moment().format("YYYY-MM-DD hh:mm:ss");
console.log(now);

// @todo verify the role of user!

(() => {
  api.get("/v1/invitations")
    .then((r) => {
      invitations.value = r.data.data;

      // invitation expired - expired
      // invitation deleted - accepted
      // invitation NOT expired and NOT deleted - active?
      // invotation opened - ???

      // expired at always a date
    })
    .catch((e) => {
      console.error(e.response?.data?.message || "Unexpected error");
    });
})();
</script>

<template>
  <div class="invitation-view">
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div class="row">
      <div class="col-6">
        <p>Invite new members by email to join your organization.</p>
        <InvitationForm/>
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