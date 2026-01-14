<script setup>
defineEmits(['onVaciar'])
defineProps({
  total:{
    type: Number,
    default: 0
  },
  divClasePadre: {
    type: String,
    default: 'row justify-content-center mb-5'
  },
  divClassHijo: {
    type: String,
    default: "col-12 col-md-8 col-lg-5"
  },

  divClaseNieto:{
    type: String,
    default: "card bg-success bg-opacity-10 border-success border-opacity-25 rounded-4 p-4 shadow-sm"
  },
  divClaseTextoEscaneo:{
    type: String,
    default: "text-secondary opacity-50 py-4"
  },
  divClaseDisplay:{
    type: String,
    default: "display-1 fw-bolder text-success"
  },
  divClaseDisplayText:{
    type: String,
    default: "h5 text-uppercase text-success opacity-75"
  },
  divClaseButton:{
    type: String,
    default: "mt-3"
  },
  claseButton:{
    type: String,
    default: "btn btn-outline-danger btn-sm"
  }

})
</script>

<template>
  <div :class="divClasePadre">
    <div :class="divClassHijo">
      <div v-if="total > 0" :class="divClaseNieto">
        <div :class="divClaseDisplay">{{ total }}</div>
        <div :class="divClaseDisplayText">Animales Registrados</div>

        <div :class="divClaseButton">
          <button @click="$emit('onVaciar')" :class="claseButton">
            Vaciar lista
          </button>
        </div>
      </div>

      <div v-else :class="divClaseTextoEscaneo">
        Esperando escaneos...
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>