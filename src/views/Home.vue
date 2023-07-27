<script setup lang="ts">
import type { DrinkProtocol } from '@/@types/drink/drink.interface'
import { onMounted, ref } from 'vue'
import services from '@/services'
import { useToast } from 'vue-toastification'
import DrinkCard from '@/components/DrinkCard.vue'

const toast = useToast()
const drinks = ref<DrinkProtocol[]>([])

onMounted(() => {
  fetchDrinks()
})

async function fetchDrinks() {
  try {
    const { errors, data } = await services.drink.getAllDrinks()
    if (!errors) {
      drinks.value = data
      return
    }
    if (errors!.status === 401) {
      toast.error('Você precisa estar logado para acessar essa página')
    }
    if (errors!.status === 400) {
      toast.error('Ocorreu um erro ao carregar os drinks')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <main>
    <h1 class="text-2xl font-extrabold">Bem vindo ao Drinkify.io!</h1>
    <template v-for="drink in drinks" :key="drink.id">
      <DrinkCard :drink="drink" width="w-72" />
    </template>
  </main>
</template>
