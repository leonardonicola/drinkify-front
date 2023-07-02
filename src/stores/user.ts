import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserProtocol } from '@/@types/user.interface'
import { computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<UserProtocol | null>(null)

  function setCurrentUser(payload: UserProtocol) {
    currentUser.value = payload
  }

  function clearCurrentUser() {
    currentUser.value = null
  }

  const doesCurrentUserExists = computed(() => {
    return currentUser.value !== null
  })

  return { currentUser, setCurrentUser, clearCurrentUser, doesCurrentUserExists }
})
