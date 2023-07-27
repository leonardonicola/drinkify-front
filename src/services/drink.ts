import type { DrinkProtocol } from '@/@types/drink/drink.interface'
import type {
  DrinkRepository,
  DrinkResponseProtocol,
  GetDrinksCommonReturn,
  GetAlcoholicsReturnType
} from '@/@types/drink/drink.services'
import makeResponsePayload from '@/utils/makeResponsePayload'
import type { AxiosInstance } from 'axios'

export class Drink implements DrinkRepository {
  constructor(private readonly httpClient: AxiosInstance) {}

  async uploadDrinkPhoto<T>(drinkId: T, file: FormData): Promise<DrinkResponseProtocol<T>> {
    const response = await this.httpClient.post(`/drink/${drinkId}/image`, file)
    return makeResponsePayload(response)
  }

  async createDrinkRecipe<T extends DrinkProtocol>(
    drink: Omit<T, 'comments'>
  ): Promise<DrinkResponseProtocol<T>> {
    const response = await this.httpClient.post('/drink', drink)

    return makeResponsePayload(response)
  }

  async getAllDrinks(): Promise<GetDrinksCommonReturn> {
    const response = await this.httpClient.get('/drink')
    return makeResponsePayload(response)
  }

  async getAlcoholicDrinks(isAlcoholic: boolean): Promise<GetAlcoholicsReturnType> {
    const response = await this.httpClient.get(`/drink`, { params: { isAlcoholic } })
    return makeResponsePayload(response)
  }

  async getDrinksByName(name: string): Promise<GetDrinksCommonReturn> {
    const response = await this.httpClient.get(`/drink`, { params: { name } })
    return makeResponsePayload(response)
  }

  async getByNameAndAlcoholic(isAlcoholic: boolean, name: string): Promise<GetDrinksCommonReturn> {
    const response = await this.httpClient.get(`/drink`, { params: { isAlcoholic, name } })
    return makeResponsePayload(response)
  }

  async getDrinkById<T extends DrinkProtocol>(id: string): Promise<DrinkResponseProtocol<T>> {
    const response = await this.httpClient.get(`/drink/${id}`)
    return makeResponsePayload(response)
  }

  async updateDrinkRecipe<T extends DrinkProtocol>(
    id: string,
    payload: Partial<T>
  ): Promise<DrinkResponseProtocol<T>> {
    const response = await this.httpClient.put(`/drink/${id}`, payload)
    return makeResponsePayload(response)
  }

  async deleteDrink<T extends DrinkProtocol>(id: string): Promise<DrinkResponseProtocol<T>> {
    const response = await this.httpClient.delete(`/drink/${id}`)
    return makeResponsePayload(response)
  }
}
