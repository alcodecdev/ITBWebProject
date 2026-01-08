<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

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

  // Buscar usuario válido (Tu misma lógica pero con .value)
  const usuarioValido = usuarios.value.find(
      u => u.nombre === username.value.trim() && u.password === password.value.trim()
  )

  if (usuarioValido) {
    // Guardamos la sesión (opcional para el router)
    localStorage.setItem('usuario_logeado', JSON.stringify(usuarioValido))

    // REDIRECCIÓN VUE (Equivalente a window.location.replace)
    router.replace('/scanner')
  } else {
    errorMsg.value = "Usuario o contraseña incorrectos"
    showError.value = true
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">

        <div class="text-center mb-5">
          <h1 class="display-3 fw-bolder text-light">ITB</h1>
          <p class="h5 text-secondary text-uppercase tracking-wider">Gestion de envio</p>
        </div>

        <div class="p-4 p-md-5 border border-secondary border-opacity-25 rounded-4 bg-black bg-opacity-25 shadow">
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
          <p class="text-secondary">
            ¿No estas registrado?
            <router-link to="/register" class="text-light text-decoration-none fw-bold border-bottom border-light">
              Registrate aquí
            </router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>