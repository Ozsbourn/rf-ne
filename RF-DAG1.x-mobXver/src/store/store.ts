import { 
    observable, 
    action,
} from 'mobx';
import * as mobx from 'mobx'; 
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

import { CustomNodeConfig } from '../nodeConfig';
import { layouter } from '../libs/nodeLayouter';



export class SchemeStore {
    currId: number = 0;

    // TODO: specify meta like a type
    schemePumlMetaInfo: any = {};

    @observable.deep nodes: Node[];
    @observable.deep edges: Edge[];

    @observable currHandleId: number;
    @observable handlers: CustomNodeConfig[];

    constructor(nodes: Node[], edges: Edge[]) {
        mobx.makeObservable(this);

        this.currId = 0;

        this.nodes = nodes;
        this.edges = edges;

        this.currHandleId = 0;
        this.handlers     = [];
    }



    // Util for make Id for dnd node
    getNewId = () => {
        return `dndnode_${this.currId++}`;
    }

    getNewHandleId = () => {
        return `handleId_${this.currHandleId++}`;
    }

    setSchemePumlMetaInfo = (metaInfo: any) => {
        this.schemePumlMetaInfo = metaInfo;
    }
    getSchemePumlMetaInfo = () => {
        return this.schemePumlMetaInfo;
    }

    getNode = (nodeId: string = '') => {
        return this.nodes.filter((node) => node.id === nodeId);
    };

    @action
    onNodesChange = (changes: NodeChange[]) => {
        this.nodes = applyNodeChanges(changes, this.nodes);
    }

    @action
    onNodeLabelChange = (changes: string, id: string) => {
        this.nodes.map(node => (
            (node.id === id) ? ({
                ...node,
                data: {
                    label: changes
                }
            }) : (
                node
            )
        ));
    }

    @action
    onEdgesChange = (changes: EdgeChange[]) => {
        this.edges = applyEdgeChanges(changes, this.edges);
    } 


    @action
    updateNodeData = (id: string, data: any) => {
        for (let i of this.nodes) {
            if (i.id === id) {
                i.data = {...data};
            }
        } 
    }

    
    @action
    onConnect = (connection: Connection) => {
        this.edges = addEdge(connection, this.edges);
    }

    @action
    appendNode = (node: Node) => {
        this.nodes = [...this.nodes, { 
                ...node
            }
        ]
    }

    /*
     * Right order:
     *      1. delete any edges, where there is id deleted node as src or target
     *      2. delete handles w/ this id
     *      3. delete node w/ this id
     */
    @action
    deleteNode = (id: string) => {
        this.edges    = this.edges.filter(edge => (edge.source !== id && edge.target !== id));
        this.handlers = this.handlers.filter(handle => handle.id !== id);
        this.nodes    = this.nodes.filter(node => node.id !== id);
    }

    @action
    getHandlersCount = (id: string) => {
        const handles = this.handlers.filter((handler) => handler.id === id);

        if (handles.length == 0) {
            return 0;
        }

        return handles[0].handlers.length;
    }

    @action
    getHandlers = (id: string) => {
        const handles = this.handlers.filter((handler) => handler.id === id);

        if (handles.length == 0) {
            return [];
        }

        return handles[0].handlers;
    }

    @action
    getAllHandles = () => {
        return this.handlers;
    }

    @action
    appendHandlers = (handleConfig: CustomNodeConfig) => {
        this.handlers = [...this.handlers, {
            ...handleConfig    
        }];
    }


    @action 
    setAdapterOutput = (jsonScheme: any) => {
        this.schemePumlMetaInfo = {...jsonScheme.meta};

        const { nodes: layoutedNodes, 
                edges: layoutedEdges } = layouter.getLayoutedElements(jsonScheme.schemeData.nodes, 
                                                                      jsonScheme.schemeData.edges);

        this.nodes = structuredClone(layoutedNodes);
        this.edges = structuredClone(layoutedEdges);
    }
    getAdapterOutput = () => {
        return {
            meta: mobx.toJS(this.getSchemePumlMetaInfo()),
            schemeData: {
                nodes: mobx.toJS(this.nodes),
                edges: mobx.toJS(this.edges),
            }
        };
    }
}
