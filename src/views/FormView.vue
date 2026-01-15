<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import Navbar from "@/components/layout/Navbar.vue"
import Footer from "@/components/layout/Footer.vue"
import CampoFormulario from "@/components/CampoFormulario.vue"
import Button from "@/components/Button.vue";

const router = useRouter()
const storageKey = 'listaPorc'

const formData = ref({
  nif: '', passw: '', origen: '', destino: '',
  especie: '', accio: '', moviment: '', categoria: '',
  fechaSalida: '', fechaLlegada: '', mobilitat: 'no',
  nombreTransportista: '', medioTransporte: '',
  matricula: '', nifConductor: '', sirCode: ''
})

const totalAnimals = ref(0)
const errores = ref({}) // Aquí se guardarán los mensajes que verás en amarillo

onMounted(() => {
  const userCookie = Cookies.get('usuario_logeado')
  if (!userCookie) return router.replace('/login')

  const animalesGuardados = JSON.parse(localStorage.getItem(storageKey)) || []
  totalAnimals.value = animalesGuardados.length
})

// --- TUS FUNCIONES DE VALIDACIÓN TRADUCIDAS A VUE ---
const validarTodo = () => {
  errores.value = {} // Limpiar errores previos
  let ok = true

  // NIF
  if (formData.value.nif.trim() === "") {
    errores.value.nif = "Usuario no encontrado"; ok = false;
  }

  // Passw
  if (formData.value.passw.trim() === "") {
    errores.value.passw = "Clave de paso incorrecta"; ok = false;
  }

  // Especie (Máximo 2 dígitos y ha de ser 02)
  if (formData.value.especie.length > 2 || isNaN(formData.value.especie) || formData.value.especie !== "02") {
    errores.value.especie = "La especie ha de ser 02"; ok = false;
  }

  // Origen y Destino
  if (formData.value.origen.trim() === "") {
    errores.value.origen = "La explotacion de sortida no puede estar vacia"; ok = false;
  } else if (formData.value.origen.length > 14) {
    errores.value.origen = "Máximo 14 caracteres"; ok = false;
  } else if (formData.value.origen === formData.value.destino) {
    errores.value.origen = "Origen y destino son iguales"; ok = false;
  }

  if (formData.value.destino.trim() === "") {
    errores.value.destino = "La explotacion de entrada no puede estar vacia"; ok = false;
  }

  // Acció (Ha de ser "no")
  if (formData.value.accio.toLowerCase() !== "no") {
    errores.value.accio = "Tipos de accion ha de ser no"; ok = false;
  }

  // Moviment (01 o 02)
  if (formData.value.moviment !== "01" && formData.value.moviment !== "02") {
    errores.value.moviment = "Ha de ser 01 o 02"; ok = false;
  }

  // Categoria
  if (!formData.value.categoria) {
    errores.value.categoria = "Debes seleccionar una categoría"; ok = false;
  }

  // Fechas (Lógica exacta de tu JS)
  const hoy = new Date().setHours(0,0,0,0)
  const fSalida = new Date(formData.value.fechaSalida)
  const fArribada = new Date(formData.value.fechaLlegada)

  if (!formData.value.fechaSalida || fSalida < hoy) {
    errores.value.fechaSalida = "La fecha ha de ser mas grande que la actual"; ok = false;
  }
  if (!formData.value.fechaLlegada || fArribada <= fSalida) {
    errores.value.fechaLlegada = "Ha de ser mayor que la de salida"; ok = false;
  }

  // Transportista
  if (formData.value.nombreTransportista.trim() === "") {
    errores.value.nombreTransportista = "El nombre no puede estar vacio"; ok = false;
  }

  // Matrícula
  if (formData.value.matricula.trim() === "" || formData.value.matricula.length > 10) {
    errores.value.matricula = "Matrícula vacía o mayor a 10"; ok = false;
  }

  // SIRCODE
  if (formData.value.sirCode.toString().length > 15 || formData.value.sirCode === "") {
    errores.value.sirCode = "Código Sircode incorrecto"; ok = false;
  }

  // Animals
  if (totalAnimals.value <= 0) {
    errores.value.animals = "El numero de animales ha de ser mas grande que 0"; ok = false;
  }

  return ok
}

