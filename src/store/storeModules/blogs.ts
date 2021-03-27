import { ActionContext } from 'vuex'
import { $deleteBlog } from '@/helpers/api/blogs'
import { IApiDeleteResponse } from '@/lib/types'

const state = {

}

const getters = {

}

const actions = {
  async deleteBlog({ commit }: ActionContext<any, any>, blogId: string) {
    return await $deleteBlog(blogId).then(() => ({ success: true } as IApiDeleteResponse)).catch((err) => {
      commit('error', err)
      return { success: false, error: err } as IApiDeleteResponse
    })
  }
}

const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
