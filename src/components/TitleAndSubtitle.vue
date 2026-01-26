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
    <h1 v-if="title" :class="titleClass">{{title}}</h1>

    <h2 v-if="titleH2" :class="titleH2Class">{{titleH2}}</h2>

    <p v-if="subtitle" :class="subtitleClass">{{subtitle}}</p>
  </div>
</template>
<style scoped>

</style>