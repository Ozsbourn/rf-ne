import { SchemeStore } from "./store";
import initialNodes  from '../initialData/nodes';
import initialEdges  from '../initialData/edges';

import { EditStore } from "./editComponentsStore";



export const store     = new SchemeStore(initialNodes, initialEdges);
export const editStore = new EditStore();