<script setup>
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie';
import {auth} from "@/firebase.js";

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

const handleLogout = async () => {
  try {
    // 1. Borrado de cookie con path explícito
    Cookies.remove('usuario_logeado', { path: '/' });

    // 2. Cierre de sesión en Firebase
    await signOut(auth);

    // 3. LIMPIEZA DE LOCALSTORAGE (Opcional pero recomendado)
    // Esto evita que el siguiente usuario vea los animales del anterior
    localStorage.removeItem('listaPorc');

    // 4. RESET TOTAL: Usamos window.location para vaciar la memoria de Vue
    window.location.replace('/login');

  } catch (error) {
    console.error("Error al salir:", error);
    // Si falla, forzamos el borrado y salida igualmente
    Cookies.remove('usuario_logeado', { path: '/' });
    window.location.href = '/login';
  }
};
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