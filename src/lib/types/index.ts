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

export interface IAnimation {
  name: string
  duration?: string | number
  count?: string | number
  fill?: string
  delay?: string | number
}

export interface ITab {
  label: string
  icon?: string
}

export interface IGithubData {
  user?: IGithubUser
  repos?: IGithubRepo[]
}
export interface IGithubUser {
  publicRepos: number
  htmlUrl: string
}

export interface IGithubRepo {
  [index: string]: any
  id: number
  name: string
  homepage?: string
  htmlUrl?: string
  cloneUrl?: string
  createdAt?: string
  updatedAt?: string
  description?: string
  language?: string
  image?: IImage
}
