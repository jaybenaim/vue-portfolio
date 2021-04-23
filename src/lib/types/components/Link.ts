export default class Link {
  href: string

  target?: '_blank' | '_self'

  rel?: 'noopener noreferrer'

  to?: string | Record<string, any>

  className?: string

  linkText?: string

  constructor(link: ILink) {
    this.href = link.href
    this.linkText = link.linkText ? link.linkText : undefined
    this.target = link.target ? link.target : '_blank'
    this.rel = link.rel ? link.rel : 'noopener noreferrer'
    this.to = link.to ? link.to : undefined
    this.className = link.className ? link.className : ''
  }
}

export interface ILink {
  href: string
  linkText?: string
  target?: '_blank' | '_self'
  rel?: 'noopener noreferrer'
  to?: string | Record<string, any>
  className?: string
}
