<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './layouts/TheNavbar.vue'
</script>

<template>
  <Navbar />

  <main class="p-16">
    <RouterView />
  </main>
</template>

<style scoped></style>
