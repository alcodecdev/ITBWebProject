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
  },
  linkDirection:{
    type: String
  }
})
</script>s

<template>
  <p :class="parraphStyle">
    {{parraphValue}}
  </p>

  <router-link :to="linkDirection" :class="linkStyle">
    {{ linkText }}
  </router-link>


</template>

<style scoped>

</style>