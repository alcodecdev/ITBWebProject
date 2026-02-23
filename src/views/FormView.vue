<script setup>

import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import CampoFormulario from "@/components/CampoFormulario.vue";
import Navbar from "@/components/layout/Navbar.vue";
import Button from "@/components/Button.vue";
import {inicializarFormEnvioPorc} from "@/App/appForm.js";
import { estimateSustainability } from "@/App/consumoCO2PorCadaOperacion.js"
import { getEnergyConsumption } from "@/App/consumoElectrico.js"
'../App/appForm.js'
import {ref,onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import Footer from "@/components/layout/Footer.vue";
const route = useRoute();
const router = useRouter();
let esEdicion = ref(false);

const energyData = ref({ wattHora: 0, kilobytes: 0 });

onMounted(() => {
  const numAnimales = route.params.numAnimals;
  if (numAnimales){
    esEdicion = true;
    const listado = JSON.parse(localStorage.getItem("listaAltas")) || [];
    const encontrado = listado.find(item => item.numAnimals === numAnimales);
    if (encontrado){
      setTimeout(() => {
        document.getElementById("inputNif").value = encontrado.nif;
        document.getElementById("inputPassword").value = encontrado.password;
        document.getElementById("inputOrigen").value = encontrado.ExplotacionOrigen;
        document.getElementById("inputDestino").value = encontrado.ExplotacionDestino;
        document.getElementById("inputAnimals").value = encontrado.numAnimals;
        document.getElementById("inputsirCode").value = encontrado.sirCode;
        document.getElementById("inputMatricula").value = encontrado.matricula;
        document.getElementById("inputNombreTransportista").value = encontrado.nombreTransportista;
        document.getElementById("inputEspecie").value = "02";
        document.getElementById("inputAccio").value = encontrado.tipoAccion;
        document.getElementById("inputMoviment").value = encontrado.tipoMovimiento;



        document.getElementById("inputNifConductor").value = encontrado.nifConductor;

        // Para los SELECTS
        document.getElementById("inputCategoria").value = encontrado.categoria;
        document.getElementById("selectMedioTransporte").value = encontrado.medioTransporte;

        // Para los RADIO buttons (Mobilitat)
        if (encontrado.mobilitat.toLowerCase() === 'si') {
          document.getElementById("siMobilitat").checked = true;
        } else {
          document.getElementById("noMobilitat").checked = true;
        }
      }, 100);
    }
  }

  inicializarFormEnvioPorc();

  // Esperamos un momento a que termine la carga de recursos para medir
  setTimeout(() => {
    const impact = estimateSustainability();
    energyData.value = getEnergyConsumption();

    console.log(
        `%c SOSTENIBILIDAD GTR %c Impacto: ${impact.co2Grams}g CO2 | Energía: ${energyData.value.wattHora} Wh`,
        "background: #2e7d32; color: white; padding: 2px 5px; border-radius: 3px; font-weight: bold;",
        "color: #2e7d32; font-weight: bold;"
    );

    console.log(`Datos transferidos: ${energyData.value.kilobytes} KB`);
  }, 1000); // 1 segundo de delay para pillar todos los recursos de red
});

</script>

<template>
  <div class="container flex-grow-1 my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10">
        <title-and-subtitle
            class="textoOscuro"
            :title="$t('form.titol')"
            title-class="display-5 fw-bolder"
            :subtitle="$t('form.subtitol')"
            subtitle-class="text-uppercase small mb-0"
            divClass="mb-4 border-bottom border-secondary border-opacity-50 pb-3"
        ></title-and-subtitle>
      </div>

      <form class="row g-4 p-4 p-md-5 rounded-4 bg-white shadow-lg border-0 text-dark">
        <campo-formulario
            type="text"
            :label="$t('form.labels.nif')"
            placeholder="12345678X"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="nifError"
            id="inputNif"></campo-formulario>

        <campo-formulario
            type="password"
            :label="$t('form.labels.passwd')"
            placeholder="*******"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            error-div-i-d="passwordError"
            id="inputPassword"></campo-formulario>

        <campo-formulario
            type="text"
            :label="$t('form.labels.origen')"
            placeholder="1111AA"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="originCodeError"
            id="inputOrigen"></campo-formulario>

        <campo-formulario
            type="text"
            :label="$t('form.labels.destino')"
            placeholder="1111AA"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="explotationCodeError"
            id="inputDestino"></campo-formulario>

        <campo-formulario
            type="text"
            :label="$t('form.labels.especie')"
            placeholder="02"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="specieCodeError"
            id="inputEspecie"></campo-formulario>

        <campo-formulario
            type="text"
            :label="$t('form.labels.accio')"
            placeholder="no"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="actionCodeError"
            id="inputAccio"></campo-formulario>

        <campo-formulario
            type="text"
            :label="$t('form.labels.moviment')"
            placeholder="01"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="movementCodeError"
            id="inputMoviment"></campo-formulario>

        <div class="col-md-3">
          <label class="form-label small" for="inputCategoria">{{$t('form.labels.categoria')}}</label>
          <select class="form-select bg-light text-dark border-secondary" id="inputCategoria" required>
            <option selected disabled value="">{{ $t('form.opcions.selecciona') }}</option>
            <option value="00">{{ $t('form.opcions.engreix') }}</option>
            <option value="01">{{ $t('form.opcions.garrins') }}</option>
            <option value="02">{{$t('form.opcions.recria')}}</option>
            <option value="03">{{$t('form.opcions.reproductores')}}</option>
            <option value="04">{{$t('form.opcions.reposicio')}}</option>
            <option value="05">{{$t('form.opcions.sementals')}}</option>
          </select>
          <div id="errorCategory" class="text-danger small fw-bold"></div>
        </div>

        <campo-formulario
            type="date"
            :label="$t('form.labels.data_sortida')"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            error-div-i-d="exitError"

            id="inputFechaSalida"></campo-formulario>

        <campo-formulario
            type="date"
            :label="$t('form.labels.data_arribada')"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            error-div-i-d="comeError"
            id="inputFechaLlegada"></campo-formulario>

        <div class="col-md-6">
          <label class="form-label fw-bold text-secondary small d-block">{{ $t('form.labels.mobilitat') }}</label>
          <div class="btn-group w-100" role="group">
            <input type="radio" class="btn-check" name="mobilitat" id="siMobilitat" value="si" required>
            <label class="btn btn-outline-secondary fw-bold" for="siMobilitat">{{ $t('form.opcions.si') }}</label>
            <input type="radio" class="btn-check" name="mobilitat" id="noMobilitat" value="no" checked required>
            <label class="btn btn-outline-secondary fw-bold" for="noMobilitat">{{ $t('form.opcions.no') }}</label>
          </div>
          <div id="errorMobility" class="text-danger small fw-bold"></div>
        </div>

        <div class="col-12">
          <h5 class="mt-4 border-top border-secondary border-opacity-25 pt-3">{{ $t('form.seccio_transport')}}</h5>
        </div>
        <campo-formulario
            id="inputNombreTransportista"
            type="text"
            :label="$t('form.labels.nom_transportista')"
            :placeholder="$t('form.placeholder.place_nombreTransportista')"
            label-class="form-label fw-bold text-light small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            error-div-i-d="nameTransportError"
        ></campo-formulario>

        <div class="col-md-6 mb-3"> <label class="form-label small" for="selectMedioTransporte">{{ $t('form.labels.medio_transport') }}</label>
          <select class="form-select bg-light text-dark border-secondary" id="selectMedioTransporte" required>
            <option selected disabled value="">{{ $t('form.opcions.selecciona') }}</option>
            <option value="01">{{ $t('form.opcions.camio') }}</option>
            <option value="99">{{ $t('form.opcions.otros') }}</option>
          </select>
          <div id="errorTransport" class="text-danger small fw-bold"></div>
        </div>


        <campo-formulario
            type="text"
            :label="$t('form.labels.matricula')"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            error-div-i-d="MatriculaError"
            id="inputMatricula"></campo-formulario>

        <campo-formulario
            type="text"
            :label="$t('form.labels.nif_conductor')"
            placeholder="12345678X"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="NIFError"
            id="inputNifConductor"></campo-formulario>

        <campo-formulario
            type="number"
            :label="$t('form.labels.sircode')"
            placeholder="Ej(200)"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
            errorDivID="AnimalNumberError"
            id="inputAnimals"></campo-formulario>

        <campo-formulario
            type="text"
            :label="$t('form.labels.sircode')"
            placeholder="12345678ABCD"
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
              :nombreSpan="$t('form.boto_registrar')"
          >
            <router-link to="/home" class="text-decoration-none color-inherit" style="color: inherit;">
            </router-link>
          </Button>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>

<style scoped>

</style>