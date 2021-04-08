import { $getRepos } from '@/helpers/github/getRepos'
import { $getUserInfo } from '@/helpers/github/getUserInfo'
import { $imageBuilder } from '@/helpers/images/repoImageBuilder'
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
    async getRepos({ state, commit }: ActionContext<IGithubState, any>, startAt: number) {
      return await $getRepos(startAt)
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
    }
  }
}
