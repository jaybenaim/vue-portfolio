import { IGithubData, IGithubRepo, IGithubUser } from '@/lib/types'
import { store } from '@/store'

export class GithubData {
  user?: IGithubUser

  repos?: IGithubRepo[]

  constructor(data?: IGithubData) {
    this.user = data ? data.user : undefined
    this.repos = data ? data.repos : undefined
  }

  async init() {
    return {
      user: await this.getUserInfo(),
      repos: await this.getRepos()
    }
  }

  async getUserInfo() {
    const userResponse = await store.dispatch('getUserInfo')

    if (userResponse.success) {
      this.user = userResponse.user

      return this.user
    }

    return {} as IGithubUser
  }

  async getRepos() {
    const repoResponse = await store.dispatch('getRepos')

    if (repoResponse.success) {
      console.log(repoResponse)
      this.repos = repoResponse.repos

      return this.repos
    }

    return [] as IGithubRepo[]
  }
}
