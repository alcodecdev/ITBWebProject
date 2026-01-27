<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Button from "@/components/Button.vue";
import Footer from "@/components/layout/Footer.vue";
import '../assets/styles/coloursAndAnimation.css'
import Cookies from 'js-cookie';
import {auth} from "@/firebase.js"; // Importación correcta

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

const goToForm = () => {
  router.push('/form')
}

//Logout corregido para Cookies
const handleLogout = async () => {
  try {
    // Borrado de cookie con path explícito
    Cookies.remove('usuario_logeado', { path: '/' });

    // Cierre de sesión en Firebase
    await signOut(auth);

    // Esto evita que el siguiente usuario vea los animales del anterior
    localStorage.removeItem('listaPorc');

    // RESET TOTAL: Usamos window.location para vaciar la memoria de Vue
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
  <div class="bg-light text-white min-vh-100 d-flex flex-column w-100">

    <main class="flex-grow-1 d-flex align-items-center">
      <div class="container py-5">
        <div class="text-center mb-5">
          <TitleAndSubtitle
              class="textoOscuro"
              title="GTR Scanner"
              titleClass="display-2 fw-bolder mb-0"
          />

          <div class="row justify-content-center g-4 mt-4">
            <div class="col-12 col-md-8 col-lg-6">
              <div class="d-grid gap-4" id="buttonHome">
                <Button
                    @click="goToForm"
                    clase="btn text-white btn-lg py-5 border-0 shadow-sm d-flex flex-column align-items-center justify-content-center"
                    claseSpan="display-6 fw-bold text-uppercase"
                    nombreSpan="ENVIAR"
                />
              </div>
            </div>
          </div>

          <div class="text-center mt-5">
            <Button
                nombreSpan="← Cerrar sesion"
                @click="handleLogout"
                clase="btn btn-danger btn-lg px-4 fw-bold text-uppercase shadow-sm"
                :style="{ fontSize: '0.9rem', letterSpacing: '1px' }"
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