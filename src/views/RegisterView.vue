<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nombre = ref('')
const email = ref('')
const password = ref('')

const registrarUsuario = () => {
  // 1. Obtener los usuarios que ya existan o crear un array vacío
  const usuarios = JSON.parse(localStorage.getItem('usuarios_db') || '[]')

  // 2. Comprobar si el email ya existe
  if (usuarios.find(u => u.email === email.value)) {
    alert("Este correo ya está registrado")
    return
  }

  // 3. Guardar el nuevo usuario
  usuarios.push({
    nombre: nombre.value,
    email: email.value,
    password: password.value // Nota: En un proyecto real esto iría cifrado
  })

  localStorage.setItem('usuarios_db', JSON.stringify(usuarios))
  alert("¡Registro completado! Ahora puedes iniciar sesión.")
  router.push('/login')
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">

        <div class="text-start mb-4">
          <h1 class="display-3 fw-bolder text-light mb-0">ITB Register</h1>
          <p class="h5 text-secondary text-uppercase">Take control</p>
        </div>

        <div class="p-4 p-md-5 border border-secondary border-opacity-25 rounded-4 bg-black bg-opacity-25 shadow">
          <form id="registerForm">

            <div class="mb-4">
              <label for="inputEmail" class="form-label fw-bold text-light small">Email</label>
              <input type="email"
                     class="form-control form-control-lg bg-light text-dark border-secondary"
                     id="inputEmail"
                     placeholder="ejemplo@correo.com">
              <p id="errorEmail" class="text-danger small mt-1 fw-bold"></p>
            </div>

            <div class="mb-4">
              <label for="inputName" class="form-label fw-bold text-light small">Usuario</label>
              <input type="text"
                     class="form-control form-control-lg bg-light text-dark border-secondary"
                     id="inputName"
                     placeholder="Nombre de usuario">
              <p id="errorName" class="text-danger small mt-1 fw-bold"></p>
            </div>

            <div class="mb-5">
              <label for="inputPassword" class="form-label fw-bold text-light small">Contraseña</label>
              <input type="password"
                     class="form-control form-control-lg bg-light text-dark border-secondary"
                     id="inputPassword"
                     placeholder="Mínimo 8 caracteres">
              <p id="errorPassword" class="text-danger small mt-1 fw-bold"></p>
            </div>

            <button type="submit"
                    class="btn btn-light btn-lg w-100 fw-bold py-3 shadow-sm"
                    id="btnRegister">
              Crear cuenta
            </button>
          </form>

          <div class="alert alert-danger mt-4 py-2 text-center small fw-bold"
               style="display: none"
               id="msgError">
          </div>
        </div>

        <div class="text-center mt-4">
          <p class="text-secondary">
            ¿Ya estás registrado?
            <router-link to="/login" class="text-light text-decoration-none fw-bold border-bottom border-light">
              Inicia sesión aquí
            </router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>