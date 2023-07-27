import type {
  AuthProtocol,
  LoginResponseProtocol,
  RegisterResponseProtocol
} from '@/@types/auth.services'
import makeResponsePayload from '@/utils/makeResponsePayload'
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
    return makeResponsePayload(response)
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

    return makeResponsePayload(response)
  }
}
