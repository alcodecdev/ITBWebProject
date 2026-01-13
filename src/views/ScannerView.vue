<script setup>

import Navbar from "@/components/layout/Navbar.vue";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";

const goToForm = () => {
  router.push('/form')
}

</script>

<template>
<div class="bg-light text-white min-vh-100">

  <Navbar />


  <div class="container text-center">






    <div class="fixed-bottom p-3 bg-light bg-opacity-90">
      <div class="container d-grid">
        <Button
            @click="goToForm"
            nombreSpan="FINALIZAR Y ENVIAR FORMULARIO"
            clase="btn btn-success btn-lg fw-bold py-3 shadow"/>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>