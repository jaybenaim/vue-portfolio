import BASE_API from '../api-base-url'
import { Blog } from '@/lib/types/Blog'

/**
 * Sends a get request to the API
 *
 * @returns Results the blogs from the API
 *
 * @route 'api/blogs'
 */
// eslint-disable-next-line
export const $getBlogs = async (route = '/blogs') => await BASE_API.get(route)
.then((response) => response.data as Blog[])
.catch((err: any) => err)

/**
 * Create new blog
 *
 * @param Blog
 *
 * @returns Blog
 */
export const $createBlog = async (blog: Blog) => await BASE_API.post('/blogs/new', blog)
 .then((response: any) => response.data)
 .catch((err: any) => err.response)
