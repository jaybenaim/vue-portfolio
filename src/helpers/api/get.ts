import BASE_URL from '../api-base-url'

/**
 * Sends a get request to the API
 *
 * @param {*} route
 * @returns Results from the route
 *
 * Default route is 'api/'
 */
// eslint-disable-next-line
export const $getDbStatus = async (route = '/') => await BASE_URL.get(route)
