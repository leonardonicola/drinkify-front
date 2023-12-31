import type { UserProtocol } from './user.interface'
import type { ResponseProtocol } from './errors.interface'

type AcessToken = {
  access_token: string
}

export interface LoginResponseProtocol extends ResponseProtocol {
  data: AcessToken
}

export interface RegisterResponseProtocol extends ResponseProtocol {
  data: Omit<UserProtocol, 'password'>
}

export interface AuthProtocol {
  register({ name, email, password }: Omit<UserProtocol, 'id'>): Promise<RegisterResponseProtocol>
  login({
    email,
    password
  }: Pick<UserProtocol, 'email' | 'password'>): Promise<LoginResponseProtocol>
}
