<script setup>
import { ref } from 'vue'
defineProps({
  type: String,
  clase: String,
})
</script>

<template>
<div>
  <button :type="type" :clase="clase"></button>
</div>
</template>

<style scoped>

</style>