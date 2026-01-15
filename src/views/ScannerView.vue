<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from "@/components/layout/Navbar.vue"
import SpinnerAnimation from "@/components/SpinnerAnimation.vue";
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import BarraAgregar from "@/components/BarraAgregar.vue";
import Contador from "@/components/Contador.vue";
import Button from "@/components/Button.vue";

const router = useRouter()
const storageKey = 'listaPorc'

const lista = ref([])
const idInput = ref('')
const errorMsg = ref('')

onMounted(() => {
  const guardado = localStorage.getItem(storageKey)
  if (guardado) {
    lista.value = JSON.parse(guardado)
  }
})

const totalAnimales = computed(() => lista.value.length)

const agregarAnimal = () => {
  const valor = idInput.value.trim()
  errorMsg.value = ""

  if (valor === "") {
    errorMsg.value = "La ID no puede estar vacía"
    return
  }

  // Seguimos validando duplicados internamente para que el conteo sea real
  if (lista.value.includes(valor)) {
    errorMsg.value = "Esta ID ya ha sido escaneada"
    return
  }

  lista.value.push(valor)
  localStorage.setItem(storageKey, JSON.stringify(lista.value))
  idInput.value = ""
}

const vaciarLista = () => {
  if (confirm("¿Quieres eliminar todos los animales escaneados?")) {
    lista.value = []
    localStorage.removeItem(storageKey)
  }
}

// ESTA ES LA FUNCIÓN QUE LLAMA EL BOTÓN
const goToForm = () => {
  if (totalAnimales.value === 0) {
    errorMsg.value = "Escanea al menos un animal para continuar."
  } else {
    router.push('/form')
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

    <BarraAgregar
        v-model="idInput"
        :error="errorMsg"
        @onAgregar="agregarAnimal"
    />

    <Contador
        :total="totalAnimales"
        @onVaciar="vaciarLista"
    />

    <div class="fixed-bottom p-3 bg-light">
      <div class="container">
        <Button
            type="submit"
            @click="goToForm"
            nombreSpan="FINALIZAR Y ENVIAR FORMULARIO"
            clase="btn btn-success btn-lg w-100 fw-bold py-3 fs-4 text-uppercase shadow"/>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>