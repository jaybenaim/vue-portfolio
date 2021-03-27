import {
 $login, $logout, $signUp, $verifyToken
} from '@/helpers/api/auth'
import {
 ApiUserError, IApiLoginError, IApiTokenError, IApiUserError
} from '@/lib/types/errors'
import {
  IApiLoginResponse,
 IApiUserResponse, ILoginData, ISignUpData, IUser, IUserState, User
} from '@/lib/types/models/User'
import { AxiosError } from 'axios'
import { ActionContext } from 'vuex'

const state = {
  errors: {},
  isLoggedIn: false,
  user: {} as User,
  googleUser: {} as gapi.auth2.GoogleUser,
  jwtToken: localStorage.getItem('jvp-token'),
  googleIsLoaded: false,
  signedInWithGoogle: false
}

const getters = {
  getErrors: (state: any) => state.errors,
  isLoggedIn: (state: any) => state.isLoggedIn,
  getUser: (state: any) => state.user,
  getGoogleUser: (state: any) => state.googleUser,
  isGoogleLoaded: (state: any) => state.googleIsLoaded,
  getJwtToken: (state: any) => state.jwtToken,
  isSignedInWithGoogle: (state: any) => state.signedInWithGoogle
}

const mutations = {
  setUser(state: any, {
      user,
      googleUser,
      isLoggedIn = true
      }: IUserState) {
    state.user = user
    state.isLoggedIn = isLoggedIn

    if (googleUser) {
      const gUser = googleUser as gapi.auth2.GoogleUser

      state.googleUser = gUser
      state.googleIsLoaded = true
      state.isLoggedIn = !!gUser.getAuthResponse()
    }
  },
  setLoginStatus(state: any, value: boolean) {
    state.isLoggedIn = value
  },
  setJwtToken(state: any, token: string) {
    localStorage.setItem('jvp-token', token)

    state.jwtToken = token
  },
  googleIsLoaded(state: any, value: boolean) {
    state.googleIsLoaded = value
  },
  signedInWithGoogle(state: any, value = true) {
    state.signedInWithGoogle = value
  },
  error(state: any, errors: any) {
    state.errors = errors
    if (process.env.NODE_ENV === 'development') {
      console.log(errors)
    }
  },
}
const actions = {
    /**
     * Sign up a new user
     *
     * @route /sign-up
     *
     * @param User
     *
     * @returns IApiUserResponse
     *
     */
  async signUp({ commit }: ActionContext<any, any>, user: ISignUpData) {
    return await $signUp(user)
      .then(async ({ data }) => {
        commit('setUser', { user: new User(data.user) })

        // Get Token after initial sign up
        await dispatchEvent(new Event('login', data.user))

        return { ...data.user as IApiUserResponse, success: true }
      })
      .catch((err: AxiosError) => {
        const error = err.response?.data as IApiUserError
        commit('error', error)

        return new ApiUserError(error)
      })
  },
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
  async login({ commit }: ActionContext<any, any>, user: ILoginData) {
    return await $login(user)
        .then(({ data, data: { user, token } }) => {
          commit('setUser', { user: new User(user) })
          commit('setJwtToken', token.replace('Bearer ', ''))

          return data as IApiLoginResponse
        }).catch((err: AxiosError) => {
          const error = err.response?.data as IApiLoginError
          commit('error', new ApiUserError(error))

          return new ApiUserError(error)
        })
  },
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
  async checkToken({ commit, state, state: { jwtToken: token } }: ActionContext<any, any>) {
      // if (state.signedInWithGoogle) {
      //   const googleUser = state.googleUser.getAuthResponse()
      //   console.log(googleUser)
      // }

    if (token && (token !== 'undefined' || token !== undefined)) {
      await $verifyToken(token)
        .then(async ({ data: userResponse }) => {
             // eslint-disable-next-line
        const user = new User(userResponse as IUser)
          console.log(user)
          commit('setUser', { user })
          commit('setJwtToken', token.replace('Bearer ', ''))
        })
        .catch((err: AxiosError) => {
          commit('error', err.response?.data as IApiTokenError)
          commit('setJwtToken', undefined)
          commit('setUser', { user: {}, isLoggedIn: false })

          return err.response?.data as IApiTokenError
        })
    } else {
      const error = {
        error: {
          name: 'MissingToken',
          message: 'Please login.'
        },
        success: false
      } as IApiTokenError

      commit('error', error)
      commit('setJwtToken', undefined)
      commit('setLoginStatus', false)

      return error
    }
    return state.jwtToken
  },
  logout({ commit, state }: ActionContext<any, any>) {
    if (state.signedInWithGoogle) $logout()

    commit('setJwtToken', undefined)
    commit('setUser', {
      user: undefined,
      isLoggedIn: false
    })
  },
    // /**
    //  * Initiate Google Auth and set the user to the vuex store
    //  *
    //  * @param signinChanged Function that returns a {Boolean}
    //  * @param userChanged Function that returns a {gapi.auth2.GoogleUser}
    //  */
    // googleInit({ commit, state },
    //     signinChanged?: (signedIn: boolean) => any,
    //     userChanged?: (user: gapi.auth2.GoogleUser) => any) {
    //   gapi.load('auth2', () => {
    //     if (!signinChanged) {
    //       signinChanged = (signedIn: boolean) => {
    //         commit('signedInWithGoogle', signedIn)

    //         if (signedIn) {
    //           this.dispatch('loginWithGoogle', state.user)
    //         }

    //         return signedIn
    //       }
    //     }

    //     if (!userChanged) {
    //       userChanged = (user: gapi.auth2.GoogleUser) => user
    //     } else {
    //       userChanged = async (user: gapi.auth2.GoogleUser) => {
    //         const userProfile = $createUserFromGoogleUser(user)
    //         console.log(userProfile)
    //         // Create token and generate user Id
    //         // await this.dispatch('loginWithGoogle', userProfile)
    //       }
    //     }

    //     const auth2 = gapi.auth2.init({
    //    // eslint-disable-next-line
    //     client_id: process.env.VUE_APP_OAUTH_CLIENT_ID
    //     })

    //     // Listen for sign-in state changes.
    //     auth2.isSignedIn.listen(signinChanged)

    //     // Listen for changes to current user.
    //     auth2.currentUser.listen(userChanged)

    //     // If google Loaded properly
    //     if (auth2) {
    //       commit('googleIsLoaded', true)
    //     } else {
    //       commit('error', {
    //         error: 'Google failed to load.'
    //       })
    //       console.log('Google failed to load.')
    //     }

    //     // if (auth2.isSignedIn.get()) {
    //     //   const userProfile = auth2.currentUser.get()
    //     //   console.log(userProfile)

    //       // this.dispatch('loginWithGoogle', userProfile)
    //     // }
    //   })
    // },
    // // eslint-disable-next-line
    // async loginWithGoogle({ commit }, gUser: gapi.auth2.GoogleUser) {
    //   await $loginWithGoogle(gUser)
    //   .then(({ data }) => {
    //     const userResponse = data as IApiGoogleLoginResponse
    //     console.log(data)
    //       // if user returns a token and data
    //       // create a new User
    //       // set the current user in the store
    //       // commit('setUser', {
    //       //  user: new User(data),
    //       //  googleUser: user,
    //       //  isLoggedIn: true
    //       // })

    //     commit('setUser', {
    //       user: new User(userResponse.user),
    //       googleUser: gUser,
    //       isLoggedIn: true
    //     })

    //     commit('signedInWithGoogle')

    //     commit('googleIsLoaded', true)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     // throw error
    //     // set isLoggedIn to false
    //     // set user to undefined
    //     // set login status to failed
    //     // return false
    //   })
    // }
}

export default {
  state,
  getters,
  actions,
  mutations
}
