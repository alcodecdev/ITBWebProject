<script setup>
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Button from "@/components/Button.vue";
import {ref} from "vue";
import { useI18n } from 'vue-i18n'

let listado = ref(JSON.parse(localStorage.getItem("listaAltas")) || []);
const { t } = useI18n()

const borrarAlta = function (numAnimals) {
  listado.value = listado.value.filter(item => item.numAnimals !== numAnimals);
  localStorage.setItem("listaAltas", JSON.stringify(listado.value));
}


</script>

<template>
  <div class="container-fluid mt-4">
    <title-and-subtitle
        class="textoOscuro"
        :title="$t('llista.titol')"
        title-class="display-5 fw-bolder"
        divClass="mb-4 border-bottom border-secondary border-opacity-50 pb-3"
    ></title-and-subtitle>

    <div class="table-responsive">
      <table class="table table-success text-center table-bordered">
        <thead>
        <tr>
          <th>{{ $t('llista.columnes.nif') }}</th>
          <th>{{ $t('llista.columnes.pass') }}</th>
          <th>{{ $t('llista.columnes.accio') }}</th>
          <th>{{ $t('llista.columnes.moviment') }}</th>
          <th>{{ $t('llista.columnes.origen') }}</th>
          <th>{{ $t('llista.columnes.destino') }}</th>
          <th>{{ $t('llista.columnes.rega') }}</th>
          <th>{{ $t('llista.columnes.cat') }}</th>
          <th>{{ $t('llista.columnes.animals') }}</th>
          <th>{{ $t('llista.columnes.sortida') }}</th>
          <th>{{ $t('llista.columnes.arribada') }}</th>
          <th>{{ $t('llista.columnes.sirentra') }}</th>
          <th>{{ $t('llista.columnes.transport') }}</th>
          <th>{{ $t('llista.columnes.matricula') }}</th>
          <th>{{ $t('llista.columnes.conductor') }}</th>
          <th>{{ $t('llista.columnes.mobilitat') }}</th>
          <th>{{ $t('llista.columnes.accions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in listado" :key="item.nif">
          <td> <router-link :to="`/form/${item.numAnimals}`">{{item.nif}}</router-link></td>
          <td>{{item.tipusEspecie}}</td>
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
          <td><Button clase="btn btn-danger" :nombreSpan="$t('llista.boto_borrar')" id="borrarAlta" @click="borrarAlta(item.nif)"></Button></td>
        </tr>

        <tr v-if="listado.length === 0">
          <td colspan="16" class="text-center">{{ $t('llista.buida') }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>