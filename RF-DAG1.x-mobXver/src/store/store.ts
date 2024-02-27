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
import { layouter }         from '../libs/nodeLayouter';



export class SchemeStore {
    currId: number = 0;

    // TODO: specify meta like a type
    schemePumlMetaInfo: any = {};

    @observable.shallow nodes: Node[];
    @observable.shallow edges: Edge[];

    @observable currHandleId: number;
    @observable handlers: CustomNodeConfig[];

    @observable isAnimated: boolean;

    constructor(nodes: Node[], edges: Edge[]) {
        mobx.makeObservable(this);

        this.currId = 0;

        this.nodes = nodes;
        this.edges = edges;
        this.isAnimated = true;

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

    getAnimationStatus = () => {
        return this.isAnimated;
    };
    @action
    disableEdgeAnimations = () => {
        this.isAnimated = !this.isAnimated;
        this.edges = this.edges.map((edge: Edge) => {
            return { ...edge, animated: this.isAnimated };
        });
    };


    setSchemePumlMetaInfo = (metaInfo: any) => {
        this.schemePumlMetaInfo = metaInfo;
    }
    getSchemePumlMetaInfo = () => {
        return this.schemePumlMetaInfo;
    }
    

    /**
     * Called on custom node label change.
     * 
     * @status !Unused!
     *
     * @param      {string}  changes  The changes
     * @param      {string}  id       The identifier
     */
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
    onEdgeLabelChange = (changes: string, id: string) => {
        this.edges = this.edges.map(edge => (
            (edge.id === id) ? ({
                ...edge,
                label: changes,
            }) : (
                edge
            )
        ));
    }

    @action
    onNodesChange = (changes: NodeChange[]) => {
        this.nodes = applyNodeChanges(changes, this.nodes);
    }
    @action
    onEdgesChange = (changes: EdgeChange[]) => {
        this.edges = applyEdgeChanges(changes, this.edges);
    } 
    @action
    onConnect = (connection: Connection) => {
        const newEdge: Edge = { 
            ...connection, 
            id: `e-${connection.source}-${connection.target}`, 
            type: 'floating', 
            label: 'Set me in Puml editor', 
            data: { 
                pumlType: 'Rel',
            }, 
            animated: true, 
        }
        this.edges = addEdge(newEdge, this.edges);
    }


    @action
    updateNodeData = (id: string, data: any) => { // TODO: specify type for node data's
        this.nodes = this.nodes.map(node => {
            return (node.id === id) ? (
                    node = {
                        ...node,
                        data: {
                            ...node.data, // Destructuring here allow pass not full object as data 
                                          // for update node data state
                            ...data,
                        }
                    }
                ) : (
                    node
                );
        });
    }
    @action /* Unused now, should use later after using data field in edges */
    updateEdgeData = (id: string, data: any) => { // TODO: specify type for edge data's
        this.edges = this.edges.map(edge => {
            return (edge.id === id) ? (
                    edge = {
                        ...edge, 
                        data: {
                            ...edge.data,
                            ...data,
                        }
                    }
                ) : (
                    edge
                );
        });
    };

    
    getNode = (nodeId: string) => {
        const node = mobx.toJS(this.nodes.filter((node) => node.id === nodeId)[0]);
        return node;
    };
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
        this.handlers = this.handlers.filter(handle => { if (handle) { handle.id !== id }});
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

        
        const existedNodeIds = new Map();
        const sizes = document.querySelector('.C4BaseNode')
        layoutedNodes.map((node: Node) => {
            node.width  = sizes.offsetWidth;
            node.height = sizes.offsetHeight; 
            existedNodeIds.set(node.id, 1);
        });


        this.nodes = structuredClone(layoutedNodes);

        // filtering til exist ignoring of boundaries
        this.edges = structuredClone(layoutedEdges.filter(edge => existedNodeIds.get(edge.source) && existedNodeIds.get(edge.target)));
        // this.edges = structuredClone(layoutedEdges);
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
