export class Particles {
  color?: string

  particleOpacity?: number

  particlesNumber?: number

  shapeType?: string

  particleSize?: number

  linesColor?: string

  linesWidth?: number

  lineLinked?: boolean

  lineOpacity?: number

  linesDistance?: number

  moveSpeed?: number

  hoverEffect?: boolean

  hoverMode?: string

  clickEffect?: boolean

  clickMode?: string

  constructor(options?: IParticles) {
    this.color = options && options.color ? options.color : '#00f070'
    this.particleOpacity = options && options.particleOpacity ? options.particleOpacity : 0.7
    this.particlesNumber = options && options.particlesNumber ? options.particlesNumber : 75
    this.shapeType = options && options.shapeType ? options.shapeType : 'circle'
    this.particleSize = options && options.particleSize ? options.particleSize : 4
    this.linesColor = options && options.linesColor ? options.linesColor : '#ffffff'
    this.linesWidth = options && options.linesWidth ? options.linesWidth : 1
    this.lineLinked = options && options.lineLinked ? options.lineLinked : true
    this.lineOpacity = options && options.lineOpacity ? options.lineOpacity : 0.4
    this.linesDistance = options && options.linesDistance ? options.linesDistance : 150
    this.moveSpeed = options && options.moveSpeed ? options.moveSpeed : 3
    this.hoverEffect = options && options.hoverEffect ? options.hoverEffect : true
    this.hoverMode = options && options.hoverMode ? options.hoverMode : 'grab'
    this.clickEffect = options && options.clickEffect ? options.clickEffect : true
    this.clickMode = options && options.clickMode ? options.clickMode : 'push'
  }
}

export interface IParticles {
  color?: string
  particleOpacity?: number
  particlesNumber?: number
  shapeType?: string
  particleSize?: number
  linesColor?: string
  linesWidth?: number
  lineLinked?: boolean
  lineOpacity?: number
  linesDistance?: number
  moveSpeed?: number
  hoverEffect?: boolean
  hoverMode?: string
  clickEffect?: boolean
  clickMode?: string
}

export type ParticleOptions =
 'color'
| 'particleOpacity'
| 'particlesNumber'
| 'shapeType'
| 'particleSize'
| 'linesColor'
| 'linesWidth'
| 'lineLinked'
| 'lineOpacity'
| 'linesDistance'
| 'moveSpeed'
| 'hoverEffect'
| 'hoverMode'
| 'clickEffect'
| 'clickMode'
