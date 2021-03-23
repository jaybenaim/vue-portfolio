import {
 $login, $signUp, $verifyToken, $logout
} from '@/helpers/api/auth'

import {
 ApiUserError, IApiLoginError, IApiTokenError, IApiUserError
} from '@/lib/types/errors'
import {
 IApiLoginResponse, IApiUserResponse, ILoginData, ISignUpData, IUser, User
} from '@/lib/types/models/User'
import { AxiosError } from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    windowWidth: window.innerWidth,
    theme: localStorage.getItem('theme') || 'dark',
    errors: {},
    isLoggedIn: false,
    user: {} as User,
    jwtToken: localStorage.getItem('jvp-token'),
    googleIsLoaded: false,

  },
  getters: {
    getWindowSize: (state) => state.windowWidth,
    getScreenSize: (state) => {
      if (state.windowWidth <= 320) {
        return 'sm-phone'
      }

      if (state.windowWidth <= 480 && state.windowWidth >= 321) {
        return 'phone'
      }

      if (state.windowWidth <= 768 && state.windowWidth >= 481) {
        return 'mobile'
      }

      if (state.windowWidth >= 481 && state.windowWidth <= 992) {
        return 'tablet'
      }

      if (state.windowWidth >= 993 && state.windowWidth <= 1200) {
        return 'desktop'
      }

      return 'wide'
    },
    isMobile: (state) => (state.windowWidth <= 992),
    getTheme: (state) => state.theme,
    getErrors: (state) => state.errors,
    isLoggedIn: (state) => state.isLoggedIn,
    getUser: (state) => state.user,
    isGoogleLoaded: (state) => state.googleIsLoaded,
    getJwtToken: (state) => state.jwtToken
  },
  mutations: {
    setWindowWidth(state) {
      state.windowWidth = window.innerWidth
    },
    setInitialTheme(state) {
      const currentTheme = localStorage.getItem('theme') || 'dark'

      state.theme = currentTheme

      document.body.setAttribute('data-theme', currentTheme)
    },
    toggleTheme(state) {
      const currentTheme = localStorage.getItem('theme')
      const themeAfterChange = currentTheme === 'dark' ? 'light' : 'dark'

      state.theme = themeAfterChange

      document.body.setAttribute('data-theme', themeAfterChange)
      localStorage.setItem('theme', themeAfterChange)
    },
    setUser(state, {
      user,
      isLoggedIn = true
      }) {
      state.user = user
      state.isLoggedIn = isLoggedIn
      state.googleIsLoaded = true
    },
    setJwtToken(state, token: string) {
      localStorage.setItem('jvp-token', token)

      state.jwtToken = token
    },
    googleIsLoaded(state, currentState) {
      state.googleIsLoaded = currentState
    },
    error(state, errors) {
      state.errors = errors
      if (process.env.NODE_ENV === 'development') {
        console.log(errors)
      }
    }
  },
  actions: {
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
    async signUp({ commit }, user: ISignUpData) {
      await $signUp(user)
      .then(({ data }) => data as IApiUserResponse)
      .catch((err: AxiosError) => {
        commit('error', err.response?.data)

        return new ApiUserError(err.response?.data) as IApiUserError
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
    async login({ commit }, user: ILoginData) {
      console.log(user)
      await $login(user)
        .then(({ data, data: { user, token } }) => {
          commit('setUser', { user: new User(user) })
          commit('setJwtToken', token.replace('Bearer ', ''))

          return data as IApiLoginResponse
        })
        .catch((err: AxiosError) => {
          const error = err.response?.data as IApiLoginError
          commit('error', error)

          return error
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
    async checkToken({ commit, state, state: { jwtToken: token } }) {
      if (token && token !== 'undefined') {
        await $verifyToken(token)
        .then(async ({ data: userResponse }) => {
             // eslint-disable-next-line
        const user = new User(userResponse as IUser)

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
        commit('setUser', { user: {}, isLoggedIn: false })

        return error
      }
      return state.jwtToken
    },
    logout({ commit }) {
      $logout()

      commit('setUser', {
        user: undefined,
        isLoggedIn: false
      })
    },
    /**
     * Initiate Google Auth and set the user to the vuex store
     *
     * @param signinChanged Function that returns a {Boolean}
     * @param userChanged Function that returns a {gapi.auth2.GoogleUser}
     */
    googleInit({ commit },
        signinChanged?: (signedIn: boolean) => any,
        userChanged?: (user: gapi.auth2.GoogleUser) => any) {
      gapi.load('auth2', () => {
        if (!signinChanged) {
          signinChanged = (signedIn: boolean) => console.log(signedIn)
        }

        if (!userChanged) {
          userChanged = (user: gapi.auth2.GoogleUser) => {
            const profile = user.getBasicProfile()

            const userProfile = {} as User

            if (profile) {
              userProfile.name = profile.getName()
              userProfile.email = profile.getEmail()
              userProfile.image = profile.getImageUrl()
              userProfile.username = profile.getName()

              commit('setUser', {
                user: new User(userProfile)
              })
            }
          }
        }

        const auth2 = gapi.auth2.init({
       // eslint-disable-next-line
        client_id: process.env.VUE_APP_OAUTH_CLIENT_ID
        })

        // Listen for sign-in state changes.
        auth2.isSignedIn.listen(signinChanged)

        // Listen for changes to current user.
        auth2.currentUser.listen(userChanged)

        if (auth2) {
          commit('googleIsLoaded', true)
        }
      })
    }
  },
  modules: {
  }
})

export default store
