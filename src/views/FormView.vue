<script setup>
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import Cookies from 'js-cookie'
import Navbar from "@/components/layout/Navbar.vue"
import CampoFormulario from "@/components/CampoFormulario.vue"
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";

const router = useRouter()
const storageKey = 'listaPorc'

const formData = ref({
  nif: '',
  passw: '',
  origen: '',
  destino: '',
  especie: '02',
  accio: 'no',
  moviment: '',
  categoria: '',
  fechaSalida: '',
  fechaLlegada: '',
  mobilitat: 'no',
  nombreTransportista: '',
  medioTransporte: '',
  matricula: '',
  nifConductor: '',
  sirCode: ''
})

const totalAnimals = ref(0)
const errores = ref({})

onMounted(() => {
  const userCookie = Cookies.get('usuario_logeado')
  if (!userCookie) return router.replace('/login')

  const animalesGuardados = JSON.parse(localStorage.getItem(storageKey)) || []
  totalAnimals.value = animalesGuardados.length
})

// --- FUNCIONES DE VALIDACION ---

function validarNif() {
  if (formData.value.nif.trim() === "") {
    errores.value.nif = "Dni no correcto";
    return false;
  }
  return true;
}

function validarPasswd() {
  if (formData.value.passw.trim() === "") {
    errores.value.passw = "Clave de paso incorrecta";
    return false;
  }
  return true;
}

function validarEspecie() {
  if (formData.value.especie !== "02") {
    errores.value.especie = "La especie ha de ser 02";
    return false;
  }
  return true;
}

function validarOrigenDestino() {
  let ok = true;
  if (formData.value.origen.trim() === "") {
    errores.value.origen = "La explotacion de sortida no puede estar vacia"; ok = false;
  }
  if (formData.value.origen.length > 14) {
    errores.value.origen = "No puede ser más grande de 14 caracteres";
    ok = false;
  }
  if (formData.value.origen === formData.value.destino && formData.value.origen !== "") {
    errores.value.origen = "Explotacion de origen y destino son iguales";
    ok = false;
  }
  return ok;
}

function validarMoviment() {
  if (formData.value.moviment !== "01" && formData.value.moviment !== "02") {
    errores.value.moviment = "El tipo de movimiento ha de ser 01 o 02";
    return false;
  }
  return true;
}

function validarFechas() {
  const hoy = new Date().setHours(0, 0, 0, 0);
  const fSalida = new Date(formData.value.fechaSalida);
  const fArribada = new Date(formData.value.fechaLlegada);
  let ok = true;

  if (!formData.value.fechaSalida || fSalida < hoy) {
    errores.value.fechaSalida = "La fecha ha de ser mas grande que la actual"; ok = false;
  }
  if (!formData.value.fechaLlegada || fArribada <= fSalida) {
    errores.value.fechaLlegada = "La fecha de llegada ha de ser mayor que la de salida";
    ok = false;
  }
  return ok;
}

function validarTransporte() {
  let ok = true;
  if (formData.value.nombreTransportista.trim() === "") {
    errores.value.nombreTransportista = "El nombre no puede estar vacio"; ok = false;
  }
  if (formData.value.matricula.length > 10 || formData.value.matricula === "") {
    errores.value.matricula = "Matrícula no válida o vacía";
    ok = false;
  }
  if (formData.value.sirCode.toString().length > 15 || formData.value.sirCode === "") {
    errores.value.sirCode = "SIRCODE no válido o vacío";
    ok = false;
  }
  return ok;
}

function validarAnimals() {
  if (totalAnimals.value <= 0) {
    errores.value.animals = "El numero de animales ha de ser mas grande que 0";
    return false;
  }
  return true;
}

// --- MANEJADOR DEL BOTÓN ENVIAR ---

const handleSubmit = () => {
  errores.value = {}; // Resetear errores al inicio (como hacías al principio del click)

  // Ejecutamos todas igual que en tu jQuery
  const v1 = validarNif();
  const v2 = validarPasswd();
  const v3 = validarEspecie();
  const v4 = validarOrigenDestino();
  const v5 = validarMoviment();
  const v6 = validarFechas();
  const v7 = validarTransporte();
  const v8 = validarAnimals();

  if (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8) {
    /*
    const listado = {
      ...formData.value,
      numAnimals: totalAnimals.value,
      animales: JSON.parse(localStorage.getItem(storageKey)) || []
    };*/

    localStorage.setItem("listadoEnviadoPorc", JSON.stringify(listado));
    alert("¡Formulario enviado!");
    localStorage.removeItem(storageKey);
    router.push('/home');
  } else {
    alert("Revisa los campos marcados en amarillo");
  }
}
</script>

