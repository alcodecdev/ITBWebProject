<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Button from "@/components/Button.vue";
import Footer from "@/components/layout/Footer.vue";

const router = useRouter()
const nombreOperario = ref('')

onMounted(() => {
  const guardado = JSON.parse(localStorage.getItem('usuario_logeado'))
  if (guardado) {
    nombreOperario.value = guardado.nombre // Recuerda que es un objeto, accede a .nombre
  } else {
    router.push('/login')
  }
})

const goToScanner = () => {
  router.push('/scanner')
}

const handleLogout = () => {
  localStorage.removeItem('usuario_logeado')
  router.replace('/login')
}
</script>

<template>
  <div class="bg-light text-white min-vh-100 d-flex flex-column w-100">

    <main class="flex-grow-1 d-flex align-items-center">
      <div class="container py-5">
        <div class="text-center mb-5">
          <TitleAndSubtitle
              title="GTR Scanner"
              titleClass="display-2 fw-bolder text-success mb-0"
              subtitle="Selecciona la especie de animal"
              subtitleClass="h4 text-success text-uppercase fw-light"
          />

          <div class="row justify-content-center g-4 mt-4">
            <div class="col-12 col-md-8 col-lg-6">
              <div class="d-grid gap-4">
                <Button
                    @click="goToScanner"
                    clase="btn btn-success btn-lg py-5 border-2 shadow-sm d-flex flex-column align-items-center justify-content-center"
                    claseSpan="display-6 fw-bold text-uppercase"
                    nombreSpan="ESCANEAR"
                />
              </div>
            </div>
          </div>

          <div class="text-center mt-5">
            <Button
                nombreSpan="&larr; Cerrar sesion"
                @click="handleLogout"
                clase="btn btn-danger btn-lg px-4 fw-bold text-uppercase shadow-sm"
                style="font-size: 0.9rem; letter-spacing: 1px;"
            />
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>

</style>