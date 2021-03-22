import BASE_API from '../api-base-url'
import { Blog } from '@/lib/types/models/Blog'
import { store } from '@/store'
import { AxiosError } from 'axios'

/**
 * Sends a get request to the API
 *
 * @GET
 *
 * @returns Blog[] | Error
 *
 * @route 'api/blogs'
 */
// eslint-disable-next-line
export const $getBlogs = async (route = '/blogs') => await BASE_API.get(route)
.then(({ data: blogs }) => {
  const blogList = [] as Blog[]

  for (const blog of blogs) {
    blogList.push(new Blog(blog))
  }

  return blogList
})
.catch((err: AxiosError) => err)

/**
 * Get's a blog by its id
 *
 * @GET
 *
 * @returns Blog
 *
 * @route 'api/blogs/:id'
 */
// eslint-disable-next-line
export const $getBlogById = async (blogId: string) => await BASE_API.get(`/blogs/${blogId}`)
.then((response) => response.data)
.catch((err: AxiosError) => {
  store.commit('error', err)

  return undefined
})

/**
 * Create new blog
 *
 * @param Blog
 *
 * @returns Blog
 */
export const $createBlog = async (blog: Blog) => await BASE_API.post('/blogs/new', blog)
 .then((response: any) => response.data)
 .catch((err: AxiosError) => err)
