export class Blog {
  id: string

  uid: IBlogUser

  title: string

  author: string

  content: string

  summary: string

  isCreator?: boolean

  image?: string

  imageCaption?: string

  publishDate?: Date

  created?: string

  updated?: string

  tags?: string[]

  constructor(blog: IBlog) {
    this.id = blog.id
    this.uid = blog.uid
    this.title = blog.title
    this.author = blog.author
    this.content = blog.content
    this.summary = blog.summary
    this.image = blog.image
    this.imageCaption = blog.imageCaption
    this.publishDate = blog.publishDate ? blog.publishDate : new Date(blog.created as string)
    this.created = blog.created
    this.updated = blog.updated
    this.tags = blog.tags
  }
}

export interface IApiBlogResponse {
  blog: IBlog
  success: true
}
export interface IBlog {
  id: string
  uid: IBlogUser
  title: string
  author: string
  content: string
  summary: string
  isCreator?: boolean
  image?: string
  imageCaption?: string
  publishDate?: Date
  created?: string
  updated?: string
  tags?: string[]
}
export interface IBlogUser {
  id: string
  name: string
  username?: string
  image?: string
}

export type IBlogIndexType =
| 'title'
| 'author'
| 'content'
| 'summary'
| 'image'
| 'imageCaption'
| 'tags'
