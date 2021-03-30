import { IApiErrorMessage } from './errors'

export interface IImage {
  src: string
  alt?: string
  ratio?: string
  rounded?: boolean
}

export interface IApiDeleteResponse {
  success: boolean,
  error: IApiErrorMessage
}

export interface IIndexedArray {
  [index: number]: string
}
