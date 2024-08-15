<template>
  <div class="section">
    <div class="columns is-centered is-vcentered">
      <div class="column is-one-third">
        <div class="box">
          <slot />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.section {
  min-height: 100vh;
}
</style>