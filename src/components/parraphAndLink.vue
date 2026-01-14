<script setup>
const props = defineProps({
  parraphStyle:{
    type: String
  },
  parraphValue:{
    type: String,
    default: ''
  },
  linkStyle:{
    type: String
  },
  linkText:{
    type: String
  }
})
</script>s

<template>

  <p :class="parraphStyle"> <a href={{linkDirection}}> </a>  </p>


</template>

<style scoped>

</style>