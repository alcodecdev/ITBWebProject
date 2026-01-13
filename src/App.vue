<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
        <RouterView />
  </div>
</template>

<style>
body, html {
  margin: 0;
  padding: 0;
  background-color: #f8f9fa !important;
  min-vh-100: 100vh;
}
</style>