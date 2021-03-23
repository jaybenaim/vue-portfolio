import { IUser } from '../models/User'

export class ApiUserError {
  name?: string

  email?: string

  password?: string

  password2?: string

  isAuthenticated: boolean

  hasErrors: true

  constructor(error: IApiUserError) {
    this.name = error.name ? error.name : ''
    this.email = error.email ? error.email : ''
    this.password = error.password ? error.password : ''
    this.password2 = error.password2 ? error.password2 : ''
    this.isAuthenticated = error.isAuthenticated
    this.hasErrors = true
  }
  }

export interface IApiUserError {
  name?: string
  email?: string
  password?: string
  password2?: string
  isAuthenticated: boolean
  hasErrors: true
}

export interface IApiLoginError {
  hasErrors: true
  email: string
  password: string
  user: IUser
}
