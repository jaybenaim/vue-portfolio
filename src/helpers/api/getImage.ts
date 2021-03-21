import BASE_API from '../api-base-url'

/**
 * Get's an image url
 *
 * @param {*} base64String as Image
 * @returns image url as string
 *
 */

export const $getImage = async (base64String: string) => {
  const results = await BASE_API.post('/image-upload',
     { image: base64String })

  return results ? results.data.secure_url : 'error'
}
