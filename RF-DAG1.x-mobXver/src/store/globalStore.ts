import { SchemeStore } from "./store";
import { layouter }  from "../libs/nodeLayouter";
import initialNodes  from '../initialData/nodes';
import initialEdges  from '../initialData/edges';

import { EditStore } from "./editComponentsStore";


const { nodes: layoutedNodes, edges: layoutedEdges } = layouter.getLayoutedElements(initialNodes, initialEdges);
export const store     = new SchemeStore(layoutedNodes, layoutedEdges);
export const editStore = new EditStore();