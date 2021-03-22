import BASE_API from '../api-base-url'
import { store } from '@/store'
import { User } from '@/lib/types/models/User'
import { IApiUserResponse } from '@/lib/types/api'
import { AxiosError } from 'axios'

/**
 * Sends a get request to the API
 *
 * @param {*} route
 * @returns Results from the route
 *
 * Default route is 'api/'
 */
// eslint-disable-next-line
export const $signUp = async (user: User) => await BASE_API
.get('/sign-up')
.then(({ data }) => data as IApiUserResponse)
.catch((err: AxiosError) => store.commit('error', err))
