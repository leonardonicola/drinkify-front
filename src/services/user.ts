import type { AxiosInstance } from 'axios'

export class User {
  constructor(private readonly httpClient: AxiosInstance) {}

  async getMe() {
    const response = await this.httpClient.get('/me')
    return response.data
  }
}
