<script setup>

import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from "@/components/layout/Navbar.vue" // Tu componente de barra
import SpinnerAnimation from "@/components/SpinnerAnimation.vue";
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import BarraAgregar from "@/components/BarraAgregar.vue";

const router = useRouter()
const storageKey = 'listaPorc'

// Estado reactivo
const lista = ref([])
const idInput = ref('')
const errorMsg = ref('')

// Cargar datos al iniciar
onMounted(() => {
  const guardado = localStorage.getItem(storageKey)
  if (guardado) {
    lista.value = JSON.parse(guardado)
  }
})

// Propiedad computada para el total (reemplaza a actualizarInterfazContador)
const totalAnimales = computed(() => lista.value.length)

const agregarAnimal = () => {
  const valor = idInput.value.trim()
  errorMsg.value = ""

  if (valor === "") {
    errorMsg.value = "La ID no puede estar vacía"
    return
  }

  if (lista.value.includes(valor)) {
    errorMsg.value = "Esta ID ya ha sido escaneada"
    return
  }

  // Guardar
  lista.value.push(valor)
  localStorage.setItem(storageKey, JSON.stringify(lista.value))

  // Limpiar
  idInput.value = ""
}

const vaciarLista = () => {
  if (confirm("¿Quieres eliminar todos los animales escaneados?")) {
    lista.value = []
    localStorage.removeItem(storageKey)
  }
}

const finalizarEscaneo = (e) => {
  if (totalAnimales.value === 0) {
    e.preventDefault()
    errorMsg.value = "Escanea al menos un animal para continuar."
  } else {
    router.push('/formulario-envio')
  }
}

</script>

<template>
<div class="bg-light text-white min-vh-100">

  <Navbar />


  <div class="container text-center">

    <SpinnerAnimation />

    <TitleAndSubtitle
        divClass="mb-4"
        titleH2Class="fw-bold text-success"
        titleH2="ESCANEO"
        subtitle="Lector Activo"
        subtitleClass="text-success small text-uppercase tracking-widest"
    />

    <BarraAgregar />

    <div class="row justify-content-center mb-4">

    </div>

    <div class="fixed-bottom p-3 bg-light bg-opacity-90">
      <div class="container d-grid">
        <Button
            @click="goToForm"
            nombreSpan="FINALIZAR Y ENVIAR FORMULARIO"
            clase="btn btn-success btn-lg fw-bold py-3 shadow"/>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>