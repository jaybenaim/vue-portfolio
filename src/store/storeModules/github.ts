import { $filterRepos } from '@/helpers/github/filterRepos'
import { $getRepos } from '@/helpers/github/getRepos'
import { $getUserInfo } from '@/helpers/github/getUserInfo'
import { $imageBuilder } from '@/helpers/images/repoImageBuilder'
import { IApiError } from '@/lib/types/errors'
import {
  IApiGithubRepos,
 IApiGithubUser, IApiRepoOptions, IGithubRepo, IGithubState, IGithubUser
} from '@/lib/types/models/Repo'

import { ActionContext } from 'vuex'

// Get url for deployed sites

const getHomePageUrl = (repo: any) => {
  if (repo.has_pages) {
    return `https://jaybenaim.github.io/${repo.name}`
  }

  return undefined
}

export default {
  state: () => ({
    userInfo: {} as IGithubUser,
    repos: [] as IGithubRepo[]
  }),
  getters: {
    getUserInfo: (state: IGithubState) => state.userInfo,
    getRepos: (state: IGithubState) => [...new Set(state.repos)],
  },
  mutations: {
    setRepos(state: IGithubState, repos: IGithubRepo[]) {
      state.repos = repos
    }
  },
  actions: {
    async getUserInfo({ state, commit }: ActionContext<IGithubState, any>) {
      return await $getUserInfo().then(({ data }) => {
        const userData = {
          publicRepos: data.public_repos,
          gitUrl: data.html_url
        }

        state.userInfo = userData

        const results = {
          success: true,
          user: userData
        } as IApiGithubUser

        commit('isLoading', false)

        return results
      })
      .catch((error) => {
        commit('error', error)

        return {
          success: false,
          error
        } as IApiError
      })
    },
    async getRepos({ state, commit }: ActionContext<IGithubState, any>,
      {
        startAt = 0,
        limit = 10,
        page = 1,
        sortBy = 'created'
       }: IApiRepoOptions) {
      return await $getRepos(startAt, limit, page, sortBy)
        .then((response) => {
          const { data, request: { responseURL } } = response

          const repos = data.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            homepageUrl: getHomePageUrl(repo),
            gitUrl: repo.html_url,
            cloneUrl: repo.clone_url,
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            description: repo.description,
            language: repo.language,
            image: $imageBuilder(repo.name, repo.language)
          } as IGithubRepo))

          const results = {
            success: true,
            repos,
            query: {
              queryString: responseURL,
              startAt,
              sort: sortBy,
              page,
              limit
            },
            totalCount: state.userInfo.publicRepos,
          } as IApiGithubRepos

          return results
        })
        .catch((error) => {
          commit('error', error)

          return {
            success: false,
            error
          } as IApiError
        })
    },
    async filterRepos(
      { commit }:
      ActionContext<IGithubState, any>,
        payload: any
      ) {
      const {
      filter:
        query,
        limit = 10,
        page = 1
      } = payload

      return await $filterRepos(query, limit, page)
      .then((response) => {
        const { data, request: { responseURL } } = response

        const matchedRepos = [] as IGithubRepo[]
        for (const repo of data.items) {
          if (query !== 'deployed') {
            matchedRepos.push({
              id: repo.id,
              name: repo.name,
              homepageUrl: getHomePageUrl(repo),
              gitUrl: repo.html_url,
              cloneUrl: repo.clone_url,
              createdAt: repo.created_at,
              updatedAt: repo.updated_at,
              description: repo.description,
              language: repo.language,
              image: $imageBuilder(repo.name, repo.language)
            } as IGithubRepo)
          }

          if (repo.has_pages) {
            matchedRepos.push({
              id: repo.id,
              name: repo.name,
              homepageUrl: getHomePageUrl(repo),
              gitUrl: repo.html_url,
              cloneUrl: repo.clone_url,
              createdAt: repo.created_at,
              updatedAt: repo.updated_at,
              description: repo.description,
              language: repo.language,
              image: $imageBuilder(repo.name, repo.language)
            } as IGithubRepo)
          }
        }

        const results = {
          success: true,
          repos: matchedRepos,
          totalCount: data.total_count,
          currentPage: page,
          query: {
            queryString: responseURL,
            limit,
            page
          },
        } as IApiGithubRepos

        return results
      }).catch((error) => {
        commit('error', error)

        return {
          success: false,
          error
        } as IApiError
      })
    }
  }
}
