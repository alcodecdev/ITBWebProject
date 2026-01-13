<script setup>
const props = defineProps({
  // El valor del campo (v-model)
  modelValue: {
    type: String,
    default: ''
  },
  // Textos
  label: {
    type: String,
    default: 'Usuario'
  },
  placeholder: {
    type: String,
    default: 'Nombre de usuario'
  },
  //Configuracion de IDs y tipos
  id: {
    type: String,
    default: 'inputName'
  },
  type: {
    type: String,
    default: 'text'
  },
  // Props para clases boostrap
  labelClass: {
    type: String,
    default: 'form-label fw-bold text-light small'
  },
  inputClass: {
    type: String,
    default: 'form-control form-control-lg bg-light text-dark border-secondary'
  }
});

// Definimos el evento para actualizar el v-model del padre
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <label :for="id" :class="labelClass">
      {{ label }}
    </label>
    <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        :class="inputClass"
        :placeholder="placeholder"
        autocomplete="username"
    >
  </div>
</template>

<style scoped>

</style>