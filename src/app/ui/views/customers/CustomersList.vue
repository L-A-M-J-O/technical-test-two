<template>
  <div>
    <h1>Detalle del Cliente</h1>
    <p>Aquí va el detalle del cliente seleccionado.</p>
    <p>ID del Cliente: {{ id }}</p>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const id = route.params.id
</script>
