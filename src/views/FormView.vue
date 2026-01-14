<script setup>

import Navbar from "@/components/layout/Navbar.vue";
import Button from "@/components/Button.vue";
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import CampoFormulario from "@/components/CampoFormulario.vue";
</script>

<template>
  <Navbar/>

  <div class="bg-light text-white py-4">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">

          <div class="mb-4 border-bottom border-secondary border-opacity-50 pb-3">
            <TitleAndSubtitle
                title="Registre de Tramesa"
                subtitle="Porcí - Control de Lots"
                titleClass="display-5 fw-bolder text-success"
                subtitleClass="text-success text-uppercase small mb-0"
            />
          </div>

          <form id="formEnvio" class="row g-3 p-4 p-md-5 border border-secondary border-opacity-22 rounded-4 bg-success bg-opacity-22 shadow">

            <CampoFormulario
                divClass="col-md-6"
                label="NIF"
                labelClass="form-label fw-bold text-light small"
                inputClass="form-control bg-light text-dark border-secondary"
                placeholder="Ingrese su NIF"
            />

            <CampoFormulario
                divClass="col-md-6"
                label="CONTRASENYA MOVILITAT:"
                labelClass="form-label fw-bold text-light small"
                inputClass="form-control bg-light text-dark border-secondary"
                placeholder="Ingrese la contraseña"
            />


            <div class="col-12 d-flex gap-3 py-4">
              <Button
                  clase="btn btn-danger btn-lg flex-grow-1 fw-bold"
                  nombreSpan="CANCELAR"
              />

              <Button
                  type="submit"
                  clase="btn btn-primary btn-lg flex-grow-1 fw-bold shadow"
                  nombreSpan="ENVIAR"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>