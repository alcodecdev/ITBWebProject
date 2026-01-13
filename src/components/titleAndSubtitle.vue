<script setup>
defineProps({
  title: String,
  subtitle: String,
  titleClass: String,
  subtitleClass: String
})
</script>

<template>
  <div>
    <h1 :class="titleClass">{{title}}</h1>
    <p :class="subtitleClass">{{subtitle}}</p>
  </div>
</template>

<style scoped>

</style>