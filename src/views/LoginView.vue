<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie' // Importamos la librería
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Footer from "@/components/layout/Footer.vue";
import CampoFormulario from "@/components/CampoFormulario.vue";

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMsg = ref('')
const showError = ref(false)
const usuarios = ref([])

onMounted(() => {
  // Seguimos leyendo usuarios de LocalStorage
  usuarios.value = JSON.parse(localStorage.getItem("usuarios")) || []
})

const handleLogin = () => {
  showError.value = false

  if (!username.value.trim() || !password.value.trim()) {
    errorMsg.value = "Todos los campos son obligatorios"
    showError.value = true
    return
  }

  const usuarioValido = usuarios.value.find(
      u => u.nombre === username.value.trim() && u.password === password.value.trim()
  )

  if (usuarioValido) {
    // GUARDAR SESION CON COOKIES
    // "expires: 1" significa que la cookie expirara en 1 día
    // Convertimos el objeto a String porque las cookies solo guardan texto
    Cookies.set('usuario_logeado', JSON.stringify(usuarioValido), { expires: 1 })

    router.replace('/home')
  } else {
    errorMsg.value = "Usuario o contraseña incorrectos"
    showError.value = true
  }
}

const loginConGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    // 1. Abrir ventana emergente de Google
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // 2. CONEXIÓN CON FIRESTORE: Verificar si el usuario ya existe
    const docRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(docRef);

    let datosUsuario;

    if (docSnap.exists()) {
      // Si existe, tomamos sus datos (rol, etc.)
      datosUsuario = docSnap.data();
    } else {
      // Si es nuevo, lo registramos automáticamente en la DB de Madrid
      datosUsuario = {
        nombre: user.displayName,
        email: user.email,
        rol: "operario", // Rol inicial
        foto: user.photoURL,
        creadoEn: new Date()
      };
      await setDoc(docRef, datosUsuario);
    }

    // 3. SESIÓN: Guardamos los datos en la Cookie (No en LocalStorage)
    Cookies.set('usuario_logeado', JSON.stringify(datosUsuario), { expires: 1 });

    // 4. Redirigir al panel principal
    router.replace("/home");

  } catch (error) {
    console.error("Error al entrar con Google:", error);
  }
};

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
                  label="Usuario"
                  labelClass="form-label fw-bold text-light small"
                  inputClass="form-control form-control-lg bg-light text-dark border-secondary"
                  placeholder="Nombre de usuario"
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

              <button type="submit" class="btn btn-light btn-lg w-100 fw-bold py-3 shadow-sm">
                Iniciar Sesión
              </button>

              <button @click="loginConGoogle" class="btn btn-light w-100 mt-3">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                     alt="Google" width="20" class="me-2">
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

<style>
body, html {
  margin: 0;
  padding: 0;
  background-color: #f8f9fa !important;
}
</style>