<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Definimos props por si en alguna página el botón de "Volver" debe ir a un sitio específico
const props = defineProps({
  rutaVolver: {
    type: String,
    default: '' // Si está vacío, usaremos router.back()
  }
})

const irAtras = () => {
  if (props.rutaVolver) {
    router.push(props.rutaVolver)
  } else {
    router.back() // Vuelve a la pestaña anterior del historial
  }
}

const handleLogout = () => {
  // Limpiamos sesión
  localStorage.removeItem('usuario_logeado')
  localStorage.removeItem('isAuth')
  // Al login
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
/* Aseguramos que el centro siempre esté alineado aunque los botones tengan distintos tamaños */
.navbar {
  min-height: 70px;
}
</style>