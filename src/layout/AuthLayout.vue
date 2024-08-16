<template>
  <div class="container">
    <div class="d-flex justify-content-center align-items-center">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.container > div {
  min-height: 100vh;
}
</style>