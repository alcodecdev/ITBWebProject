<script setup>
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Button from "@/components/Button.vue";
const router = useRouter()
const nombreOperario = ref('')

onMounted(() => {
  // Al cargar la página, rescatamos el nombre del localStorage
  const guardado = localStorage.getItem('usuario_logeado')

  if (guardado) {
    nombreOperario.value = guardado
  } else {
    // Si por algún error no hay nombre, lo mandamos al login por seguridad
    router.push('/login')
  }
})

const handleLogout = () => {
  localStorage.removeItem('isAuth')
  localStorage.removeItem('usuario_logeado')
  router.replace('/login')
}
</script>

<template>
<div class="bg-light text-white min-vh-100 d-flex align-items-center">
  <div class="container py-5">
    <div class="text-center mb-5">
      <TitleAndSubtitle
          title="GTR Scanner" titleClass="display-2 fw-bolder text-success mb-0"
          subtitle="Selecciona la especie de animal"
          subtitleClass="h4 text-success text-uppercase fw-light"
      />

      <div class="row justify-content-center g-4">
        <div class="col-12 col-md-8 col-lg-6">
          <Button clase="btn btn-success btn-lg py-5 border-2 shadow-sm d-flex flex-column align-items-center justify-content-center"
                  claseSpan="display-6 fw-bold text-uppercase"
                  nombreSpan="ESCANEAR"
          />
        </div>
      </div>

      <div class="text-center mt-5 mb-4">
        <Button
            @click="handleLogout"
            clase="btn btn-danger btn-lg px-4 fw-bold text-uppercase shadow-sm"
            style="font-size: 0.9rem; letter-spacing: 1px;"
        />
      </div>

    </div>
  </div>
</div>
</template>

<style scoped>

</style>