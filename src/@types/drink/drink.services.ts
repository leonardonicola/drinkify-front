import type { ResponseProtocol } from '../errors.interface'
import type { DrinkProtocol } from './drink.interface'

export interface GetAlcoholicsReturnType extends ResponseProtocol {
  data: Array<Omit<DrinkProtocol, 'instructions' | 'isAlcoholic'>>
}
export interface GetDrinksCommonReturn extends ResponseProtocol {
  data: Array<Omit<DrinkProtocol, 'instructions'>>
}

export interface DrinkResponseProtocol<T> extends ResponseProtocol {
  data: T
}

export interface DrinkRepository {
  uploadDrinkPhoto<T extends string>(drinkId: T, file: FormData): Promise<DrinkResponseProtocol<T>>
  createDrinkRecipe<T extends DrinkProtocol>(
    drink: Omit<T, 'comments'>
  ): Promise<DrinkResponseProtocol<T>>
  getAlcoholicDrinks(isAlcoholic: boolean): Promise<GetAlcoholicsReturnType>
  getAllDrinks(): Promise<GetDrinksCommonReturn>
  getDrinksByName(name: string): Promise<GetDrinksCommonReturn>
  getByNameAndAlcoholic(isAlcoholic: boolean, name: string): Promise<GetDrinksCommonReturn>
  getDrinkById<T extends DrinkProtocol>(id: string): Promise<DrinkResponseProtocol<T>>
  updateDrinkRecipe<T extends DrinkProtocol>(
    id: string,
    payload: Partial<T>
  ): Promise<DrinkResponseProtocol<T>>
  deleteDrink<T extends DrinkProtocol>(id: string): Promise<DrinkResponseProtocol<T>>
}
