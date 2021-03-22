import { User } from '../models/User'

export interface RequestTypes {
  /**
   * Sends a get request to the API
   *
   * @param {*} route
   * @returns Results from the route
   *
   * Default route is 'api/'
   */
    $get: (route: string) => Promise<IGetResponse>,

    $signUp: (user: User) => Promise<IUserResponse>
  }

export interface IGetResponse {
    data: IStatusResponse
  }

export interface IStatusResponse {
    status: string
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

export type IApiUserErrorType = 'name' | 'email' | 'password' | 'password2'
