<template>
  <div class="empty">
    <div class="empty-img">
      <img src="@/asset/error404.svg" alt="404 Error">
    </div>
    <p class="empty-title">Oops… You just found an error page</p>
    <p class="empty-subtitle text-secondary">We are sorry but the page you are looking for was not found</p>
    <div class="empty-action">
      <RouterLink :to="{ name: 'home' }" class="btn btn-primary btn-4">
        <i class="fa fa-arrow-left icon icon-2"></i> Return to Homepage
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>
