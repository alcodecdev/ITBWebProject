<script setup>
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie' // Importamos la librería para gestionar la sesión

const router = useRouter()

const props = defineProps({
  rutaVolver: {
    type: String,
    default: ''
  }
})

const irAtras = () => {
  if (props.rutaVolver) {
    router.push(props.rutaVolver)
  } else {
    router.back()
  }
}

const handleLogout = () => {
  // 1. Borramos la cookie de sesión (Esencial)
  Cookies.remove('usuario_logeado')

  // 2. Limpiamos cualquier rastro sobrante en localStorage por seguridad
  localStorage.removeItem('usuario_logeado')
  localStorage.removeItem('isAuth')

  // 3. Redirección limpia al login
  router.replace('/login')
}
</script>

<template>
  <nav class="container-fluid bg-success py-3 border-bottom border-secondary border-opacity-25 mb-4 shadow-sm">
    <div class="row align-items-center">

      <div class="col-4 text-start">
        <button @click="irAtras" class="btn btn-light btn-sm fw-bold text-uppercase border-2">
          &larr; Volver
        </button>
      </div>

      <div class="col-4 text-center">
        <span class="fw-bolder text-white h3 mb-0">GTR</span>
      </div>

      <div class="col-4 text-end">
        <button @click="handleLogout" class="btn btn-danger btn-sm px-3 fw-bold text-uppercase border-2 shadow-sm">
          Salir
        </button>
      </div>

    </div>
  </nav>
</template>

<style scoped>
/* Tu estilo para mantener la altura mínima */
nav {
  min-height: 70px;
}

/* Evitamos que el botón de salir sea demasiado grande en móviles muy pequeños */
@media (max-width: 375px) {
  .btn {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
  }
}
</style>