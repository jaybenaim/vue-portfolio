import { $getDbStatus } from '@/helpers/api/get'
import { IApiResponse, IApiStatusResponse } from '@/lib/types/api'
import { IApiError } from '@/lib/types/errors'
import { AxiosError } from 'axios'
import { ActionContext } from 'vuex'

export default {
  state: () => ({
    dbIsReady: false,
    isLoading: false
  }),
  getters: {
    getDbStatus: (state: GeneralState) => state.dbIsReady,
    isLoading: (state: GeneralState) => state.isLoading
  },
  mutations: {
    setDbStatus(state: GeneralState, status: boolean) {
      state.dbIsReady = status
    },
    isLoading(state: GeneralState, status: boolean) {
      state.isLoading = status
    }
  },
  actions: {
    async getDbStatus({ commit }: ActionContext<GeneralState, any>) {
      return await $getDbStatus()
      .then(({ data }) => {
        commit('setDbStatus', true)

        return {
          success: true,
          data: data as IApiStatusResponse
        } as IApiResponse
      })
      .catch((error: AxiosError) => {
        commit('error', error)

        return {
          success: false,
          error
        } as IApiError
      })
    }
  }
}

interface GeneralState {
  dbIsReady: boolean
  isLoading: boolean
}
