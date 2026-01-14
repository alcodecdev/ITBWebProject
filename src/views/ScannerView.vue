<script setup>

import Navbar from "@/components/layout/Navbar.vue";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";
import SpinnerAnimation from "@/components/SpinnerAnimation.vue";
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import BarraAgregar from "@/components/BarraAgregar.vue";

const goToForm = () => {
  router.push('/form')
}

</script>

<template>
<div class="bg-light text-white min-vh-100">

  <Navbar />


  <div class="container text-center">

    <SpinnerAnimation />

    <TitleAndSubtitle
        divClass="mb-4"
        titleH2Class="fw-bold text-success"
        titleH2="ESCANEO"
        subtitle="Lector Activo"
        subtitleClass="text-success small text-uppercase tracking-widest"
    />

    <BarraAgregar />

    <div class="row justify-content-center mb-4">

    </div>

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