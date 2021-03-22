import BASE_URL from '../api-base-url'
import { store } from '@/store'
import { IUser } from '@/lib/types/models/User'
import { ApiUserError, IApiUserError, IApiUserResponse } from '@/lib/types/api'
import { AxiosError } from 'axios'

/**
 * Attempts to sign a user in
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