<template>
  <div class="bg-light min-vh-100 d-flex flex-column">
    <Navbar />

    <main class="container py-4 flex-grow-1">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">

          <TitleAndSubtitle
              divClass="mb-4 border-bottom border-secondary border-opacity-50 pb-3"
              subtitle="Porcí - Control de Lots"
              title="Registre de Tramesa"
              titleClass="display-5 fw-bolder text-success"
          />

          <form class="row g-3 p-4 p-md-5 border border-secondary border-opacity-22 rounded-4 bg-success bg-opacity-22 shadow text-white"
                @submit.prevent="handleSubmit">

            <campo-formulario v-model="formData.nif" :error="errores.nif" div-class="col-md-6" label="NIF:"/>
            <campo-formulario v-model="formData.passw" :error="errores.passw" div-class="col-md-6"
                              label="CONTRASENYA MOVILITAT:" type="password"/>

            <campo-formulario v-model="formData.origen" :error="errores.origen" div-class="col-md-6"
                              label="CODI EXPLOTACIÓ ORIGEN:"/>
            <campo-formulario v-model="formData.destino" :error="errores.destino" div-class="col-md-6"
                              label="CODI EXPLOTACIÓ DESTINACIÓ:"/>

            <campo-formulario v-model="formData.especie" :error="errores.especie" div-class="col-md-3"
                              label="ESPÈCIE:"/>
            <campo-formulario v-model="formData.accio" :error="errores.accio" div-class="col-md-3" label="ACCIÓ:"/>
            <campo-formulario v-model="formData.moviment" :error="errores.moviment" div-class="col-md-3"
                              label="MOVIMENT:"/>

            <div class="col-md-3">
              <label class="form-label fw-bold text-light small">CODI CATEGORIA:</label>
              <select v-model="formData.categoria" :class="{'is-invalid': errores.categoria}"
                      class="form-select bg-light text-dark border-secondary h-auto py-2">
                <option disabled value="">Selecciona uno</option>
                <option value="Engreix">Engreix</option>
                <option value="Garrins">Garrins</option>
                <option value="Recria/Transicio">Recria/Transicio</option>
                <option value="Femelles reproductores">Femelles reproductores</option>
                <option value="Reposicio">Reposicio</option>
                <option value="Sementals">Sementals</option>
              </select>
              <div v-if="errores.categoria" class="yellow-error">{{ errores.categoria }}</div>
            </div>

            <campo-formulario v-model="formData.fechaSalida" :error="errores.fechaSalida" div-class="col-md-6" label="DATA SORTIDA:"
                              type="date"/>
            <campo-formulario v-model="formData.fechaLlegada" :error="errores.fechaLlegada" div-class="col-md-6" label="DATA ARRIBADA:"
                              type="date"/>

            <div class="col-md-6">
              <label class="form-label fw-bold text-light small d-block">MOBILITAT (SI/NO)</label>
              <div class="btn-group w-100">
                <input id="si" v-model="formData.mobilitat" class="btn-check" type="radio" value="si">
                <label class="btn btn-outline-light fw-bold" for="si">SÍ</label>
                <input id="no" v-model="formData.mobilitat" class="btn-check" type="radio" value="no">
                <label class="btn btn-outline-light fw-bold" for="no">NO</label>
              </div>
            </div>

            <div class="col-12 mt-4 border-top border-secondary border-opacity-25 pt-3">
              <h5 class="text-light fw-bold">Dades del Transport</h5>
            </div>

            <campo-formulario v-model="formData.nombreTransportista" :error="errores.nombreTransportista" div-class="col-md-6"
                              label="NOM TRANSPORTISTA:"/>

            <div class="col-md-6">
              <label class="form-label fw-bold text-light small">MITJÀ DE TRANSPORT:</label>
              <select v-model="formData.medioTransporte"
                      class="form-select bg-light text-dark border-secondary h-auto py-2">
                <option disabled value="">Selecciona uno</option>
                <option value="Camion">Camión</option>
                <option value="Avion">Avión</option>
                <option value="Tren">Tren</option>
                <option value="Conduccion a pie">Conducción a pie</option>
                <option value="Barco">Barco</option>
                <option value="Otros">Otros</option>
              </select>
            </div>

            <campo-formulario
                v-model="formData.matricula"
                :error="errores.matricula"
                div-class="col-md-6"
                label="MATRÍCULA:"/>

            <campo-formulario
                v-model="formData.nif"
nif                :error="errores.nif"
                div-class="col-md-6"
                label="NIF CONDUCTOR:"/>

            <campo-formulario
                v-model="formData.sirCode"
                :error="errores.sirCode"
                div-class="col-md-6" label="SIRCODE:"
                type="number"/>

            <div class="col-md-6">
              <div
                  class="p-3 bg-black bg-opacity-25 rounded-3 border border-light border-opacity-50 h-100 d-flex flex-column justify-content-center">
                <label class="form-label fw-bold text-light small text-uppercase mb-0">Número de animals:</label>
                <div class="text-white fw-bolder display-5">{{ totalAnimals }}</div>
                <div v-if="errores.animals" class="yellow-error mt-1">⚠️ {{ errores.animals }}</div>
              </div>
            </div>

            <div class="col-12 d-flex gap-3 py-4">
              <button class="btn btn-danger btn-lg flex-grow-1 fw-bold" type="button" @click="router.back()">CANCELAR
              </button>
              <button class="btn btn-primary btn-lg flex-grow-1 fw-bold shadow" type="submit">ENVIAR</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Color Amarillo Ámbar: Resalta sobre el verde sin molestar la vista */
.yellow-error {
  color: #ffca2c;
  font-size: 0.85rem;
  font-weight: bold;
}

/* Forzamos que los componentes hijos (CampoFormulario) también usen amarillo */
:deep(.invalid-feedback) {
  color: #ffca2c !important;
  display: block;
}

/* Cambia el color del borde del input a amarillo cuando es inválido */
:deep(.is-invalid) {
  border-color: #ffca2c !important;
  box-shadow: 0 0 0 0.25rem rgba(255, 202, 44, 0.25) !important;
}

/* Estilo para que el select de Bootstrap use el mismo amarillo en caso de error */
.form-select.is-invalid {
  border-color: #ffca2c !important;
}

.display-5 {
  font-size: 2.5rem;
  line-height: 1;
}
</style>
