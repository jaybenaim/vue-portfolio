import { IUserResponse, User } from '../models/User'

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
