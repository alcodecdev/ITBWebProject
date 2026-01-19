<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from "@/firebase"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import Cookies from 'js-cookie'
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Footer from "@/components/layout/Footer.vue";
import CampoFormulario from "@/components/CampoFormulario.vue";

const router = useRouter()
const username = ref('') // Usaremos el email para el login manual de Firebase
const password = ref('')
const errorMsg = ref('')
const showError = ref(false)

// --- FUNCIÓN: LOGIN MANUAL (Firestore) ---
const handleLogin = async () => {
  showError.value = false

  if (!username.value.trim() || !password.value.trim()) {
    errorMsg.value = "Todos los campos son obligatorios"
    showError.value = true
    return
  }

  try {
    // 1. Validar en Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, username.value.trim(), password.value.trim());
    const user = userCredential.user;

    // 2. Obtener datos extra de Firestore (Nombre, Rol, etc.)
    const docRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const datosCompletos = docSnap.data();
      // 3. Guardar en Cookie
      Cookies.set('usuario_logeado', JSON.stringify(datosCompletos), { expires: 1 });
      router.replace('/home');
    }
  } catch (error) {
    showError.value = true;
    errorMsg.value = "Email o contraseña incorrectos";
  }
}

// --- FUNCIÓN: LOGIN CON GOOGLE ---
const loginConGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Verificar si el usuario ya existe en Firestore
    const docRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(docRef);

    let datosUsuario;

    if (docSnap.exists()) {
      datosUsuario = docSnap.data();
    } else {
      // Si es su primera vez, lo registramos automáticamente
      datosUsuario = {
        nombre: user.displayName,
        email: user.email,
        rol: "operario",
        foto: user.photoURL,
        fechaRegistro: new Date()
      };
      await setDoc(docRef, datosUsuario);
    }

    Cookies.set('usuario_logeado', JSON.stringify(datosUsuario), { expires: 1 });
    router.replace('/home');

  } catch (error) {
    console.error("Error Google Auth:", error);
  }
}
</script>

<template>
  <div class="min-vh-100 d-flex flex-column w-100">
    <div class="container d-flex flex-grow-1 align-items-center justify-content-center py-5">
      <div class="row justify-content-center w-100">
        <div class="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">

          <TitleAndSubtitle
              divClass="text-center mb-5"
              title="GTR"
              subtitle="Gestion de envio"
              titleClass="display-3 fw-bolder text-success"
              subtitleClass="h5 text-success text-uppercase tracking-wider"
          />

          <div class="p-4 p-md-5 border border-secondary border-opacity-25 rounded-4 bg-success bg-opacity-22 shadow">
            <form @submit.prevent="handleLogin">
              <CampoFormulario
                  divClass="mb-4"
                  label="Email"
                  labelClass="form-label fw-bold text-light small"
                  inputClass="form-control form-control-lg bg-light text-dark border-secondary"
                  placeholder="tu@email.com"
                  v-model="username"
              />

              <CampoFormulario
                  divClass="mb-5"
                  type="password"
                  label="Contraseña"
                  labelClass="form-label fw-bold text-light small"
                  placeholder="Contraseña"
                  inputClass="form-control form-control-lg bg-light text-dark border-secondary"
                  v-model="password"
              />

              <button type="submit" class="btn btn-light btn-lg w-100 fw-bold py-3 shadow-sm mb-3">
                Iniciar Sesión
              </button>

              <button type="button" @click="loginConGoogle" class="btn btn-light w-100 py-2 d-flex align-items-center justify-content-center border-2 fw-bold">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" class="me-2">
                Entrar con Google
              </button>
            </form>

            <div v-if="showError" class="alert alert-danger mt-4 py-2 text-center small fw-bold">
              {{ errorMsg }}
            </div>
          </div>

          <div class="text-center mt-5">
            <p class="text-light-emphasis">
              ¿No estas registrado?
              <router-link to="/register" class="text-dark text-decoration-none fw-bold border-bottom border-light">
                Registrate aquí
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>