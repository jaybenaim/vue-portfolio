import BASE_URL from '../api-base-url'
import { Blog, IApiBlogResponse } from '@/lib/types/models/Blog'
import { AxiosError } from 'axios'
import { IApiBlogError, IApiBlogResponseError } from '@/lib/types/errors'

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
export const $getBlogs = async (route = '/blogs') => await BASE_URL.get(route)
.then(({ data: blogResponse }) => {
  const blogList = [] as Blog[]

  for (const blog of blogResponse.blogs) {
    blogList.push(new Blog(blog))
  }

  return blogList as Blog[]
})
.catch((err: AxiosError) => err.response?.data)

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
export const $getBlogById = async (blogId: string) => await BASE_URL.get(`/blogs/${blogId}`)

/**
 * Create new blog
 *
 * @param Blog
 *
 * @returns Blog
 */
export const $createBlog = async (blog: Blog) => await BASE_URL.post('/blogs/new', blog)
 .then((response) => {
   const blog = response.data.blog as IApiBlogResponse

   return blog
 })
 .catch((err: AxiosError) => {
   const error = err.response?.data as IApiBlogError

   return {
     success: false,
     error
   } as IApiBlogResponseError
 })

export const $editBlog = async (blog: Blog) => await BASE_URL.patch(`/blogs/${blog.id}`, blog)

 /**
  *
  * @param blogId
  * @returns Promise
  */
export const $deleteBlog = async (blogId: string) => await BASE_URL.delete(`/blogs/${blogId}`)

/**
 *
 * @param userId
 * @returns
 */
export const $getBlogsByUserId = async (userId: string) => await BASE_URL.get(`/blogs/find?user=${userId}`)
