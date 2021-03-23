import BASE_URL from '../api-base-url'
import {
 ILoginData, ISignUpData,
} from '@/lib/types/models/User'
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
export const $signUp = async (user: ISignUpData) => await BASE_URL
.post('users/sign-up', user)

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
export const $login = async (user: ILoginData) => await BASE_URL
.post('users/login', user)

/**
 * Check if a user is authenticated via JWT
 *
 * @route /users/:id/verify?token={token}
 *
 * @params id - User id
 *
 * @query token - Bearer token
 *
 */
export const $verifyToken = async (token: string) => await BASE_URL
.get(`users/verify?token=${token}`)

export const $logout = () => {
  const auth2 = gapi.auth2.getAuthInstance()

  auth2.signOut().then(() => {
    console.log('User signed out.')
  })
}
