import { XYPosition, Position } from "./generalTypes";



// interface for the user node items
export type Node<T = any, U extends string | undefined = string | undefined> = {
  id:                string;
  position:          XYPosition;
  data:              T;
  type?:             U;
  style?:            any;
  className?:        string;
  sourcePosition?:   Position;
  targetPosition?:   Position;
  hidden?:           boolean;
  selected?:         boolean;
  dragging?:         boolean;
  draggable?:        boolean;
  selectable?:       boolean;
  connectable?:      boolean;
  deletable?:        boolean;
  dragHandle?:       string;
  width?:            number | null;
  height?:           number | null;
  parentNode?:       string;
  zIndex?:           number;
  extent?:           'parent' | any;
  expandParent?:     boolean;
  positionAbsolute?: XYPosition;
  ariaLabel?:        string;
  focusable?:        boolean;
  resizing?:         boolean;

  // only used internally
  internalsSymbol?: any;
};


/*
[internalsSymbol]?: {
    z?:            number;
    handleBounds?: any;
    isParent?:     boolean;
}
*/
