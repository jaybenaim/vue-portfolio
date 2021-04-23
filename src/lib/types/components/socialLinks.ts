import Link from './Link'

// eslint-disable-next-line max-len
export type TStyleType = 'is-white'| 'is-black'| 'is-light'| 'is-dark'| 'is-primary'| 'is-info'| 'is-success'| 'is-warning'| 'is-danger'
export type TPackType = 'mdi' | 'fa' | 'fas' | 'far' | 'fad' | 'fal'
export type TSize = 'is-small' | 'is-medium' | 'is-large'

export interface IIcon {
  icon: string
  type?: TStyleType
  pack?: TPackType
  size?: TSize
  customClass?: string
}

export interface ISocialLink {
  label: string
  link?: Link
  icon?: IIcon
  className?: string
}
