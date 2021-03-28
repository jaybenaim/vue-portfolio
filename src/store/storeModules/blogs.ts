import { ActionContext } from 'vuex'
import { $deleteBlog, $editBlog, $getBlogById } from '@/helpers/api/blogs'
import { IApiDeleteResponse } from '@/lib/types'
import { Blog, IApiBlogResponse, IBlog } from '@/lib/types/models/Blog'
import { IApiBlogResponseError } from '@/lib/types/errors'

const state = {

}

const getters = {

}

const actions = {
  async getBlogById({ commit }: ActionContext<any, any>, blogId: string) {
    return await $getBlogById(blogId).then((response) => {
      const blog = response.data.blog as IBlog

      return {
        success: true,
        blog
      } as IApiBlogResponse
    }).catch((err) => {
      commit('error', err)
      return {
        success: false,
        error: err
      }
    })
  },
  /**
   * @param blog
   * @returns
   */
  async editBlog({ commit }: ActionContext<any, any>, blog: Blog) {
    return await $editBlog(blog).then((response) => {
      const blogResponse = new Blog(response.data)

      return {
        success: true,
        blog: blogResponse
      } as IApiBlogResponse
    }).catch((err) => {
      commit('error', err)
      return {
        success: false,
        error: err
      } as IApiBlogResponseError
    })
  },
  /**
   * @param blogId
   * @returns
   */
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
