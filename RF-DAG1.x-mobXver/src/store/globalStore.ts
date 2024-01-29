import { SchemeStore } from "./store";

import initialNodes from '../initialData/nodes';
import initialEdges from '../initialData/edges';



export const store = new SchemeStore(initialNodes, initialEdges);