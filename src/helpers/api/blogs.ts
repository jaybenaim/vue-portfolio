import BASE_API from '../api-base-url'
import { store } from '@/store'

/**
 * Sends a get request to the API
 *
 * @returns Results the blogs from the API
 *
 * @route 'api/blogs'
 */
// eslint-disable-next-line
export const $getBlogs = async (route = '/blogs') => await BASE_API.get(route).then((response: any) => response.data).catch((err: any) => store.commit('error', err))
