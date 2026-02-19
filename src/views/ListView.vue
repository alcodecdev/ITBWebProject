<script setup>
import Navbar from "@/components/layout/Navbar.vue";
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Button from "@/components/Button.vue";
import {ref} from "vue";

let listado = ref(JSON.parse(localStorage.getItem("listaAltas")) || []);

const borrarAlta = function (numAnimals) {
  listado.value = listado.value.filter(item => item.numAnimals !== numAnimals);
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
      <table class="table text-center table-bordered border-dark">
        <thead>
        <tr>
          <th class="bg-success p-2 text-dark bg-opacity-25">NIF</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Especie</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Acciò</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Tipus Moviment</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Explotació Origen</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Explotació Destinació</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Codi Rega</th>
          <th class="bg-success p-2 text-dark bg-opacity-25" >Categoría</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Número animals</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Data sortida</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Data arribada</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Codi Sirentra</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Mitjà transport</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Matrícula</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">NIF Conductor</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Nom Conductor</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Mobilitat</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in listado" :key="item.nif">
          <td> <router-link :to="`/form/${item.numAnimals}`"> <strong>{{item.nif}} </strong></router-link></td>
          <td class>{{item.tipusEspecie}}</td>
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
          <td>{{item.nombreTransportista}}</td>
          <td>{{ item.mobilitat }}</td>
          <td><Button clase="btn btn-danger" nombreSpan="Borrar" id="borrarAlta" @click="borrarAlta(item.numAnimals)"></Button></td>
        </tr>

        <tr v-if="listado.length === 0">
          <td colspan="17" class="text-center">No hi ha dades disponibles</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>