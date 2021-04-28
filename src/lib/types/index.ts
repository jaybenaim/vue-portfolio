import Link from './components/Link'
import { IApiErrorMessage } from './errors'
import { IFilter } from './general/FilterList'

import { IIcon, TStyle } from '@/lib/types/components/socialLinks'

export interface IImage {
  src: string
  alt?: string
  ratio?: string
  rounded?: boolean
  caption?: string
}

export interface IApiDeleteResponse {
  success: boolean,
  error: IApiErrorMessage
}

export interface IIndexedArray {
  [index: number]: string
}

export interface IAnimation {
  name: string
  duration?: string | number
  count?: string | number
  fill?: string
  delay?: string | number
}

export interface ITab {
  name: string
  label: string
  icon?: IIcon
}
export interface ITabFilter {
  name: string
  label: string
  icon?: string
  filterType?: IInputType
  filters?: IFilter[]
}

export type IInputType = 'select' | 'boxed'

export interface ITabRelation {
  child: ITabFilter
  parent: string
}

export interface ITabSelectedFilter {
  filter: ITabFilter
  relation: ITabRelation
}
export interface IGalleryItem {
    title?: string
    description?: string
    image?: IImage
}

export interface IGalleryProps {
  itemsToShow?: number
  repeat?: boolean
  hasDrag?: boolean
  arrow?: boolean
  arrowHover?: boolean
}

export interface ISnippetItem {
  title: string
  content: string
  image?: IImage
  link?: Link
}

export interface IMessageData {
  name: string
  email: string
  message: string
  success: boolean
}

export interface INotification {
  message: string
  type?: TStyle
  duration?: number
  position?: TPosition
  hasIcon?: boolean
  autoClose?: boolean
  closeLabel?: string
}

export type TPosition = 'is-top-right' | 'is-top'| 'is-top-left'| 'is-bottom-right' | 'is-bottom' | 'is-bottom-left'
