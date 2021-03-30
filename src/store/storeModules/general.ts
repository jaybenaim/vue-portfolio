import { $getDbStatus } from '@/helpers/api/get'
import { IApiResponse, IApiStatusResponse } from '@/lib/types/api'
import { IApiError } from '@/lib/types/errors'
import { AxiosError } from 'axios'
import { ActionContext } from 'vuex'

export default {
  state: () => ({
    dbIsReady: false
  }),
  getters: {
    getDbStatus: (state: DbState) => state.dbIsReady
  },
  mutations: {
    setDbStatus(state: DbState, status: boolean) {
      state.dbIsReady = status
    }
  },
  actions: {
    async getDbStatus({ commit }: ActionContext<DbState, any>) {
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

interface DbState {
  dbIsReady: boolean
}
