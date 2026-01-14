<script setup>
defineProps({
  divClassPadre:{
    type:String,
    default: "row justify-content-center mb-4"
  },
  divClassHijo:{
    type:String,
    default: "col-12 col-md-8 col-lg-5"
  },
  divClassNieto:{
    type:String,
    default: "input-group input-group-lg"
  },
  divClassParrafo:{
    type:String,
    default: "text-danger fw-bold mt-2 small"
  },
  inputType:{
    type:String
  },
  inputClass:{
    type:String,
    default: "form-control bg-light text-dark border-secondary focus-ring focus-ring-light"
  },
  inputPlaceholder:{
    type:String,
    default:"Codigo o FR..."
  },
  buttonClass:{
    type:String,
    default:"btn btn-primary fw-bold px-4"
  },
  buttonName:{
    type:String,
    default:"Agregar",
  },
  error:{
    type:String
  }

})
// Avisamos al padre cuando hay cambios o clics
defineEmits(['update:modelValue', 'onAgregar'])
</script>

<template>
  <div :class="divClassPadre">
    <div :class="divClassHijo">
      <div :class="divClassNieto">
        <input :type="inputType"
               :class="inputClass"
               :placeholder="inputPlaceholder"
               @input="$emit('update:modelValue', $event.target.value)"
               @keyup.enter="$emit('onAgregar')"
               autofocus>
        <button type="button" :class="buttonClass" @click="$emit('onAgregar')">
          {{ buttonName }}
        </button>
      </div>
      <p :class="divClassParrafo" v-if="error">{{error}}</p>
    </div>
  </div>
</template>

<style scoped>

</style>