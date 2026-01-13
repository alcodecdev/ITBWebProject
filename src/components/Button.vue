<script setup>
import { ref } from 'vue'
defineProps({
  type: String,
  clase: String,
  claseSpan: String,
  nombreSpan: String,
  nombreAetiqueta: String,
  classeHref: String
})
</script>

<template>
<div>
  <button :type="type" :clase="clase">
    <a :class="classeHref">{{nombreAetiqueta}}</a>
    <span :class="claseSpan">{{nombreSpan}}</span>
  </button>
</div>
</template>

<style scoped>

</style>