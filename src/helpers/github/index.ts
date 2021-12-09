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
        queryString: 'https://api.github.com/users/jaybenaim/repos?start_at=0&sort=created&per_page=10&page=1',
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

  async getRepos(startAt = 0, limit = 10, page = 1, sortBy?: string,) {
    if (startAt === 0) {
      this.repos = []
      this.setRepos([])
    }

    const repoResponse: IApiGithubRepos | IApiError = await store.dispatch('getRepos', {
      startAt,
      limit,
      page,
      sortBy,
    })

    if (repoResponse.success) {
      if (startAt > 0 && this.repos) {
        this.repos = [...this.repos, ...repoResponse.repos]
      } else {
        this.repos = repoResponse.repos
      }

      this.query = repoResponse.query
      this.totalRepoCount = repoResponse.totalCount
    }

    this.setRepos(this.repos as IGithubRepo[])

    return this.repos
  }

  async filterRepos(
    query: ITabSelectedFilter,
    addResultsToRepos = false,
    limit = 10,
    page = 0
) {
    if (page === 0) {
      this.repos = []
    }

    if (query.relation && query.relation.parent === 'Languages') {
      const filterName = query.filter.name
      if (filterName !== 'Languages') {
        const repoResponseFromQuery: IApiGithubRepos | IApiError = await store.dispatch('filterRepos', {
          filter: query.relation.child.name.toLowerCase(),
          addResultsToRepos,
          limit,
          page: page + 1
        })

        const repoResponseFromLang: IApiGithubRepos | IApiError = await store.dispatch('filterRepos', {
          filter: `language:${query.relation.child.name.toLowerCase()}`,
          addResultsToRepos,
          limit,
          page: page + 1
        })

        let repos1 = [] as IGithubRepo[]
        let repos2 = [] as IGithubRepo[]
        let totalCount = 0

        if (repoResponseFromQuery.success) {
          repos1 = repoResponseFromQuery.repos
          totalCount += repoResponseFromQuery.totalCount
        }

        if (repoResponseFromLang.success) {
          repos2 = repoResponseFromLang.repos
          totalCount += repoResponseFromLang.totalCount
        }

        if (this.repos) {
          this.repos = [...this.repos, ...repos1, ...repos2]
        } else {
          this.repos = [...repos1, ...repos2]
        }

        this.totalRepoCount = totalCount
        this.query = {
          page: page + 1
        }
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

        this.totalRepoCount = repoResponseFromQuery.totalCount

        this.repos = repoResponseFromQuery.repos
        console.log(repoResponseFromQuery.repos)
      }
    }

    this.setRepos(this.repos as IGithubRepo[])

    return this.repos
  }

  setRepos(repos: IGithubRepo[]) {
    this.repos = repos
    store.commit('setRepos', repos)
  }

  async loadMore(typeOfQuery: 'get' | 'filter', currentFilter: ITabSelectedFilter) {
    const startAt = this.query?.startAt || 0

    const pageLimit = this.query?.limit || 10

    const pageNumber = this.query?.page || 0

    if (typeOfQuery === 'get') {
      this.getRepos(startAt + 10, 10, pageNumber + 1, 'created')
    } else {
      this.filterRepos(currentFilter, true, pageLimit, pageNumber)
    }
  }
}
