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
    MarkerType,
} from 'reactflow';

import { HandleConfig, CustomNodeConfig } from '../nodeConfig';
import initialNodes   from '../initialData/nodes';
import initialEdges   from '../initialData/edges';
import contextExample from '../initialData/context';



type RFState = {
    currId:   number;
    getNewId: () => string;

    schemePumlMetaInfo: any;
    setSchemePumlMetaInfo: (metaInfo: any) => void;
    getSchemePumlMetaInfo: () => any;

    nodes:  Node[];
    edges:  Edge[];

    currHandleId:   number;
    getNewHandleId: () => string;
    handlers:       CustomNodeConfig[];

    onNodesChange:     (changes: NodeChange[])       => void;
    onNodeLabelChange: (changes: string, id: string) => void;
    deleteNode:        (id: string)                  => void;
    onEdgesChange:     (changes: EdgeChange[])       => void;

    updateNodeData:    (id: string, data: any) => void;
    
    onConnect:         (connection: Connection)      => void;
    appendNode:        (node: Node)                  => void;

    getHandlersCount:  (id: string) => number;
    getHandlers:       (id: string) => HandleConfig[];
    getAllHandles:     ()           => CustomNodeConfig[];
   
    appendHandlers:    (handleConfig: CustomNodeConfig) => void;

    jsonAdapterScheme: string; 
    setAdapterOutput:  (jsonScheme: any) => void;
    getAdapterOutput:  () => string;

    pumlScript: string;
    setPumlScript: (script: string) => void;
    getPumlScript: () => string;
};



const useStore = create<RFState>((set: any, get: any) => ({
        currId: 0,
        getNewId: () => {
            return `dndnode_${get().currId++}`;
        },

        schemePumlMetaInfo: {},
        setSchemePumlMetaInfo: (metaInfo: any) => {
            set({
                schemePumlMetaInfo: metaInfo,
            });
        },
        getSchemePumlMetaInfo: () => {
            return get().schemePumlMetaInfo;
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

        updateNodeData: (id: string, data: any) => {
            for (let i of get().nodes) {
                if (i.id === id) {
                    i.data = data;
                }
            }
        }, 

        onConnect: (connection: Connection) => {
            const newEdge: any = { ...connection, type: 'defaultEdge', label: 'Put ur label here', markerEnd: { type: MarkerType.ArrowClosed } };
            set({
                edges: addEdge(newEdge, get().edges),
            });
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


        jsonAdapterScheme: '',
        setAdapterOutput:  (jsonScheme: any) => {
            console.log(jsonScheme)
            set({
                jsonAdapterScheme:  jsonScheme,
                
                schemePumlMetaInfo: jsonScheme.meta, 

                nodes:              jsonScheme.schemeData.nodes,
                edges:              jsonScheme.schemeData.edges,
            });
        },
        getAdapterOutput:  () => {
            return get().jsonAdapterScheme;
        },

        pumlScript: contextExample,
        setPumlScript: (script: string) => {
            set({
                pumlScript: script,
            });
        },
        getPumlScript: () => {
            return get().pumlScript;
        },
    })
);

export default useStore;