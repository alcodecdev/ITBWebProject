<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie' // Importamos la librería
import Navbar from "@/components/layout/Navbar.vue"
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue"
import Button from "@/components/Button.vue"
import CampoFormulario from "@/components/CampoFormulario.vue";

const router = useRouter()
const nombreOperario = ref('')

// Referencias para los campos del formulario
const destino = ref('')
const observaciones = ref('')
const errorMsg = ref('')

onMounted(() => {
  // 1. VALIDACIÓN DE SEGURIDAD CON COOKIES
  const userCookie = Cookies.get('usuario_logeado')

  if (userCookie) {
    const usuario = JSON.parse(userCookie)
    nombreOperario.value = usuario.nombre
  } else {
    // Si no hay cookie, redirigimos al login inmediatamente
    router.replace('/login')
  }
})

const handleSubmit = () => {
  if (!destino.value.trim()) {
    errorMsg.value = "El campo destino es obligatorio"
    return
  }
  // Aquí iría tu lógica de envío (API)

  // Limpiar lista de escaneo tras envío exitoso si es necesario
  localStorage.removeItem('listaPorc')
  router.push('/home')
}
</script>
<template>
  <navbar></navbar>
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

      <form id="formEnvio" @submit.prevent="handleSubmit" class="row g-3 p-4 p-md-5 border border-secondary border-opacity-22 rounded-4 bg-success bg-opacity-22 shadow">
        <campo-formulario
            type="text"
            label="NIF"
            placeholder="12345678X"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
        ></campo-formulario>

        <campo-formulario
            type="password"
            label="CONTRASENYA MOVILITAT:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
        ></campo-formulario>

        <campo-formulario
            type="text"
            label="CODI EXPLOTACIÓ ORIGEN:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
        ></campo-formulario>

        <campo-formulario
            type="text"
            label="CODI EXPLOTACIÓ DESTINACIÓ:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
        ></campo-formulario>

        <campo-formulario
            type="text"
            label="ESPÈCIE:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
        ></campo-formulario>

        <campo-formulario
            type="text"
            label="ACCIÓ:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
        ></campo-formulario>

        <campo-formulario
            type="text"
            label="MOVIMENT:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
        ></campo-formulario>

        <div class="col-md-3">
          <label class="form-label fw-bold text-light  small" for="inputCategoria">CODI CATEGORIA:</label>
          <select class="form-select bg-light text-dark border-secondary" id="inputCategoria" required>
            <option selected disabled value="">Selecciona uno</option>
            <option value="Engreix">Engreix</option>
            <option value="Garrins">Garrins</option>
            <option value="Recria/Transicio">Recria/Transicio</option>
            <option value="Femelles reproductores">Femelles reproductores</option>
            <option value="Reposicio">Reposicio</option>
            <option value="Sementals">Sementals</option>
          </select>
          <div id="errorCategoria" class="text-danger small fw-bold"></div>
        </div>

        <campo-formulario
            type="date"
            label="DATA SORTIDA:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"

        ></campo-formulario>

        <campo-formulario
            type="date"
            label="DATA ARRIBADA:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
        ></campo-formulario>

        <div class="col-md-6">
          <label class="form-label fw-bold text-light  small d-block">MOBILITAT (SI/NO)</label>
          <div class="btn-group w-100" role="group">
            <input type="radio" class="btn-check" name="mobilitat" id="siMobilitat" value="si" required>
            <label class="btn btn-outline-light fw-bold" for="siMobilitat">SÍ</label>
            <input type="radio" class="btn-check" name="mobilitat" id="noMobilitat" value="no" checked required>
            <label class="btn btn-outline-light fw-bold" for="noMobilitat">NO</label>
          </div>
        </div>

        <div class="col-12">
          <h5 class="mt-4 text-light  fw-bold border-top border-secondary border-opacity-25 pt-3">Dades del Transport</h5>
        </div>

        <campo-formulario
            type="text"
            label="NOM TRANSPORTISTA"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
        ></campo-formulario>

        <div class="col-md-6">
          <label class="form-label fw-bold text-light  small">MITJÀ DE TRANSPORT:</label>
          <select class="form-select bg-light text-dark border-secondary" id="selectMedioTransporte" required>
            <option selected disabled value="">Selecciona uno</option>
            <option value="Camion">Camión</option>
            <option value="Avion">Avion</option>
            <option value="Tren">Tren</option>
            <option value="Conduccion a pie">Conduccion a pie</option>
            <option value="Barco">Barco</option>
            <option value="Otros">Otros</option>
          </select>
        </div>


        <campo-formulario
            type="text"
            label="MATRÍCULA:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
        ></campo-formulario>

        <campo-formulario
            type="text"
            label="NIF CONDUCTOR:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
        ></campo-formulario>

        <campo-formulario
            type="text"
            label="NÚMERO DE ANIMALES:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
        ></campo-formulario>

        <campo-formulario
            type="number"
            label="SIRCODE:"
            placeholder="12345678"
            label-class="form-label fw-bold text-light  small"
            input-class="form-control bg-light text-dark border-secondary"
            div-error-class="text-danger small fw-bold"
            divClass="col-md-6"
        >
        </campo-formulario>


        <div class="col-12 d-flex flex-column flex-md-row gap-3 py-4 mt-3 border-top border-secondary border-opacity-25">

            <Button
                @click="router.back()"
                type="button"
                clase="btn btn-outline-danger btn-lg flex-grow-1 fw-bold bg-danger text-light"
                nombreSpan="CANCELAR"
            />

            <Button
                type="submit"
                clase="btn btn-success btn-lg flex-grow-1 fw-bold bg-primary"
                nombreSpan="REGISTRAR TRAMESA"
            />



          </div>











      </form>

    </div>
  </div>



</template>

<style scoped>

</style>