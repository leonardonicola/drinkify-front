<script setup lang="ts">
import UserIcon from '@/components/icons/UserIcon.vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import router from '@/router'

const store = useUserStore()
const { currentUser } = storeToRefs(store)

function logout() {
  store.clearCurrentUser()
  window.localStorage.removeItem('token')
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="navbar bg-base-300">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52 font-extrabold"
        >
          <li v-if="!currentUser"><RouterLink to="/login">Login</RouterLink></li>
          <li v-if="currentUser" @click="logout"><a>Sair</a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <RouterLink to="/" class="btn btn-ghost normal-case text-xl">Drinkify</RouterLink>
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle" v-if="currentUser">
        <RouterLink to="/profile"><UserIcon :size="26" /></RouterLink>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
