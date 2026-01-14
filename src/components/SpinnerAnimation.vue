<script setup>
defineProps({
  divClasePadre:{
    type: String,
    default: 'my-5 position-relative d-flex justify-content-center align-items-center'
  },
  styleClasePadre:{
    type: String,
    default: 'height: 120px;'
  },
  divClaseHijoUno:{
    type: String,
    default: 'spinner-grow text-info position-absolute'
  },
  divClaseStyleUno:{
    type: String,
    default: 'width: 100px; height: 100px; opacity: 0.2;'
  },
  divClaseHijoDos:{
    type: String,
    default: 'spinner-border text-info'
  },
  divClaseStyleDos:{
    type: String,
    default: 'width: 50px; height: 50px; border-width: 3px;'
  }
})
</script>

<template>
  <div :class="divClasePadre" :style="styleClasePadre">
    <div :class="divClaseHijoUno" :style="divClaseStyleUno"></div>
    <div :class="divClaseHijoDos" :style="divClaseStyleDos"></div>
  </div>
</template>

<style scoped>

</style>