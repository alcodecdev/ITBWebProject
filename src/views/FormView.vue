<script setup>

import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import CampoFormulario from "@/components/CampoFormulario.vue";
import Navbar from "@/components/layout/Navbar.vue";
import Button from "@/components/Button.vue";
import {inicializarFormEnvioPorc} from "@/App/appFormEnvioPorc.js";

'../App/appFormEnvioPorc.js'
import {onMounted} from "vue";

onMounted(() => inicializarFormEnvioPorc())
</script>

<template>
  <navbar></navbar>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10">
        <title-and-subtitle
            class="textoOscuro"
            title="Registre de tramesa"
            title-class="display-5 fw-bolder"
            subtitle="Porcí - Control de lots"
            subtitle-class="text-uppercase small mb-0"
            divClass="mb-4 border-bottom border-secondary border-opacity-50 pb-3"
        ></title-and-subtitle>
      </div>

      <form class="row g-4 p-4 p-md-5 rounded-4 bg-white shadow-lg border-0 text-dark">
        <campo-formulario
            type="text"
            label="NIF"
            placeholder="12345678X"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="nifError"
         id="inputNif"></campo-formulario>

        <campo-formulario
            type="password"
            label="CONTRASENYA MOVILITAT:"
            placeholder="*******"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            error-div-i-d="passwordError"
         id="inputPassword"></campo-formulario>

        <campo-formulario
            type="text"
            label="CODI EXPLOTACIÓ ORIGEN:"
            model-value="ES250020011648"
            :readonly="true"
            placeholder=""
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="originCodeError"
         id="inputOrigen"></campo-formulario>

        <campo-formulario
            type="text"
            label="CODI EXPLOTACIÓ DESTINACIÓ:"
            placeholder="ES430050035112"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="explotationCodeError"
         id="inputDestino"></campo-formulario>

        <campo-formulario
            type="text"
            :readonly="true"
            label="ESPÈCIE:"
            model-value="02"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="specieCodeError"
         id="inputEspecie"></campo-formulario>

        <campo-formulario
            type="text"
            label="ACCIÓ:"
            model-value="NO"
            :readonly="true"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="actionCodeError"
         id="inputAccio"></campo-formulario>

        <campo-formulario
            type="text"
            label="MOVIMENT:"
            model-value="01"
            :readonly="true"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="movementCodeError"
         id="inputMoviment"></campo-formulario>

        <div class="col-md-3">
          <label class="form-label small" for="inputCategoria">CODI CATEGORIA:</label>
          <select class="form-select bg-light text-dark border-secondary" id="inputCategoria" required>
            <option selected disabled value="">Selecciona uno</option>
            <option value="00">Engreix</option>
            <option value="01">Garrins</option>
            <option value="02">Recria/Transicio</option>
            <option value="03">Femelles reproductores</option>
            <option value="04">Reposicio</option>
            <option value="05">Sementals</option>
          </select>
          <div id="errorCategory" class="text-danger small fw-bold"></div>
        </div>

        <campo-formulario
            type="date"
            label="DATA SORTIDA:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            error-div-i-d="exitError"

         id="inputFechaSalida"></campo-formulario>

        <campo-formulario
            type="date"
            label="DATA ARRIBADA:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            error-div-i-d="comeError"
         id="inputFechaLlegada"></campo-formulario>

        <div class="col-md-6">
          <label class="form-label fw-bold text-light  small d-block">MOBILITAT (SI/NO)</label>
          <div class="btn-group w-100" role="group">
            <input type="radio" class="btn-check" name="mobilitat" id="siMobilitat" value="si" required>
            <label class="btn btn-outline-light fw-bold" for="siMobilitat">SÍ</label>
            <input type="radio" class="btn-check" name="mobilitat" id="noMobilitat" value="no" checked required>
            <label class="btn btn-outline-light fw-bold" for="noMobilitat">NO</label>
          </div>
          <div id="errorMobility" class="text-danger small fw-bold"></div>
        </div>

        <div class="col-12">
          <h5 class="mt-4 text-light border-top border-secondary border-opacity-25 pt-3">Dades del Transport</h5>
        </div>
        <campo-formulario
            id="inputNombreTransportista"
            type="text"
            label="NOM TRANSPORTISTA"
            placeholder="Introduir nom"
            label-class="form-label fw-bold text-light small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            error-div-i-d="nameTransportError"
        ></campo-formulario>

        <div class="col-md-6 mb-3"> <label class="form-label small" for="selectMedioTransporte">MITJÀ DE TRANSPORT:</label>
          <select class="form-select bg-light text-dark border-secondary" id="selectMedioTransporte" required>
            <option selected disabled value="">Selecciona uno</option>
            <option value="01">Camión</option>
            <option value="99">Otros</option>
          </select>
          <div id="errorTransport" class="text-danger small fw-bold"></div>
        </div>


        <campo-formulario
            type="text"
            label="MATRÍCULA:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            error-div-i-d="MatriculaError"
         id="inputMatricula"></campo-formulario>

        <campo-formulario
            type="text"
            label="NIF CONDUCTOR:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="NIFError"
         id="inputNifConductor"></campo-formulario>

        <campo-formulario
            type="number"
            label="NÚMERO DE ANIMALES:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="AnimalNumberError"
         id="inputAnimals"></campo-formulario>

        <campo-formulario
            type="number"
            label="SIRCODE:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="SIRCODEError"
         id="inputsirCode">
        </campo-formulario>


        <div class="col-12 d-flex flex-column flex-md-row gap-3 py-4 mt-3 border-top border-secondary border-opacity-25">


            <Button
                id="enviar"
                clase="btn btn-success btn-lg flex-grow-1 fw-bold bg-primary"
                nombreSpan="REGISTRAR TRAMESA"
            >
              <router-link to="/home" class="text-decoration-none color-inherit" style="color: inherit;">
              </router-link>
            </Button>



          </div>











      </form>

    </div>
  </div>



</template>

<style scoped>

</style>