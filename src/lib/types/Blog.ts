export interface Blog {
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
