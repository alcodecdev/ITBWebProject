<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-dark text-white min-vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center w-100 m-0">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
</style>