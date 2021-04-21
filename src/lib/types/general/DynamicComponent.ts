import { Component } from 'vue'

export class DynamicComponent {
  component: Component

  data?: IPropsObject

  cachedComponent: Component | undefined

  constructor(component: Component, data?: IPropsObject) {
    this.component = component
    this.data = data

    this.cachedComponent = undefined
  }

  import(): Component {
    if (this.cachedComponent !== undefined) {
      return this.cachedComponent
    }

    this.cachedComponent = this.component as Component

    return this.cachedComponent
  }

  getData(): IPropsObject {
    return this.data ? this.data : {} as IPropsObject
  }
}

export interface IPropsObject {
  // eslint-disable-next-line
  [index: string]: any
}
