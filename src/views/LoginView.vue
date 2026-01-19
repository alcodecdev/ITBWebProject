<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
//import CampoFormulario from "@/components/CampoFormulario.vue";
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import { auth } from "@/firebase"
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
//import router from "@/router/index.js";

const router = useRouter();
const provider = new GoogleAuthProvider();
const user = ref(null);
const initialized = ref(false); // Para controlar cuando Firebase ha cargado la sesión

// Escuchar cambios de sesión para actualizar la UI y redirigir
onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;
  initialized.value = true; // Ya se cargó la sesión

  if (currentUser) {
    router.replace("/home"); // Redirige automáticamente si hay sesión
  }
});

const login = async () => {
  try {
    // Cerrar sesión anterior si existe
    if (auth.currentUser) {
      await signOut(auth);
    }

    // Login con Google
    const result = await signInWithPopup(auth, provider);

    // El usuario ya queda logueado en Firebase; redirección manejada en onAuthStateChanged
    console.log("Usuario logueado:", result.user);

  } catch (error) {
    alert(error.message);
    console.error("Firebase error:", error.code);
    console.error(error.message);
  }
}

/* Código comentado existente para login local con username/password
const router = useRouter()


const username = ref('')
const password = ref('')
const errorMsg = ref('')
const showError = ref(false)
const usuarios = ref([])

//leemos los usuarios de LocalStorage
onMounted(() => {
  usuarios.value = JSON.parse(localStorage.getItem("usuarios")) || []
})

const handleLogin = () => {
  showError.value = false

  // Validaciones
  if (!username.value.trim() || !password.value.trim()) {
    errorMsg.value = "Todos los campos son obligatorios"
    showError.value = true
    return
  }

  // Buscar usuario válido
  const usuarioValido = usuarios.value.find(
      u => u.nombre === username.value.trim() && u.password === password.value.trim()
  )

  if (usuarioValido) {
    // Guardamos la sesión (opcional para el router)
    localStorage.setItem('usuario_logeado', JSON.stringify(usuarioValido))

    // REDIRECCIÓN VUE (Equivalente a window.location.replace)
    router.replace('/home')
  } else {
    errorMsg.value = "Usuario o contraseña incorrectos"
    showError.value = true
  }

}
*/
</script>

<template>

  <div class="min-vh-100 d-flex align-items-center justify-content-center w-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">

          <TitleAndSubtitle
              divClass="text-center mb-5"
              title="GTR"
              subtitle="Gestion de envio"
              titleClass="display-3 fw-bolder text-success"
              subtitleClass="h5 text-success text-uppercase tracking-wider"
          />

          <!--
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

              -->

          <!-- Botón login con Google -->
          <div v-if="initialized" class="mt-3">
            <button @click.prevent="login"
                    class="btn w-100 fw-bold py-2 shadow-sm"
                    style="background-color: #fff; color: #000; border: 1px solid #ccc;">
              Login con Google
            </button>
          </div>
          <div v-else class="mt-3 text-center">
            Cargando...
          </div>
          <!--
            </form>
          -->
          <div v-if="showError" class="alert alert-danger mt-4 py-2 text-center small fw-bold">
            {{ errorMsg }}
          </div>
        </div>

        <!--
        <div class="text-center mt-5">
          <p class="text-light-emphasis">
            ¿No estas registrado?
            <router-link to="/register" class="text-dark text-decoration-none fw-bold border-bottom border-light">
              Registrate aquí
            </router-link>
          </p>
        </div>
        -->

      </div>
    </div>
  </div>
  <!--</div>-->

</template>

<style>
body, html {
  margin: 0;
  padding: 0;
  background-color: #f8f9fa !important;
}
</style>