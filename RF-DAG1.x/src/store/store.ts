// import { create } from 'zustand'; // RFC: deprecate #1937
import { createWithEqualityFn as create } from 'zustand/traditional';
import { shallow }                        from 'zustand/shallow';

import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addNodes,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';

import initialNodes from '../initialData/nodes';
import initialEdges from '../initialData/edges';



type RFState = {
    currId: number;
    getId:  getId;

    nodes:  Node[];
    edges:  Edge[];

    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    
    onConnect: OnConnect;

    appendNode: appendNode;
};


const useStore = create<RFState>((set, get, shallow) => ({
    currId: 0,
    getNewId: () => {
        return `dndnode_${get().currId++}`;
    },

    nodes: initialNodes,
    edges: initialEdges,

    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },

    appendNode: (node: Node) => {
        node.id = get().getNewId();
        set({
            nodes: get().nodes.concat(node),
        });
    }
}));

export default useStore;
