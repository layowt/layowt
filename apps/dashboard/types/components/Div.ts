import type { innerHTML, ISOString } from "./utils"
import type { CanvasComponents } from "./CanvasComponents"

/**
 * The data structure of a 'div' component from the database
 */
export interface DivType {
  /** The type of the component (div) */
  type: 'div' extends CanvasComponents ? 'div' : never,
  /** The 'pretty' name of the component */
  name: string,
  /** The description of the component (for the frontend user) */
  description: string,
  /** Timestamp of component creation */
  createdAt: ISOString,
  /** Timestamp of component update */
  updatedAt: ISOString,
  /** 
   *  The data of the component that will be used to generated 
   *  the component in the frontend
   */
  data: {
    /** 
     *  The ID to set on the component (frontend) 
     *  to identify the component 
     *  (TODO: THIS NEEDS A UTIL FUNCTION TO GENERATE)
     * */
    id: string
    /** The name of the component */
    name: string
    /** The styles being added to the component */
    style: string | string[]
    /** Children of the Component */
    children: [],
    /** The type of the component used in a data-attribute */
    dataLayowtType: CanvasComponents
    /** If the component has a container */
    dataLayowtContainer: boolean
    /** The innerHTML of the component */
    innerHTML: innerHTML
  }
}