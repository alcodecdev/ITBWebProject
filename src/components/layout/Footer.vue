<script setup>

</script>

<template>
  <footer class="container-fluid bg-white border-top py-4 mt-auto">
    <div class="container">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">

        <div class="d-flex flex-wrap justify-content-center align-items-center gap-4">
          <img
              src="@/assets/img/logoeuropatexto.svg"
              alt="Logo Union Europea"
              class="img-fluid logo-institucional"
              style="height: 65px; width: auto;"
          >

          <div class="vr d-none d-md-block text-secondary opacity-25" style="height: 40px;"></div>

          <img
              src="@/assets/img/gencat.svg"
              alt="Logo Generalitat"
              class="img-fluid logo-institucional"
              style="height: 60px; width: auto;"
          >
        </div>

        <div class="text-center text-md-end">
          <p class="mb-0 text-secondary small fw-bold">
            &copy; 2026 <span class="text-success">GTR Project</span>
          </p>
          <p class="mb-0 text-muted" style="font-size: 0.65rem;">
            Fondos Europeos de Desarrollo Regional
          </p>
        </div>

      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Forzamos a que no se vuelvan diminutos en pantallas pequeñas */
.logo-institucional {
  min-width: 140px;
  object-fit: contain;
}

@media (max-width: 576px) {
  .logo-institucional {
    height: 50px !important; /* Un poco más pequeños solo en móviles muy estrechos */
  }
}
</style>