import { IApiError } from '@/lib/types/errors'
import {
 IApiGithubRepos, IGithubData, IGithubRepo, IGithubUser
} from '@/lib/types/models/Repo'
import { store } from '@/store'

export class GithubData {
  user?: IGithubUser

  repos?: IGithubRepo[]

  totalRepoCount?: number

  constructor(data?: IGithubData) {
    this.user = data ? data.user : undefined
    this.repos = data ? data.repos : undefined
    this.totalRepoCount = data?.totalRepoCount
  }

  async init() {
    return new GithubData({
      user: await this.getUserInfo(),
      repos: await this.getRepos(),
      totalRepoCount: this.repos?.length
    })
  }

  async getUserInfo() {
    const userResponse = await store.dispatch('getUserInfo')

    if (userResponse.success) {
      this.user = userResponse.user

      return this.user
    }

    return {} as IGithubUser
  }

  async getRepos(startAt = 0, sortBy?: string) {
    const repoResponse: IApiGithubRepos | IApiError = await store.dispatch('getRepos', { startAt, sortBy })

    if (repoResponse.success) {
      this.totalRepoCount = repoResponse.repos.length
    }

    return this.repos
  }

  async filterRepos(filter: string, addResultsToRepos = false) {
    const repoResponse: IApiGithubRepos | IApiError = await store.dispatch('filterRepos', {
      filter,
      addResultsToRepos
    })

    if (repoResponse.success) {
      this.totalRepoCount = this.repos?.length
    }

    return repoResponse.success ? repoResponse.repos : undefined
  }

  async setRepos(repos: IGithubRepo[]) {
    store.commit('setRepos', repos)
    this.repos = repos
  }
}
