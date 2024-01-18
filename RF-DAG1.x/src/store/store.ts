// import { create } from 'zustand'; // RFC: deprecate #1937
import { createWithEqualityFn as create } from 'zustand/traditional';
// import { shallow }                        from 'zustand/shallow';

import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    Position
} from 'reactflow';

import { HandleConfig, CustomNodeConfig } from '../nodeConfig';

import initialNodes from '../initialData/nodes';
import initialEdges from '../initialData/edges';



type RFState = {
    currId:   number;
    getNewId: () => void;

    nodes:  Node[];
    edges:  Edge[];

    handlers: CustomNodeConfig[];

    // Get and Id of node that should be edited to pass it into Sheet component 
    // currEditable:  string;
    // setNodeEditId: (id: string) => void;

    onNodesChange:     (changes: NodeChange[]) => void;
    onNodeLabelChange: (changes: string, id: string) => void;
    deleteNode:        (id: string) => void;
    onEdgesChange:     (changes: EdgeChange[]) => void;
    
    onConnect:     (connection: Connection) => void;
    appendNode:    (node: Node) => void;

    getHandlers:   (id: string) => HandleConfig[];
    getAllHandles: () => CustomNodeConfig[];
};


const useStore = create<RFState>((set, get, _shallow) => ({
    currId: 0,
    getNewId: () => {
        return `dndnode_${get().currId++}`;
    },

    nodes: initialNodes,
    edges: initialEdges,

    handlers: [{
        id: '4',
        handlers: [
            {
                type: 'target',
                position: Position.Left,
            },
            {
                type: 'source',
                position: Position.Right,
            },
            {
                type: 'target',
                position: Position.Top,
            },
            {
                type: 'source',
                position: Position.Bottom,
            },
        ]
    }],

    // currEditable: '',

    // setNodeEditId: (id: string) => {
    //     set({
    //         currEditable: id,
    //     });
    // },

    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onNodeLabelChange: (changes: string, id: string) => {
        set({
            nodes: get().nodes.map(node => (
                (node.id === id) ? ({
                    ...node,
                    data: {
                        label: changes
                    }
                }) : (
                    node
                )
            )),
        });
    },

    deleteNode: (id: string) => {
        set({
            nodes: get().nodes.filter(node => node.id !== id),
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
    },

    getHandlers: (id: string) => {
        return get().handlers.filter((handler) => handler.id === id)[0].handlers;
    },

    getAllHandles: () => {
        return get().handlers;
    } 
}));

export default useStore;
