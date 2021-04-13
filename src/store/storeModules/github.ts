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

export default {
  state: () => ({
    userInfo: {} as IGithubUser,
    repos: [] as IGithubRepo[]
  }),
  getters: {
    getUserInfo: (state: IGithubState) => state.userInfo,
    getRepos: (state: IGithubState) => state.repos,
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
          htmlUrl: data.html_url
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
    async getRepos({ state, commit }: ActionContext<IGithubState, any>, { startAt, sortBy }: IApiRepoOptions) {
      return await $getRepos(startAt, sortBy)
        .then(({ data }) => {
          const repos = data.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            homepage: repo.homepage,
            htmlUrl: repo.html_url,
            cloneUrl: repo.clone_url,
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            description: repo.description,
            language: repo.language,
            image: $imageBuilder(repo.name, repo.language)
          } as IGithubRepo))

          state.repos = state.repos.concat(repos)

          const results = {
            success: true,
            repos
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
      { state, commit }:
      ActionContext<IGithubState, any>,
        payload: any
      ) {
      const { filter: query, addResultsToRepos } = payload

      return await $filterRepos(query)
      .then(({ data }) => {
        const matchedRepos = data.items.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          homepage: repo.homepage,
          htmlUrl: repo.html_url,
          cloneUrl: repo.clone_url,
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
          description: repo.description,
          language: repo.language,
          image: $imageBuilder(repo.name, repo.language)
        } as IGithubRepo))

        if (!addResultsToRepos) {
          state.repos = matchedRepos
        }

        const results = {
          success: true,
          repos: matchedRepos
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
