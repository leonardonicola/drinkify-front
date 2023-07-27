export interface DrinkProtocol {
  id: string
  name: string
  ingredients: string[]
  isAlcoholic: boolean
  description: string
  comments?: string[]
  instructions?: string[]
  imageUrl: string | null
}
