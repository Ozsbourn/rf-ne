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
    EdgeProps,
    MarkerType,
} from 'reactflow';

import { HandleConfig, CustomNodeConfig } from '../nodeConfig';
import initialNodes  from '../initialData/nodes';
import initialEdges  from '../initialData/edges';



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

    getJsonScheme:     () => string;
    setJsonScheme:     (scheme: string) => void;
};



const useStore = create<RFState>((set: any, get: any) => ({
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
                edges:    get().edges.filter((edge: Edge) => (edge.source !== id && edge.target !== id)),
                handlers: get().handlers.filter((handle: HandleConfig) => handle.id !== id),
                nodes:    get().nodes.filter((node: Node) => node.id !== id),
            });
        },

        onEdgesChange: (changes: EdgeChange[]) => {
            set({
                edges: applyEdgeChanges(changes, get().edges),
            });
        },

        onConnect: (connection: Connection) => {
            const newEdge: any = { ...connection, type: 'defaultEdge', label: 'Put ur label here', markerEnd: { type: MarkerType.ArrowClosed } };
            set({
                edges: addEdge(newEdge, get().edges),
            });
            // set({
            //     edges: addEdge(connection, get().edges),
            // });
        },

        appendNode: (node: Node) => {
            set({
                nodes: get().nodes.concat(node),
            });
        },

        getHandlersCount:  (id: string) => {
            const handles = get().handlers.filter((handler: HandleConfig) => handler.id === id);

            if (handles.length == 0) {
                return 0;
            }

            return handles[0].handlers.length;
        },

        getHandlers: (id: string) => {
            const handles = get().handlers.filter((handler: HandleConfig) => handler.id === id);

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
        },

        getJsonScheme: () => {
            const nodes = get().nodes;
            const edges = get().edges;
            const handlers = get().handlers;

            const json = {
                nodes, 
                edges, 
                handlers
            }

            return JSON.stringify(json, null, 2);
        },
        setJsonScheme: (scheme: string) => {
            const obj = JSON.parse(scheme);

            set({
                nodes: obj.nodes,
                edges: obj.edges,
                handlers: obj.handlers,
            });
        },
    })
);

export default useStore;