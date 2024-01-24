import { Edge } from "./edgeTypes";
import { NodeRemoveChange, NodeSelectionChange } from "./nodeChangeTypes";



export type EdgeSelectionChange = NodeSelectionChange;

export type EdgeRemoveChange    = NodeRemoveChange;

export type EdgeAddChange<EdgeData = any>   = {
    item: Edge<EdgeData>;
    type: 'add';
};
export type EdgeResetChange<EdgeData = any> = {
    item: Edge<EdgeData>;
    type: 'reset';
};


export type EdgeChange =
  | EdgeAddChange
  | EdgeRemoveChange
  | EdgeResetChange
  | EdgeSelectionChange;