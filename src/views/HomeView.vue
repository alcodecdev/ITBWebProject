<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Button from "@/components/Button.vue";
import Footer from "@/components/layout/Footer.vue";
import Cookies from 'js-cookie' // Importación correcta

const router = useRouter()
const nombreOperario = ref('')

//Verificacion de Seguridad
//Lo ideal es hacerlo dentro de onMounted para asegurar que el router esta listo
onMounted(() => {
  const userCookie = Cookies.get('usuario_logeado')

  if (userCookie) {
    const usuario = JSON.parse(userCookie)
    nombreOperario.value = usuario.nombre
  } else {
    //Si no hay cookie, al login
    router.push('/login')
  }
})

const goToScanner = () => {
  router.push('/scanner')
}

//Logout corregido para Cookies
const handleLogout = () => {
  Cookies.remove('usuario_logeado') //Borramos la cookie
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