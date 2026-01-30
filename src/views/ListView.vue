<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Button from "@/components/Button.vue";
import {ref} from "vue";

let listado = ref(JSON.parse(localStorage.getItem("listaAltas")) || []);

const borrarAlta = function (nif) {
  listado.value = listado.value.filter(item => item.nif !== nif)
  localStorage.setItem("listaAltas", JSON.stringify(listado.value));
}


</script>

<template>
  <navbar></navbar>
  <div class="container-fluid mt-4">
    <title-and-subtitle
        class="textoOscuro"
        title="Llista d'altes"
        title-class="display-5 fw-bolder"
        divClass="mb-4 border-bottom border-secondary border-opacity-50 pb-3"
    ></title-and-subtitle>

    <div class="table-responsive">
      <table class="table table-success text-center table-bordered">
        <thead>
        <tr>
          <th>NIF</th>
          <th>Contrasenya</th>
          <th>Acciò</th>
          <th>Tipus Moviment</th>
          <th>Explotació Origen</th>
          <th>Explotació Destinació</th>
          <th>Codi Rega</th>
          <th>Categoría</th>
          <th>Número animals</th>
          <th>Data sortida</th>
          <th>Data arribada</th>
          <th>Codi Sirentra</th>
          <th>Mitjà transport</th>
          <th>Matrícula</th>
          <th>NIF Conductor</th>
          <th>Nom Conductor</th>
          <th>Mobilitat</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in listado" :key="item.nif">
          <td> <router-link :to="`/form/${item.nif}`">{{item.nif}}</router-link></td>
          <td>{{ item.password }}</td>
          <td>{{ item.tipoAccion }}</td>
          <td>{{ item.tipoMovimiento }}</td>
          <td>{{ item.ExplotacionOrigen }}</td>
          <td>{{ item.ExplotacionDestino }}</td>
          <td>{{ item.codigoRega }}</td>
          <td>{{ item.categoria }}</td>
          <td>{{ item.numAnimals }}</td>
          <td>{{ item.fechaSalida }}</td>
          <td>{{ item.fechaLlegada }}</td>
          <td>{{ item.sirCode }}</td>
          <td>{{ item.medioTransporte }}</td>
          <td>{{ item.matricula }}</td>
          <td>{{ item.nifConductor }}</td>
          <td>{{ item.mobilitat }}</td>
          <td><Button clase="btn btn-danger" nombreSpan="Borrar" id="borrarAlta" @click="borrarAlta(item.nif)"></Button></td>
        </tr>

        <tr v-if="listado.length === 0">
          <td colspan="16" class="text-center">No hi ha dades disponibles</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>