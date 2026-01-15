<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie' // Importamos la librería
import CampoFormulario from "@/components/CampoFormulario.vue";
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Footer from "@/components/layout/Footer.vue";

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMsg = ref('')
const showError = ref(false)
const usuarios = ref([])

onMounted(() => {
  // Seguimos leyendo usuarios de LocalStorage
  usuarios.value = JSON.parse(localStorage.getItem("usuarios")) || []
})

const handleLogin = () => {
  showError.value = false

  if (!username.value.trim() || !password.value.trim()) {
    errorMsg.value = "Todos los campos son obligatorios"
    showError.value = true
    return
  }

  const usuarioValido = usuarios.value.find(
      u => u.nombre === username.value.trim() && u.password === password.value.trim()
  )

  if (usuarioValido) {
    // GUARDAR SESIÓN CON COOKIES
    // 'expires: 1' significa que la cookie expirará en 1 día
    // Convertimos el objeto a String porque las cookies solo guardan texto
    Cookies.set('usuario_logeado', JSON.stringify(usuarioValido), { expires: 1 })

    router.replace('/home')
  } else {
    errorMsg.value = "Usuario o contraseña incorrectos"
    showError.value = true
  }
}
</script>

<template>
  <div class="min-vh-100 d-flex flex-column w-100">

    <div class="container d-flex flex-grow-1 align-items-center justify-content-center py-5">
      <div class="row justify-content-center w-100">
        <div class="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">

          <TitleAndSubtitle
              divClass="text-center mb-5"
              title="GTR"
              subtitle="Gestion de envio"
              titleClass="display-3 fw-bolder text-success"
              subtitleClass="h5 text-success text-uppercase tracking-wider"
          />

          <div class="p-4 p-md-5 border border-secondary border-opacity-25 rounded-4 bg-success bg-opacity-22 shadow">
            <form @submit.prevent="handleLogin">

              <div class="mb-4">
                <label for="inputName" class="form-label fw-bold text-light small">Usuario</label>
                <input
                    v-model="username"
                    type="text"
                    class="form-control form-control-lg bg-light text-dark border-secondary"
                    id="inputName"
                    placeholder="Nombre de usuario"
                    autocomplete="username"
                >
              </div>

              <div class="mb-5">
                <label for="inputPassword1" class="form-label fw-bold text-light small">Contraseña</label>
                <input
                    v-model="password"
                    type="password"
                    class="form-control form-control-lg bg-light text-dark border-secondary"
                    id="inputPassword1"
                    placeholder="Contraseña"
                    autocomplete="current-password"
                >
              </div>

              <button type="submit" class="btn btn-light btn-lg w-100 fw-bold py-3 shadow-sm">
                Iniciar Sesión
              </button>
            </form>

            <div v-if="showError" class="alert alert-danger mt-4 py-2 text-center small fw-bold">
              {{ errorMsg }}
            </div>
          </div>

          <div class="text-center mt-5">
            <p class="text-light-emphasis">
              ¿No estas registrado?
              <router-link to="/register" class="text-dark text-decoration-none fw-bold border-bottom border-light">
                Registrate aquí
              </router-link>
            </p>
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