const handleSubmit = () => {
  if (validarTodo()) {
    /*ENviar API
    const listadoFinal = {
      ...formData.value,
      numAnimals: totalAnimals.value,
      animales: JSON.parse(localStorage.getItem(storageKey)) || []
    }*/
    localStorage.setItem("listadoEnviadoPorc", JSON.stringify(listadoFinal));
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
      <form @submit.prevent="handleSubmit" class="row g-3 p-4 p-md-5 border border-secondary border-opacity-22 rounded-4 bg-success bg-opacity-22 shadow text-white">

        <campo-formulario v-model="formData.nif" label="NIF:" div-class="col-md-6" :error="errores.nif" />
        <campo-formulario v-model="formData.passw" type="password" label="CONTRASENYA MOVILITAT:" div-class="col-md-6" :error="errores.passw" />

        <campo-formulario v-model="formData.origen" label="CODI EXPLOTACIÓ ORIGEN:" div-class="col-md-6" :error="errores.origen" />
        <campo-formulario v-model="formData.destino" label="CODI EXPLOTACIÓ DESTINACIÓ:" div-class="col-md-6" :error="errores.destino" />

        <campo-formulario v-model="formData.especie" label="ESPÈCIE (02):" div-class="col-md-3" :error="errores.especie" />
        <campo-formulario v-model="formData.accio" label="ACCIÓ (no):" div-class="col-md-3" :error="errores.accio" />
        <campo-formulario v-model="formData.moviment" label="MOVIMENT (01/02):" div-class="col-md-3" :error="errores.moviment" />

        <div class="col-md-3">
          <label class="form-label fw-bold text-light small">CODI CATEGORIA:</label>
          <select v-model="formData.categoria" :class="{'is-invalid': errores.categoria}" class="form-select bg-light text-dark border-secondary">
            <option value="" disabled>Selecciona uno</option>
            <option value="Engreix">Engreix</option>
            <option value="Garrins">Garrins</option>
          </select>
          <div v-if="errores.categoria" class="yellow-error">{{ errores.categoria }}</div>
        </div>

        <campo-formulario v-model="formData.fechaSalida" type="date" label="DATA SORTIDA:" div-class="col-md-6" :error="errores.fechaSalida" />
        <campo-formulario v-model="formData.fechaLlegada" type="date" label="DATA ARRIBADA:" div-class="col-md-6" :error="errores.fechaLlegada" />

        <campo-formulario v-model="formData.nombreTransportista" label="NOM TRANSPORTISTA:" div-class="col-md-6" :error="errores.nombreTransportista" />
        <campo-formulario v-model="formData.matricula" label="MATRÍCULA:" div-class="col-md-6" :error="errores.matricula" />
        <campo-formulario v-model="formData.sirCode" label="SIRCODE:" div-class="col-md-6" :error="errores.sirCode" />

        <div class="col-md-6 mt-3">
          <div class="p-3 bg-black bg-opacity-25 rounded-3 border border-light border-opacity-50">
            <label class="form-label fw-bold text-light small">NÚMERO DE ANIMALES:</label>
            <div class="display-6 fw-bold text-white">{{ totalAnimals }}</div>
            <div v-if="errores.animals" class="yellow-error mt-1">⚠️ {{ errores.animals }}</div>
          </div>
        </div>

        <div class="col-12 d-flex gap-3 py-4">
          <Button type="button" @click="router.back" clase="btn btn-danger btn-lg flex-grow-1 fw-bold" nombreSpan="CANCELAR"/>
          <Button type="submit" clase="btn btn-primary btn-lg flex-grow-1 fw-bold shadow" nombreSpan="ENVIAR"/>
        </div>
      </form>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
/* Color Amarillo para que resalte sobre el verde de Bootstrap */
.yellow-error {
  color: #ffca2c;
  font-size: 0.85rem;
  font-weight: bold;
  margin-top: 5px;
}

/* Forzamos a Bootstrap a usar el amarillo en el borde cuando hay error */
:deep(.is-invalid) {
  border-color: #ffca2c !important;
  background-image: none !important;
}

</style>
