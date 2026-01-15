<script setup>

import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import CampoFormulario from "@/components/CampoFormulario.vue";
</script>

<template>
  <div class="container">
    <div class="roww justify-content-center">
      <div class="col-12 col-lg-10">
        <title-and-subtitle
            title="Registre de tramesa"
            title-class="display-5 fw-bolder text-success"
            subtitle="Porcí - Control de lots"
            subtitle-class="text-success text-uppercase small mb-0"
            divClass="mb-4 border-bottom border-secondary border-opacity-50 pb-3"
        ></title-and-subtitle>
      </div>

      <form id="formEnvio" class="row g-3 p-4 p-md-5 border border-secondary border-opacity-22 rounded-4 bg-success bg-opacity-22 shadow">
        <campo-formulario
        type="text"
        label="NIF"
        placeholder="12345678X"
        label-class="form-label fw-bold text-light  small"
        input-class="form-control bg-light text-dark border-secondary"
        div-error-class="text-danger small fw-bold"
        divClass="col-md-6"
        ></campo-formulario>

      </form>

    </div>
  </div>



</template>

<style scoped>

</style>