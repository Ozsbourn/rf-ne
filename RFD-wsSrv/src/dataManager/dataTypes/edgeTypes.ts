


type EdgeLabelOptions = {
  label?:               string;
  labelStyle?:          any;
  labelShowBg?:         boolean;
  labelBgStyle?:        any;
  labelBgPadding?:      [number, number];
  labelBgBorderRadius?: number;
};

// interface for the user edge items
type DefaultEdge<T = any> = {
  id:                string;
  type?:             string;
  source:            string;
  target:            string;
  sourceHandle?:     string | null;
  targetHandle?:     string | null;
  style?:            any;
  animated?:         boolean;
  hidden?:           boolean;
  deletable?:        boolean;
  data?:             T;
  className?:        string;
  sourceNode?:       Node;
  targetNode?:       Node;
  selected?:         boolean;
  markerStart?:      any;
  markerEnd?:        any;
  zIndex?:           number;
  ariaLabel?:        string;
  interactionWidth?: number;
  focusable?:        boolean;
  updatable?:        EdgeUpdatable;
} & EdgeLabelOptions;

export type EdgeUpdatable = boolean;

export type SmoothStepPathOptions = {
  offset?:       number;
  borderRadius?: number;
};

type SmoothStepEdgeType<T> = DefaultEdge<T> & {
  type:         'smoothstep';
  pathOptions?: SmoothStepPathOptions;
};

export type BezierPathOptions = {
  curvature?: number;
};

type BezierEdgeType<T> = DefaultEdge<T> & {
  type:         'default';
  pathOptions?: BezierPathOptions;
};

export type Edge<T = any> = DefaultEdge<T> | SmoothStepEdgeType<T> | BezierEdgeType<T>;