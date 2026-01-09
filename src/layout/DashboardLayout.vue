<script setup>
import Navigation from "@/component/Navigation.vue";
</script>

<template>
  <div class="page">
    <Navigation/>

    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <h2 class="page-title">{{ $route.meta.title || "Dashboard" }}</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div class="container-xl">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>
