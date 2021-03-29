export interface IGetResponse {
    data: IStatusResponse
  }

export interface IStatusResponse {
    status: string
  }

export interface ITokenResponse {
  isAuthenticated: true
  name: string
  email: string
  createdOn: string
  id: string
  success: true
}
