export interface IImage {
  src: string
  alt?: string
  ratio?: string
  rounded?: boolean
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
