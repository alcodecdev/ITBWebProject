<script setup>
</script>

<template>
  <div class="bg-dark text-white min-vh-100 d-flex align-items-center py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">

          <div class="text-start mb-4">
            <h1 class="display-3 fw-bolder text-light mb-0">ITB Register</h1>
            <p class="h5 text-secondary text-uppercase">Take control</p>
          </div>

          <div class="p-4 p-md-5 border border-secondary border-opacity-25 rounded-4 bg-black bg-opacity-25 shadow">
            <form>

              <div class="mb-4">
                <label class="form-label fw-bold text-light small">Email</label>
                <input
                    type="email"
                    class="form-control form-control-lg"
                    placeholder="ejemplo@correo.com"
                />
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold text-light small">Usuario</label>
                <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Nombre de usuario"
                />
              </div>

              <div class="mb-5">
                <label class="form-label fw-bold text-light small">Contraseña</label>
                <input
                    type="password"
                    class="form-control form-control-lg"
                    placeholder="Mínimo 8 caracteres"
                />
              </div>

              <button class="btn btn-light btn-lg w-100 fw-bold py-3">
                Crear cuenta
              </button>
            </form>
          </div>

          <div class="text-center mt-4">
            <p class="text-secondary">
              ¿Ya estás registrado?
              <a class="text-light fw-bold" href="">Inicia sesión aquí</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
