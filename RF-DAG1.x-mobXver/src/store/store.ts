import { observable, 
		 computed, 
		 action } from 'mobx';
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



export class SchemeStore {
	// @observable 
	currId: number = 0;

	@observable nodes: Node[];
	@observable edges: Edge[];

	constructor(nodes: Node[], edges: Edge[]) {
		this.nodes = nodes;
		this.edges = edges;
	}



	// Util for make Id for dnd node
	getNewId = () => {
		return `dndnode_${this.currId++}`;
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
		this.edges = addEdge(connection, this.edges);
	}

	@computed
	appendNode = (node: Node) => {
        node.id = this.getNewId();
        this.nodes.concat(node);
    }
}
