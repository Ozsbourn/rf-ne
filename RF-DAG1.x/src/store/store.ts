import { createWithEqualityFn as create } from 'zustand/traditional';

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
    getNewId: () => string;

    nodes:  Node[];
    edges:  Edge[];

    currHandleId:   number;
    getNewHandleId: () => string;
    handlers:       CustomNodeConfig[];

    onNodesChange:     (changes: NodeChange[])       => void;
    onNodeLabelChange: (changes: string, id: string) => void;
    deleteNode:        (id: string)                  => void;
    onEdgesChange:     (changes: EdgeChange[])       => void;
    
    onConnect:         (connection: Connection)      => void;
    appendNode:        (node: Node)                  => void;

    getHandlers:       (id: string) => HandleConfig[];
    getAllHandles:     ()           => CustomNodeConfig[];

    appendHandlers:    (handleConfig: CustomNodeConfig) => void;
};


const useStore = create<RFState>((set, get, _shallow) => ({
    currId: 0,
    getNewId: () => {
        return `dndnode_${get().currId++}`;
    },

    nodes: initialNodes,
    edges: initialEdges,

    currHandleId: 0,
    getNewHandleId: () => {
        return `handleId_${get().currHandleId++}`;
    },
    handlers: [{
        id: '4',
        handlers: [
            {
                id: 'handle_1',
                type: 'target',
                position: Position.Left,
            },
            {
                id: 'handle_2',
                type: 'source',
                position: Position.Right,
            },
            {
                id: 'handle_3',
                type: 'target',
                position: Position.Top,
            },
            {
                id: 'handle_4',
                type: 'source',
                position: Position.Bottom,
            },
            {
                id: 'handle_5',
                type: 'source',
                position: Position.Bottom,
            },
        ]
    }],

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

    /*
     * Right order:
     *      1. delete any edges, where there is id deleted node as src or target
     *      2. delete handles w/ this id
     *      3. delete node w/ this id
     */
    deleteNode: (id: string) => {
        set({
            edges:    get().edges.filter(edge => (edge.source !== id || edge.target !== id)),
            handlers: get().handlers.filter(handle => handle.id !== id),
            nodes:    get().nodes.filter(node => node.id !== id),
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
        set({
            nodes: get().nodes.concat(node),
        });
    },

    getHandlers: (id: string) => {
        const handles = get().handlers.filter((handler) => handler.id === id);

        if (handles.length == 0) {
            return [];
        }

        return handles[0].handlers;
    },

    getAllHandles: () => {
        return get().handlers;
    },

    appendHandlers: (handleConfig: CustomNodeConfig) => {
        set({
            handlers: get().handlers.concat(handleConfig),
        });
    }
}));

export default useStore;
