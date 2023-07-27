<template>
  <div class="card bg-base-100 shadow-xl mt-10" :class="width">
    <figure v-if="props.drink.imageUrl">
      <img :src="props.drink.imageUrl" :alt="props.drink.name" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ drink.name }}
        <div class="badge badge-primary">{{ isAlcoholic }}</div>
      </h2>
      <p>{{ props.drink.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DrinkProtocol } from '@/@types/drink/drink.interface'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    drink: DrinkProtocol
    width?: string
  }>(),
  {
    width: 'w-96'
  }
)

const isAlcoholic = computed(() => {
  return props.drink.isAlcoholic ? 'Alcoólico' : 'Não alcoólico'
})
</script>
