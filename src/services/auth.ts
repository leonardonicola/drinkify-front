import type {
  AuthProtocol,
  ErrorProtocol,
  LoginResponseProtocol,
  RegisterResponseProtocol
} from '@/@types/auth.services'
import type { AxiosInstance } from 'axios'

export class Auth implements AuthProtocol {
  constructor(private readonly httpClient: AxiosInstance) {}

  async register({
    name,
    email,
    password
  }: {
    name: string
    email: string
    password: string
  }): Promise<RegisterResponseProtocol> {
    const response = await this.httpClient.post('/user', {
      name,
      email,
      password
    })
    let errors: ErrorProtocol | null = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  }

  async login({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<LoginResponseProtocol> {
    const response = await this.httpClient.post('/login', {
      email,
      password
    })

    let errors: ErrorProtocol | null = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  }
}
