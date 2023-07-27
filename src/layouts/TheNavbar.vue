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
  localStorage.removeItem('token')
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <RouterLink to="/" class="btn btn-ghost font-black normal-case text-xl">Drinkify</RouterLink>
    </div>

    <div class="navbar-end">
      <div class="form-control">
        <input type="text" placeholder="Busque por drinks..." class="input input-bordered w-full" />
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <UserIcon :size="26" />
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52 font-extrabold"
        >
          <li v-if="currentUser">
            <RouterLink to="/profile">{{ currentUser.name }}</RouterLink>
          </li>
          <li v-if="!currentUser"><RouterLink to="/login">Login</RouterLink></li>
          <li v-if="currentUser" @click="logout"><a>Sair</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
