import BASE_URL from '../api-base-url'
import { store } from '@/store'
import { AxiosError } from 'axios'
import { IApiStatusResponse } from '@/lib/types/api'

/**
 * Sends a get request to the API
 *
 * @param {*} route
 * @returns Results from the route
 *
 * Default route is 'api/'
 */
// eslint-disable-next-line
export const $get = async (route = '/') => await BASE_URL.get(route).then(({data}) => data as IApiStatusResponse).catch((err: AxiosError) => store.commit('error', err))
