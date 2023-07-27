import type { AxiosResponse } from 'axios'
import type { ErrorProtocol } from '@/@types/errors.interface'

const makeResponsePayload = (response: AxiosResponse) => {
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

export default makeResponsePayload
