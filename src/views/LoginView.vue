<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from "@/firebase"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { collection, query, where, getDocs, doc, getDoc, setDoc } from "firebase/firestore"
import Cookies from 'js-cookie'
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Footer from "@/components/layout/Footer.vue";
import CampoFormulario from "@/components/CampoFormulario.vue";
import '../assets/styles/coloursAndAnimation.css'


const router = useRouter()
const username = ref('')
const password = ref('')
const errorMsg = ref('')
const showError = ref(false)

const handleLogin = async () => {
  showError.value = false
  errorMsg.value = ""

  if (!username.value.trim() || !password.value.trim()) {
    errorMsg.value = "Todos los campos son obligatorios"
    showError.value = true
    return
  }

  try {
    // BUSCAR EL EMAIL ASOCIADO AL USERNAME EN FIRESTORE
    const q = query(collection(db, "usuarios"), where("nombre", "==", username.value.trim()));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      errorMsg.value = "El usuario no existe";
      showError.value = true;
      return;
    }

    // Obtenemos los datos del documento encontrado
    const usuarioDoc = querySnapshot.docs[0];
    const datosUsuario = usuarioDoc.data();
    const emailReal = datosUsuario.email;

    // LOGUEAR EN FIREBASE USANDO EL EMAIL RECUPERADO
    await signInWithEmailAndPassword(auth, emailReal, password.value.trim());

    // GUARDAR SESIÓN EN COOKIE
    Cookies.set('usuario_logeado', JSON.stringify(datosUsuario), { expires: 1 , path: '/'});
    window.location.href=('/home');

  } catch (error) {
    console.error(error);
    errorMsg.value = "Contraseña incorrecta";
    showError.value = true;
  }
}

// Login con Google
const loginConGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const docRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(docRef);

    let datosUsuario;
    if (docSnap.exists()) {
      datosUsuario = docSnap.data();
    } else {
      datosUsuario = {
        nombre: user.displayName,
        email: user.email,
        rol: "operario",
        foto: user.photoURL,
        creadoEn: new Date()
      };
      await setDoc(docRef, datosUsuario);
    }

    Cookies.set('usuario_logeado', JSON.stringify(datosUsuario), { expires: 1 });
    router.replace("/home");
  } catch (error) {
    console.error("Error Google:", error);
  }
};
</script>

<template>
  <div class="min-vh-100 d-flex flex-column w-100">

    <div class="container d-flex flex-grow-1 align-items-center justify-content-center py-5">
      <div class="row justify-content-center w-100">
        <div class="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">

          <TitleAndSubtitle
              class="textoOscuro"
              divClass="text-start mb-4"
              title="GTR Login"
              subtitle="Gestión de envío"
              titleClass="display-3 fw-bolder"
              subtitleClass="h5  text-uppercase tracking-wider"
          />

          <div class="p-4 p-md-5 border border-secondary border-opacity-25 rounded-4 shadow" id="formLogin">
            <form @submit.prevent="handleLogin" class="formulario">


              <CampoFormulario class="text-light"
                  divClass="mb-4"
                  id="user"
                  label="Usuario"
                  labelClass="form-label fw-bold text-light small"
                  inputClass="form-control form-control-lg bg-light text-dark border-secondary"
                  placeholder="Nombre de usuario"
                  v-model="username"
              />


              <CampoFormulario class="text-light"
                  divClass="mb-5"
                  id="password"
                  type="password"
                  label="Contraseña"
                  labelClass="form-label fw-bold text-light small"
                  placeholder="Contraseña"
                  inputClass="form-control form-control-lg bg-light text-dark border-secondary"
                  v-model="password"

              />

              <button type="submit" class="btn btn-light btn-lg w-100 fw-bold py-3 shadow-sm">
                Iniciar Sesión
              </button>

              <div class="text-center mt-3">
                <button @click="loginConGoogle" class="btn btn-light  w-60 mt-3" type="button">
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                       alt="" width="20" class="me-2">
                  Entrar con Google
                </button>
              </div>


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

<style>
body, html {
  margin: 0;
  padding: 0;
  background-color: #f8f9fa !important;
}
</style>