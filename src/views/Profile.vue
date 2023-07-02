<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const { currentUser } = useUserStore()
</script>
<template>
  <div v-if="currentUser">
    <h1 class="text-2xl">
      Hello <span class="font-bold">{{ currentUser.name }}</span>
    </h1>
    <h2 class="text-xl font-semibold italic">And welcome to Drinkify! How can I help you?</h2>
  </div>
</template>

<style scoped></style>
