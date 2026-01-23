<script setup>
import { ref } from 'vue'
defineProps({
  type: String,
  clase: String,
  claseSpan: String,
  nombreSpan: String,
  idButton: String,
  style: String
})
</script>

<template>
  <button :type="type" :class="clase" :style="style">
    <span :class="claseSpan">{{nombreSpan}}</span>
  </button>
</template>

<style scoped>

</style>