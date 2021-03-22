export interface IBlogApiResponse {
  __v: string | number | undefined | null
  _id: string
  title: string
  author: string
  content: string
  summary: string
  isCreator?: boolean
  image: string
  imageCaption: string
  publishDate: Date
  created: string
  updated: string
  tags: string[]
}
export interface IBlog {
  id: string
  title: string
  author: string
  content: string
  summary: string
  isCreator?: boolean
  image: string
  imageCaption: string
  publishDate: Date
  created: string
  updated: string
  tags: string[]
}

export class Blog {
  id: string

  title: string

  author: string

  content: string

  summary: string

  isCreator?: boolean

  image: string

  imageCaption: string

  publishDate: Date

  created: string

  updated: string

  tags: string[]

  constructor(blog: IBlogApiResponse) {
    this.id = blog._id
    this.title = blog.title
    this.author = blog.author
    this.content = blog.content
    this.summary = blog.summary
    this.image = blog.image
    this.imageCaption = blog.imageCaption
    this.publishDate = blog.publishDate
    this.created = blog.created
    this.updated = blog.updated
    this.tags = blog.tags
  }
}
