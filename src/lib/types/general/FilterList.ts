export class FilterData {
  filters?: IFilter[] | undefined

  data?: IFilterResult[] | []

  constructor(filters?: IFilter[], data?: IFilterResult[]) {
    this.filters = filters
    this.data = data
  }

  getFilteredResults(filter: string) {
    if (this.data) {
      return this.data.filter((item: IFilterResult) => item.filterName === filter)
    }

    return [] as IFilterResult[]
  }
}

export interface IFilter {
  name: string
  label: string
  icon?: string
}

export interface IFilterResult {
  filterName: string
  result: object[]
}

export type IFilterType = 'is-boxed' | 'is-toggle' | 'is-toggle-rounded'
