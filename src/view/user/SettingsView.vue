<script setup>

</script>

<template>
<div class="card">
  <div class="row g-0">
    <div class="col-12 col-md-3 border-end">
      <div class="card-body">
        <h4 class="subheader">Settings</h4>
        <div class="list-group list-group-transparent">
          <RouterLink :to="{name: 'users_settings'}" class="list-group-item list-group-item-action d-flex align-items-center active">
            Account
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-9 d-flex flex-column">
      <div class="card-body">
        <h2 class="mb-4">My Account</h2>
        <h3 class="card-title">Profile Details</h3>

        <h3 class="card-title mt-4">Business Profile</h3>

        <h3 class="card-title mt-4">Email</h3>
        <p class="card-subtitle">You can set a permanent password if you don't want to use temporary login codes.</p>
        <div>
          <a href="#" class="btn btn-1"> Set new password </a>
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
