<script setup>
import { RouterView } from 'vue-router'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase"
import { ref } from "vue"

const user = ref(null)

onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser
})
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