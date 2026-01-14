<script setup>
const props = defineProps({
  // El valor del campo (v-model)
  // Textos
  label: {
    type: String,
    default: 'Usuario'
  },
  placeholder: {
    type: String,
    default: 'Nombre de usuario'
  },
  type: {
    type: String,
    default: 'text'
  },
  // Props para clases CSS (personalización total)
  labelClass: {
    type: String,
    default: 'form-label fw-bold text-light small'
  },
  inputClass: {
    type: String,
    default: 'form-control form-control-lg bg-light text-dark border-secondary'
  },
  divError:{
    type: String,
    default: ''
  },
  divClass: {
    type: String
  },
  divErrorClass: {
    type: String
  }
});

// Definimos el evento para actualizar el v-model del padre
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div :class="divClass">
    <label :class="labelClass">
      {{ label }}
    </label>
    <input
        :type="type"
        @input="emit('update:modelValue', $event.target.value)"
        :class="inputClass"
        :placeholder="placeholder"
    >
    <div :class="divErrorClass">{{divError}}</div>
  </div>
</template>

<style scoped>

</style>