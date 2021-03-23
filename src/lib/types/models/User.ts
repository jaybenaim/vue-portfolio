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
    this.id = user.id
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
    } as ISignUpData
  }

  getLoginData() {
    return {
      email: this.email,
      password: this.password
    } as ILoginData
  }
}

export interface IUser {
  id?: string
  name: string
  email: string
  createdOn?: string
  isAuthenticated?: string
  image?: string
  username?: string
  password?: string
  password2?: string
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
    success: true
  }

export type IApiUserErrorType = 'name' | 'email' | 'password' | 'password2'

export type IApILoginErrorType = 'email' | 'password'

export interface IApiLoginResponse {
  user: IUser
  email: string
  password: string
  token: string
  success: true
  isAuthenticated: boolean
}

export interface ILoginData {
  email: string
  password: string
}
export interface ISignUpData {
  name: string,
  email: string
  password: string
  password2: string
}
