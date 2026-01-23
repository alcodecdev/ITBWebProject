<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: { type: String, default: ' ' },
  placeholder: { type: String, default: '' },
  id: { type: String, required: true },
  type: { type: String, default: 'text' },
  inputClass: {
    type: String,
    default: 'form-control form-control-lg bg-light text-dark border-secondary'
  },
  errorDivID:{
    type: String
  },
  divClass: { type: String, default: 'mb-3' },
  error: { type: String, default: '' },
  readonly:{type: Boolean, default: false}
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div :class="divClass">
    <label :for="id">{{ label }}</label>

    <input
        :type="type"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :id="id"
        :class="[
          inputClass,
          { 'is-invalid': error }
        ]"
        :readonly="readonly" >
    <div :id="errorDivID" class="invalid-feedback fw-bold">
      {{ error }}
    </div>
  </div>
</template>