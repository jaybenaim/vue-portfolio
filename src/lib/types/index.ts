import { IApiErrorMessage } from './errors'
import { IFilter } from './general/FilterList'

export interface IImage {
  src: string
  alt?: string
  ratio?: string
  rounded?: boolean
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
  label: string
  icon?: string
}
export interface ITabFilter {
  label: string
  icon?: string
  filterType?: IInputType
  filters?: IFilter[]
}

export type IInputType = 'select' | 'boxed'

export interface ITabRelation {
  child: boolean
  parent: string
}

export interface ITabSelectedFilter {
  filter: string
  relation: ITabRelation
}
