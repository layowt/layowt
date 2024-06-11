export type CanvasComponents = 'text' | 'timestamp' | 'div'

export type CanvasComponentData = {
  /** What type of component */
  type: CanvasComponents
  /** The id of the component */
  id: string
  /** The classes associated with the component */
  className: string | string[]
  /** The child node */
  children?: React.ReactNode
  /** The style of the component */
  style?: React.CSSProperties
}