<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore"
import CampoFormulario from "@/components/CampoFormulario.vue";
import ParraphAndLink from "@/components/ParraphAndLink.vue";
import Footer from "@/components/layout/Footer.vue";

const router = useRouter()

const email = ref('')
const username = ref('')
const password = ref('')
const errorMsg = ref('')
const showError = ref(false)

const handleRegister = async () => {
  showError.value = false
  errorMsg.value = ""

  if (!username.value.trim() || !password.value.trim() || !email.value.trim()) {
    errorMsg.value = "Todos los campos son obligatorios"
    showError.value = true
    return
  }

  try {
    // 1. COMPROBAR SI EL USERNAME YA EXISTE
    const q = query(collection(db, "usuarios"), where("nombre", "==", username.value.trim()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      errorMsg.value = "Este nombre de usuario ya está en uso";
      showError.value = true;
      return;
    }

    // 2. CREAR CUENTA EN FIREBASE AUTH
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value.trim(),
        password.value.trim()
    );
    const user = userCredential.user;

    // 3. GUARDAR PERFIL EN FIRESTORE
    await setDoc(doc(db, "usuarios", user.uid), {
      nombre: username.value.trim(), // Este será su alias de login
      email: email.value.trim(),
      rol: "operario",
      fechaRegistro: new Date()
    });

    alert("Registro completado con éxito");
    router.replace('/login');

  } catch (error) {
    showError.value = true;
    if (error.code === 'auth/email-already-in-use') {
      errorMsg.value = "Este email ya está registrado";
    } else {
      errorMsg.value = "Error: " + error.message;
    }
  }
}
</script>

<template>
  <div class="min-vh-100 d-flex flex-column bg-light w-100">

    <div class="container d-flex flex-grow-1 align-items-center justify-content-center py-5">
      <div class="row justify-content-center w-100">
        <div class="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">

          <div class="text-start mb-4">
            <h1 class="display-3 fw-bolder text-success mb-0">ITB Register</h1>
            <p class="h5 text-success text-uppercase">Take control</p>
          </div>

          <div class="p-4 p-md-5 border border-secondary border-opacity-25 rounded-4 bg-success bg-opacity-23 shadow">
            <form @submit.prevent="handleRegister">

              <div class="mb-4">
                <campo-formulario type="text" v-model="email" placeholder="ejemplo@gmail.com"  label="Email" label-class="form-label fw-bold text-light small" input-class="form-control form-control-lg bg-light text-dark border-secondary"></campo-formulario>
              </div>

              <div class="mb-4">
                <campo-formulario type="text" v-model="username" placeholder="Usuario"  label="Usuario" label-class="form-label fw-bold text-light small" input-class="form-control form-control-lg bg-light text-dark border-secondary"></campo-formulario>
              </div>

              <div class="mb-4">
                <campo-formulario type="password" v-model="password" placeholder="*****"  label="Contraseña" label-class="form-label fw-bold text-light small" input-class="form-control form-control-lg bg-light text-dark border-secondary"></campo-formulario>
              </div>

              <button type="submit" class="btn btn-light btn-lg w-100 fw-bold py-3 shadow-sm">
                Crear cuenta
              </button>
            </form>

            <div v-if="showError" class="alert alert-danger mt-4 py-2 text-center small fw-bold">
              {{ errorMsg }}
            </div>
          </div>

          <div class="text-center mt-4">
            <parraph-and-link
                parraph-style="text-light-emphasis"
                parraph-value="¿Ya estás registrado?"
                link-text="Inicia sesión aquí"
                link-style="text-dark text-decoration-none fw-bold border-bottom border-light"
                link-direction="/login">
            </parraph-and-link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>