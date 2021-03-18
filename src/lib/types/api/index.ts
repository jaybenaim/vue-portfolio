export interface RequestTypes {
  /**
   * Sends a get request to the API
   *
   * @param {*} route
   * @returns Results from the route
   *
   * Default route is 'api/'
   */
    $get: (route: string) => Promise<IGetResponse>
  }

interface IGetResponse {
    data: IStatusResponse
  }

interface IStatusResponse {
    status: string
  }
