export class IncludeElements {
  elements?: IIncludeObject

  constructor(elements: IIncludeObject) {
    this.elements = elements
  }
}

export interface IIncludeObject {
  [index: string]: IIncludeData
}

export interface IIncludeData {
  element?: string
  text?: string
  as?: string
  className?: string
}
