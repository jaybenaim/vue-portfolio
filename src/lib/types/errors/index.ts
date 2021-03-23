import { IUser } from '../models/User'

export class ApiUserError {
  name?: string

  email?: string

  password?: string

  password2?: string

  isAuthenticated: boolean

  success: false

  constructor(error: IApiUserError) {
    this.name = error.name ? error.name : ''
    this.email = error.email ? error.email : ''
    this.password = error.password ? error.password : ''
    this.password2 = error.password2 ? error.password2 : ''
    this.isAuthenticated = error.isAuthenticated
    this.success = false
  }
  }

export interface IApiUserError {
  name?: string
  email?: string
  password?: string
  password2?: string
  isAuthenticated: boolean
  success: false
}

export interface IApiLoginError {
  success: false
  email: string
  password: string
  user: IUser
}

export interface IApiTokenError {
  success: false
  error: IApiErrorMessage
}

export interface IApiErrorMessage {
  name: string
  message: string
}

export interface IApiError {
  success: false
  error: IApiErrorMessage
}
