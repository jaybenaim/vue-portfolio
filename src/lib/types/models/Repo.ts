import { IImage } from '..'

export interface IApiRepoOptions {
  startAt: number
  sortBy: 'created' | 'updated' | 'pushed' |'full_name'
  limit: number
  page: number
}

export interface IGithubState {
  userInfo: IGithubUser
  repos: IGithubRepo[]
}

export interface IApiGithubUser {
  success: true
  user: IGithubUser
}

export interface IApiGithubRepos {
  success: true
  repos: IGithubRepo[]
  query: IQueryOptions
  totalCount: number
  currentPage: number
}

export interface IGithubData {
  totalRepoCount: number
  user?: IGithubUser
  repos?: IGithubRepo[]
  query?: IQueryOptions
}
export interface IQueryOptions {
  startAt?: number
  limit?: number
  page?: number
  queryString?: string
  sort?: string
}
export interface IGithubUser {
  publicRepos: number
  gitUrl: string
}

export interface IGithubRepo {
  [index: string]: any
  id: number
  name: string
  homepageUrl?: string
  gitUrl?: string
  cloneUrl?: string
  createdAt?: string
  updatedAt?: string
  description?: string
  language?: string
  image?: IImage
}
