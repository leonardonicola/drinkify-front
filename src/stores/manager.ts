import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useManagerStore = defineStore('manager', () => {
  const isLoadingGlobally = ref<boolean>(false)
  function setGlobalLoading(payload: boolean) {
    isLoadingGlobally.value = payload
  }

  return { isLoadingGlobally, setGlobalLoading }
})
