<script setup>
defineProps(['items'])
defineProps({
  divClasePadre:{
    type: String,
    default: 'row justify-content-center mb-5 pb-5'
  },
  divClassHijo:{
    type: String,
    default: 'col-12 col-md-8 col-lg-5'
  },
  ulClase:{
    type: String,
    default: 'list-group list-group-flush"'
  },
  liClase:{
    type: String,
    default: 'list-group-item bg-transparent d-flex justify-content-between align-items-center border-secondary border-opacity-25 text-dark'
  },
  spanClase:{
    type: String,
    default: 'fw-bold'
  },
  buttonClase:{
    type: String,
    default: "btn btn-sm text-danger"
  }
})

const emit = defineEmits(['remove'])
</script>

<template>
  <div :class="divClasePadre">
    <div :class="divClassHijo">
      <ul :class="ulClase">
        <li v-for="(item, index) in items" :key="index"
            :class="liClase">
          <span :class="spanClase">{{ item }}</span>
          <button @click="$emit('remove', index)" :class="buttonClase">×</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>