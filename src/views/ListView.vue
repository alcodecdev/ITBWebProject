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
      <table class="table text-center table-bordered border-dark">
        <thead>
        <tr>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.nif') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.especie') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.accions') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.moviment') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.origen') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.destino') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.rega') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.cat') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.animals') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.sortida') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.arribada') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.sirentra') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.transport') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.matricula') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.conductor') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.nom_conductor') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.mobilitat') }}</th>
          <th class="bg-success p-2 text-dark bg-opacity-25">{{ $t('llista.columnes.accions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in listado" :key="item.nif">
          <td> <router-link :to="`/form/${item.numAnimals}`"><strong>{{item.nif}}</strong></router-link></td>
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
          <td colspan="18" class="text-center">{{ $t('llista.buida') }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
