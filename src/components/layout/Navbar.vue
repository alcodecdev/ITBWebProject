<script setup>
import { useRouter, useRoute } from 'vue-router'
import Cookies from 'js-cookie';
import { useI18n } from 'vue-i18n';
import {computed} from "vue";

const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()

// Definimos props por si en alguna página el boton de "Volver" debe ir a un sitio especifico
const props = defineProps({
  rutaVolver: {
    type: String,
    default: '' // Si esta vacio, usaremos router.back()
  }
})

const esLogin = computed (() => {
  return route.path === '/login' || route.name === 'login'
})

const irAtras = () => {
  if (props.rutaVolver) {
    router.push(props.rutaVolver)
  } else {
    router.back() // Vuelve a la pestaña anterior del historial
  }
}

const cambiarIdioma = () => {
  locale.value = locale.value === 'ca' ? 'es' : 'ca';
  localStorage.setItem('idioma', locale.value);
}

const handleLogout = async () => {
  try {
    //Borrado de cookie con path explícito
    Cookies.remove('usuario_logeado', { path: '/' });
    //RESET TOTAL: Usamos window.location para vaciar la memoria de Vue
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
  <nav class="container-fluid py-3 border-bottom border-secondary border-opacity-25 mb-4 shadow-sm" id="navbar">
    <div class="row align-items-center">

      <div class="col-4 text-start">
        <button v-if="!esLogin" @click="irAtras" class="btn btn-light btn-sm fw-bold text-uppercase border-2">
          &larr; {{ t('nav.tornar') }}
        </button>
      </div>

      <div class="col-4 text-center">
        <span class="fw-bolder text-white h3 mb-0">{{ t('nav.gtr_titol') }}</span>
      </div>

      <div class="col-4 text-end d-flex justify-content-end gap-2">

        <button @click="cambiarIdioma" class="btn btn-light btn-sm fw-bold text-uppercase border-2">
          {{ locale === 'ca' ? 'ESP' : 'CAT' }}
        </button>

        <button v-if="!esLogin" @click="handleLogout" class="btn btn-danger btn-sm px-3 fw-bold text-uppercase border-2 shadow-sm">
          {{ t('nav.tancar_sessio') }}
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