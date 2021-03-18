import BASE_API from '../api-base-url'
/**
 * Sends a get request to the API
 *
 * @param {*} route
 * @returns Results from the route
 *
 * Default route is 'api/'
 */
// eslint-disable-next-line
export const $get = async (route = '/') => await BASE_API.get(route).then((response: any) => response).catch((err: any) => err)
