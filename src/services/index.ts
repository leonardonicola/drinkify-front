import axios from 'axios'
import { useManagerStore } from '@/stores/manager'
import router from '../router'
import { Auth } from './auth'
import { User } from './user'
import { Drink } from './drink'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

httpClient.interceptors.request.use((config) => {
  const { setGlobalLoading } = useManagerStore()
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use(
  (response) => {
    const { setGlobalLoading } = useManagerStore()
    setGlobalLoading(false)
    return response
  },
  (error) => {
    const { setGlobalLoading } = useManagerStore()

    if (error.response?.status === 401) {
      router.push({ name: 'login' })
    }

    window.localStorage.removeItem('token')

    setGlobalLoading(false)
    return error
  }
)

export default {
  auth: new Auth(httpClient),
  user: new User(httpClient),
  drink: new Drink(httpClient)
}
