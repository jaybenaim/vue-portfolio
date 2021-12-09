// import { User } from '@/lib/types/models/User'

/**
 * Initiate Google Auth and set the user to the vuex store
 *
 * @param signinChanged Function that returns a {Boolean}
 * @param userChanged Function that returns a {gapi.auth2.GoogleUser}
 */
// export const $googleInit
// = (
//   signinChanged?: (signedIn: boolean) => any,
//   userChanged?: (user: gapi.auth2.GoogleUser) => any
// ) => {
  // gapi.load('auth2', () => {
  //   if (!signinChanged) {
  //     signinChanged = (signedIn: boolean) => console.log(signedIn)
  //   }

  //   if (!userChanged) {
  //     userChanged = (user: gapi.auth2.GoogleUser) => {
  //       const profile = user.getBasicProfile()

  //       const userProfile = {} as User

  //       if (profile) {
  //         userProfile.name = profile.getName()
  //         userProfile.email = profile.getEmail()
  //         userProfile.image = profile.getImageUrl()
  //         userProfile.username = profile.getName()

  //         store.commit('setUser', {
  //           user: new User(userProfile)
  //         })
  //       }
  //     }
  //   }

  //   const auth2 = gapi.auth2.init({
  //   // eslint-disable-next-line
  //   client_id: process.env.VUE_APP_OAUTH_CLIENT_ID
  //   })

  // // Listen for sign-in state changes.
  //   auth2.isSignedIn.listen(signinChanged)

  // // Listen for changes to current user.
  //   auth2.currentUser.listen(userChanged)

  //   if (auth2) {
  //     store.commit('googleIsLoaded', true)
  //   }
  // })
// }
