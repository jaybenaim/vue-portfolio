export interface IApiBlogResponse {
  id: string
  uid: string
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
  success: true
}
export interface IBlog {
  id: string
  uid: string
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

  uid: string

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

  constructor(blog: IApiBlogResponse) {
    this.id = blog.id
    this.uid = blog.uid
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
