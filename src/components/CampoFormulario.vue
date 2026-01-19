<script setup>
const props = defineProps({
  modelValue: [String, Number], // Necesario para que el v-model funcione correctamente
  label: {
    type: String, default: 'Usuario'
  },
  placeholder: {
    type: String,
    default: 'Nombre de usuario' },
  type: {
    type: String,
    default: 'text' },
  labelClass: {
    type: String,
    default: 'form-label fw-bold text-light small' },
  inputClass: {
    type: String, default:
      'form-control form-control-lg bg-light text-dark border-secondary' },
  divClass: {
    type: String,
    default: 'mb-3' },

  error: { type:
    String,
    default: '' }
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div :class="divClass">
    <label :class="labelClass">{{ label }}</label>

    <input
        :type="type"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :class="[
          inputClass,
          { 'is-invalid': error }
        ]"
    >

    <div v-if="error" class="invalid-feedback fw-bold">
      {{ error }}
    </div>
  </div>
</template>