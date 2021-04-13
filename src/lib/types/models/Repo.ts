export interface IApiRepoOptions {
  startAt: number
  sortBy: 'created' | 'updated' | 'pushed' |'full_name'
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
}

export interface IGithubData {
  user?: IGithubUser
  repos?: IGithubRepo[]
  totalRepoCount?: number
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
