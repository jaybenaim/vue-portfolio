import BASE_URL from '../api-base-url'
import { store } from '@/store'
import {
 IApiLoginResponse, IApiUserResponse, IUser
} from '@/lib/types/models/User'
import { AxiosError } from 'axios'
import { ApiUserError, IApiLoginError, IApiUserError } from '@/lib/types/errors'

/**
 * Sign in the user
 *
 * @route /sign-up
 *
 * @param User
 *
 * @returns IApiUserResponse
 *
 */
// eslint-disable-next-line
export const $signUp = async (user: IUser) => await BASE_URL
.post('users/sign-up', user)
/**
 * @todo Set isLoggedIn to true and anything else needed
*/
.then(({ data }) => data as IApiUserResponse)
.catch((err: AxiosError) => {
  store.commit('error', err.response?.data)

  return new ApiUserError(err.response?.data) as IApiUserError
})

/**
 * Sign in the user
 *
 * @route /login
 *
 * @param User
 *
 * @returns IApiUserResponse
 *
 */
// eslint-disable-next-line
export const $login = async (user: IUser) => await BASE_URL
.post('users/login', user)
/**
 * @todo Set isLoggedIn to true and anything else needed
*/
.then(({ data }) => data as IApiLoginResponse)
.catch((err: AxiosError) => {
  store.commit('error', err.response?.data)

  return err.response?.data as IApiLoginError
})
