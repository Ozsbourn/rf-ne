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
} from 'reactflow';

import { HandleConfig, CustomNodeConfig } from '../nodeConfig';

import initialNodes  from '../initialData/nodes';
import initialEdges  from '../initialData/edges';

import { Doc } from 'yjs';
import yjsMiddleware from "zustand-middleware-yjs";
import { WebrtcProvider } from 'y-webrtc';
// import { WebsocketProvider } from 'y-websocket';



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

    getHandlersCount:  (id: string) => number;
    getHandlers:       (id: string) => HandleConfig[];
    getAllHandles:     ()           => CustomNodeConfig[];
   
    appendHandlers:    (handleConfig: CustomNodeConfig) => void;
};



const ydoc = new Doc();
const provider = new WebrtcProvider('room-name', ydoc);
// const provider = new WebsocketProvider('ws://localhost:1234', 'rf-ed-room', ydoc);
const useStore = create<RFState>(
    yjsMiddleware<RFState>(ydoc, 'shared', (set, get) => ({
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
        handlers: [],

        onNodesChange: (changes: NodeChange[]) => {
            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
        },

        onNodeLabelChange: (changes: string, id: string) => {
            set({
                nodes: get().nodes.map((node: any) => (
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
                edges:    get().edges.filter(edge => (edge.source !== id && edge.target !== id)),
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

        getHandlersCount:  (id: string) => {
            const handles = get().handlers.filter((handler) => handler.id === id);

            if (handles.length == 0) {
                return 0;
            }

            return handles[0].handlers.length;
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
    }))
);

export default useStore;