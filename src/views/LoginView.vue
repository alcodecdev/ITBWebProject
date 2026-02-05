<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from "axios";
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Footer from "@/components/layout/Footer.vue";
import CampoFormulario from "@/components/CampoFormulario.vue";
import '../assets/styles/coloursAndAnimation.css'
import Cookies from 'js-cookie';


const router = useRouter()
const username = ref('')
const password = ref('')
const CodiMO = ref('')
const errorMsg = ref('')
const showError = ref(false)
const handleLogin = async () => {
  showError.value = false;
  errorMsg.value = "";

  const peticion = {
    // Usamos .trim() para evitar errores por espacios invisibles al copiar/pegar
    nif: username.value,
    password: password.value,
    tipusEspecie: "02",
    tipusAccio: "NO",
    tipusMoviment: "01",
    explotacioSortida: CodiMO.value,
    explotacioEntrada: "1000AM",
    codiCategoria: "01",
    numAnimals: "200",
    dataSortida: "202605221303",
    dataArribada: "202605231630",
    codiSirentra: "0123456789ABCD",
    mitjaTransport: "01",
    matricula: "0123456789",
    nifConductor: "01234567B",
    mobilitat: "SI"
  };

  try {
    const url = 'https://preproduccio.aplicacions.agricultura.gencat.cat/gtr/WSAltaguies/AppJava/WSAltaGuia';

    console.log("Enviando petición...", peticion);
    const response = await axios.put(url, peticion);

    // --- PASO CRUCIAL ---
    // Si el servidor responde 200 OK, creamos la cookie para que el Router nos deje pasar
    Cookies.set('usuario_logeado', 'true', { expires: 1, path: '/' });

    // Navegamos a home
    await router.replace("/home");

  }  catch (error) {
  console.error("Error completo capturado:", error);

  // 1. Verificamos que el servidor haya respondido con datos
  if (error.response && error.response.data && error.response.data.descripcio) {
    const erroresRecibidos = error.response.data.descripcio;
    console.log("Mensajes del servidor:", erroresRecibidos);

    let esErrorGrave = false;
    // Lista de fallos que bloquean el acceso
    const fallosProhibidos = ["Error 14", "Error 26", "Error 27", "Error 28", "Error 29", "Error 32", "Error 33", "Error 35", "Error 36", "Error 400"];

    // 2. Comprobamos los errores uno por uno
    for (let e of erroresRecibidos) {
      if (fallosProhibidos.some(f => e.includes(f))) {
        esErrorGrave = true;
        break;
      }
    }

    if (esErrorGrave) {
      console.log("Bloqueando acceso por error grave.");
      errorMsg.value = "NIF, Contrasenya o Codi MO incorrectes";
      showError.value = true;
    } else {
      console.log("Error no grave detectado, permitiendo entrada.");
      Cookies.set('usuario_logeado', 'true', { expires: 1, path: '/' });
      router.replace("/home");
    }
  } else {
    // 3. Si no hay respuesta clara del servidor o es un error de red
    console.log("Error sin descripción o de red.");
    errorMsg.value = "Error de connexió o validació genèrica";
    showError.value = true;
  }
}
}
</script>
<template>
  <div class="min-vh-100 d-flex flex-column w-100">

    <div class="container d-flex flex-grow-1 align-items-center justify-content-center py-5">
      <div class="row justify-content-center w-100">
        <div class="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">

          <TitleAndSubtitle
              class="textoOscuro"
              divClass="text-start mb-4"
              title="GTR Login"
              subtitle="Inici de sessió"
              titleClass="display-3 fw-bolder"
              subtitleClass="h5  text-uppercase tracking-wider"
          />

          <div class="p-4 p-md-5 border border-secondary border-opacity-25 rounded-4 shadow" id="formLogin">
            <form @submit.prevent="handleLogin" class="formulario">


              <CampoFormulario class="text-light"
                  divClass="mb-4"
                  id="user"
                  label="NIF"
                  labelClass="form-label fw-bold text-light small"
                  inputClass="form-control form-control-lg bg-light text-dark border-secondary"
                  placeholder="Nombre de usuario"
                  v-model="username"
              />


              <CampoFormulario class="text-light"
                  divClass="mb-3"
                  id="password"
                  type="password"
                  label="Contrasenya"
                  labelClass="form-label fw-bold text-light small"
                  placeholder="Contraseña"
                  inputClass="form-control form-control-lg bg-light text-dark border-secondary"
                  v-model="password"

              />

              <CampoFormulario class="text-light"
                               divClass="mb-5"
                               id="mo"
                               type="password"
                               label="Codi MO"
                               labelClass="form-label fw-bold text-light small"
                               placeholder="Contraseña"
                               inputClass="form-control form-control-lg bg-light text-dark border-secondary"
                               v-model="CodiMO"

              />

              <button type="submit" id="loginButton" class="btn btn-light btn-lg w-100 fw-bold py-3 shadow-sm">
                Iniciar Sesión
              </button>



            </form>

            <div v-if="showError" class="alert alert-danger mt-4 py-2 text-center small fw-bold">
              {{ errorMsg }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
body, html {
  margin: 0;
  padding: 0;
  background-color: #f8f9fa !important;
}
</style>