import { User } from '@/lib/types/models/User'

/**
 * Converts a gapi.auth2.GoogleUser from to a User model
 *
 * @param user {GoogleUser}
 * @returns User {User}
 */

// eslint-disable-next-line
export const $createUserFromGoogleUser = (user: gapi.auth2.GoogleUser) => {
  const profile = user.getBasicProfile()

  const userProfile = {} as User

  userProfile.name = profile.getName()
  userProfile.email = profile.getEmail()
  userProfile.image = profile.getImageUrl()
  userProfile.username = profile.getName()
  userProfile.isAuthenticated = !!user.getAuthResponse(true)

  return new User(userProfile)
}
