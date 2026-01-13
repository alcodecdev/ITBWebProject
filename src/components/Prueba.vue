<script setup>
import { ref } from 'vue'
defineProps({
  type: String,
  clase: String,
  user: String
})
</script>

<template>
  <div class="mb-4">
    <label for="inputName" class="form-label fw-bold text-light small">{{ user }}</label>
    <input
        v-model="username"
        :type="type"
        :class="clase"
        id="inputName"
        placeholder="Nombre de usuario"
        autocomplete="username"
    >
  </div>
</template>

<style scoped>

</style>