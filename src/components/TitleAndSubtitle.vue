<script setup>
defineProps({
  title: String,
  subtitle: String,
  titleClass: String,
  subtitleClass: String,
  divClass: String,
  titleH2: String,
  titleH2Class: String

})
</script>

<template>
  <div :class="divClass">
    <h1 :class="titleClass">{{title}}</h1>
    <h2 :class="titleH2Class">{{titleH2}}</h2>
    <p :class="subtitleClass">{{subtitle}}</p>
  </div>
</template>

<style scoped>

</style>