<script setup>
import { ref } from 'vue'
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Footer from "@/components/layout/Footer.vue";
import CampoFormulario from "@/components/CampoFormulario.vue";
import '../assets/styles/coloursAndAnimation.css'
import router from "@/router/index.js";
let showError = ref(false);
const nif = ref("");
const password = ref("");
const mobilitat = ref("");
let errorMsg = ref("")

const errores = ref([]); // array que contendrá todos los errores

const ERRORES = {
  nif: ["Error 14", "Error 26"],
  password: ["Error 27", "Error 28", "Error 29"],
  mobilitat: ["Error 32", "Error 33", "Error 35", "Error 36"]
};

async function handleLogin() {
  try {
    const datos = {
      nif: nif.value,
      password: password.value,
      tipusEspecie: "02",
      tipusAccio:  "NO",
      tipusMoviment: "01",
      explotacioEntrada:"1000AM",
      explotacioSortida: mobilitat.value,
      codiCategoria:  "01",
      numAnimals: "200",
      dataSortida: "202601221303",
      dataArribada: "002601231630",
      codiSirentra: "0123456789ABCD",
      mitjaTransport: "01",
      matricula: "0123456789",
      nifConductor:  "01234567B",
      mobilitat: "SI"
    }


    const response = await fetch(`https://preproduccio.aplicacions.agricultura.gencat.cat/gtr/WSAltaguies/AppJava/WSAltaGuia`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    if (!response.ok) {
      errores.value = []; // limpiar errores previos
      errores.value.push(`Datos invalidos`);
    }

    if (response.ok) {
      try {
        const responseText = await response.text();
        const apiResponse = JSON.parse(responseText);

        console.log(apiResponse);

        errores.value = []; // limpiar errores previos
        errorMsg.value = "";

        const mensajes = apiResponse.descripcio || [];

        // Clasifico los errores
        for (const msg of mensajes) {
          if (ERRORES.nif.some(code => msg.startsWith(code))) {
            errores.value.push(`NIF: ${msg}`);
          } else if (ERRORES.password.some(code => msg.startsWith(code))) {
            errores.value.push(`Contraseña: ${msg}`);
          } else if (ERRORES.mobilitat.some(code => msg.startsWith(code))) {
            errores.value.push(`Mobilitat: ${msg}`);
          }
        }

        if (errores.value.length === 0) {
        await router.replace("/home")
        }
        else {

          showError.value = true;
          errorMsg.value = `${errores.value}`
        }

      } catch (error) {
        console.error("Failed to parse response:", error);
      }
    }

  } catch (error) {
    console.error("Error completo:", error);

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
                  v-model="nif"
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
                               v-model="mobilitat"

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