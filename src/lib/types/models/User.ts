export interface IUser {
  _id?: string
  name: string
  email: string
  createdOn?: string
  isAuthenticated?: string
  image?: string
  username?: string
  password?: string
  password2?: string
}

export class User {
  id?: string

  name: string

  email: string

  createdOn?: string

  isAuthenticated?: string

  image?: string

  username?: string

  password?: string

  password2?: string

  constructor(user: IUser) {
    this.id = user._id
    this.name = user.name
    this.email = user.email
    this.image = user.image
    this.username = user.username ? user.username : user.name
    this.password = user.password
    this.password2 = user.password2
    this.createdOn = user.createdOn === undefined ? Date.now().toString() : user.createdOn
    this.isAuthenticated = user.isAuthenticated
  }

  getUser() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      image: this.image,
      createdOn: this.createdOn,
      isAuthenticated: this.isAuthenticated
    } as IUser
  }

  getSignUpData() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      password2: this.password2
    } as IUser
  }

  getLoginData() {
    return {
      email: this.email,
      password: this.password
    } as IUser
  }
}
export interface IUserResponse {
    data: IApiUserResponse
  }

export interface IApiUserResponse {
    id: string
    name: string
    email: string
    createdOn: string
    isAuthenticated: boolean
    hasErrors: false
  }

export type IApiUserErrorType = 'name' | 'email' | 'password' | 'password2'

export type IApILoginErrorType = 'email' | 'password'

export interface IApiLoginResponse {
  user: IUser
  email: string
  password: string
  token: string
  success: boolean
  isAuthenticated: boolean
  hasErrors: true
}
