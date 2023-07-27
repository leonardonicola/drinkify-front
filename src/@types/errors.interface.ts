export type ErrorProtocol = {
  status: number
  statusText: string
}

export interface ResponseProtocol {
  errors: ErrorProtocol | null
}
