import { ITabSelectedFilter } from '@/lib/types'
import { IApiError } from '@/lib/types/errors'
import {
 IApiGithubRepos, IGithubData, IGithubRepo, IGithubUser, IQueryOptions
} from '@/lib/types/models/Repo'
import { store } from '@/store'

export class GithubData {
  user?: IGithubUser

  repos?: IGithubRepo[]

  totalRepoCount = 0

  query?: IQueryOptions

  constructor(data?: IGithubData) {
    this.user = data ? data.user : undefined
    this.repos = data ? data.repos : undefined
    this.totalRepoCount = data ? data.totalRepoCount : 0
    this.query = data?.query
  }

  async init() {
    this.user = await this.getUserInfo() || {} as IGithubUser

    const repoResponse: IGithubRepo[] | undefined = await this.getRepos()

    if (repoResponse !== undefined) {
      this.repos = repoResponse
      this.totalRepoCount = this.user?.publicRepos
    }

    const newGithubData = new GithubData({
      user: this.user,
      repos: this.repos,
      totalRepoCount: this.totalRepoCount,
      query: {
        queryString: 'https://api.github.com/users/jaybenaim/repos?start_at=0&sort=created&per_page=30&page=1',
        startAt: 0,
        sort: 'created',
        limit: 10,
        page: 1
      }
    })

    return newGithubData
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
    if (startAt === 0) {
      this.setRepos([])
    }

    const repoResponse: IApiGithubRepos | IApiError = await store.dispatch('getRepos', { startAt, sortBy })

    if (repoResponse.success) {
      this.repos = repoResponse.repos
      this.totalRepoCount = this.user?.publicRepos || 0
      this.query = repoResponse.query
    }

    return this.repos
  }

  async filterRepos(
    query: ITabSelectedFilter,
    addResultsToRepos = false,
    limit?: number,
    page?: number
) {
    if (!addResultsToRepos) {
      this.setRepos([])
      this.totalRepoCount = 0
    }

    console.log(query)
    if (query.relation && query.relation.parent === 'Languages') {
      const repoResponseFromQuery: IApiGithubRepos | IApiError = await store.dispatch('filterRepos', {
        filter: query.relation.child.name.toLowerCase(),
        addResultsToRepos,
        limit,
        page
      })

      const repoResponseFromLang: IApiGithubRepos | IApiError = await store.dispatch('filterRepos', {
        filter: `language:${query.relation.child.name.toLowerCase()}`,
        addResultsToRepos,
        limit,
        page
      })

      let repos1 = [] as IGithubRepo[]
      let repos2 = [] as IGithubRepo[]
      let totalCount = 0

      if (repoResponseFromQuery.success) {
        repos1 = repoResponseFromQuery.repos
        totalCount += repoResponseFromQuery.totalCount
      } else {
        repos1 = []
      }

      if (repoResponseFromLang.success) {
        repos2 = repoResponseFromLang.repos
        totalCount += repoResponseFromLang.totalCount
      } else {
        repos2 = []
      }

      if (!this.repos) {
        this.repos = []
        this.setRepos([])
      }

      // this.setRepos([ ...repos1, ...repos2])
      this.repos = [...this.repos, ...repos1, ...repos2]
      // this.setRepos([...this.repos, ...repos1, ...repos2])

      this.totalRepoCount = totalCount
      this.query = {
        page
      }
    } else {
      const repoResponseFromQuery: IApiGithubRepos | IApiError = await store.dispatch('filterRepos', {
        filter: query.filter.name.toLowerCase(),
        addResultsToRepos,
        limit,
        page
      })

      if (repoResponseFromQuery.success) {
        if (!this.repos) {
          this.repos = []
          this.setRepos([])
        }

        this.repos = [...this.repos, ...repoResponseFromQuery.repos]

        // this.setRepos([...this.repos, ...repoResponseFromQuery.repos])
      }
    }

    return this.repos
  }

  setRepos(repos: IGithubRepo[]) {
    this.repos = repos
    store.commit('setRepos', repos)
  }

  async loadMore(typeOfQuery: 'get' | 'filter', currentFilter: ITabSelectedFilter) {
    const startAt = this.query?.startAt || 0

    const pageLimit = this.query?.limit || 10

    const pageNumber = this.query?.page || 1

    if (typeOfQuery === 'get') {
      this.getRepos(startAt + 10)
    } else {
      this.filterRepos(currentFilter, true, pageLimit, pageNumber + 1)
    }
  }
}
