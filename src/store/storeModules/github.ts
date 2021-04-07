import { $getRepos } from '@/helpers/github/getRepos'
import { $getUserInfo } from '@/helpers/github/getUserInfo'
import { IGithubRepo, IGithubUser } from '@/lib/types'
import { IApiError } from '@/lib/types/errors'

import { ActionContext } from 'vuex'

interface IGithubState {
  userInfo: IGithubUser
  repos: IGithubRepo[]
}

interface IApiGithubUser {
  success: true
  user: IGithubUser
}

interface IApiGithubRepos {
  success: true
  repos: IGithubRepo[]
}

export default {
  state: () => ({
    userInfo: {} as IGithubUser,
    repos: [] as IGithubRepo[]
  }),
  getters: {
    getUserInfo: (state: IGithubState) => state.userInfo,
    getRepos: (state: IGithubState) => state.repos
  },
  actions: {
    async getUserInfo({ state, commit }: ActionContext<IGithubState, any>) {
      commit('isLoading', true)

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
        commit('isLoading', false)
        commit('error', error)

        return {
          success: false,
          error
        } as IApiError
      })
    },
    async getRepos({ state, commit }: ActionContext<IGithubState, any>) {
      commit('isLoading', true)

      if (!state.repos || (state.repos && state.repos.length < 1)) {
        return await $getRepos().then(({ data }) => {
          state.repos = data

          const results = {
            success: true,
            repos: state.repos
          } as IApiGithubRepos

          commit('isLoading', false)

          return results
        })
        .catch((error) => {
          commit('error', error)
          commit('isLoading', false)

          return {
            success: false,
            error
          } as IApiError
        })
      }

      commit('isLoading', false)

      return state.repos
    }
  }
}
