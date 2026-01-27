<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { auth, db } from "@/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import Cookies from 'js-cookie'

onMounted(() => {
  // Este observador detecta automáticamente si el usuario está logueado en Firebase
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Si hay usuario en Firebase pero la Cookie se borró
      if (!Cookies.get('usuario_logeado')) {
        try {
          // Vamos a buscar sus datos a la base de datos de Madrid
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // Restauramos la Cookie de sesión
            Cookies.set('usuario_logeado', JSON.stringify(docSnap.data()), { expires: 1 });
            console.log("Sesión sincronizada con Firestore");
          }
        } catch (error) {
          console.error("Error al sincronizar sesión:", error);
        }
      }
    } else {
      // Si no hay usuario en Firebase, borramos la Cookie por seguridad
      Cookies.remove('usuario_logeado');
    }
  });
});

// Estimación simple de transferencia de datos
window.addEventListener('load', () => {
  const resources = performance.getEntriesByType('resource');
  const totalBytes = resources.reduce((acc, res) => acc + (res.transferSize || 0), 0);

  // 0.0005g de CO2 por cada KB es un estándar de la industria
  const co2Estimated = (totalBytes / 1024) * 0.0005;

  console.log(`Esta sesión ha consumido aprox: ${co2Estimated}g de CO2`);
  // Aquí podrías guardar 'co2Estimated' en tu Firebase junto al registro del animal
});

</script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style>
/* He corregido min-vh-100 por min-height */
body, html {
  margin: 0;
  padding: 0;
  background-color: #f8f9fa !important;
  min-height: 100vh;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>