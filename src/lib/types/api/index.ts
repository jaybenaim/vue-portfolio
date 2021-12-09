export interface IApiResponse {
    success: true
    data: any
  }

export interface IApiStatusResponse {
    status: string
  }

export interface IApiTokenResponse {
  isAuthenticated: true
  name: string
  email: string
  createdOn: string
  id: string
  success: true
}
