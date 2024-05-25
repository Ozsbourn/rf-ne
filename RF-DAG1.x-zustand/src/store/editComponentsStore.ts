import { createWithEqualityFn as create } from 'zustand/traditional';
import { Node, Edge } from 'reactflow';



type editRFCState = {
    editingNode: string;
	setEditingNode: (node: string) => void;
	getEditingNode: () => string,
};


export const useEditStore = create<editRFCState>((set: any, get: any) => (
	{
		editingNode: '',

		setEditingNode: (node: string) => {
			console.log(node);
			set({
				editingNode: node,
			});
		},
		getEditingNode: () => {
			return get().editingNode;
		},
		clearEditingNode: () => {
			set({
				editingNode: '',
			});
		},
    }
));



/**/
type nestedDataState = {
	nodes: Map<string, any>;
	edges: Map<string, any>;

	addNodes: (nodes: Node[]) => void;
	addEdges: (edges: Edge[]) => void;
};


export const useNestedDataObserver = create<nestedDataState>((set: any, get: any) => (
	{
		nodes: new Map<string, any>(), 
		edges: new Map<string, any>(),

		addNodes: (nodes: Node[]) => {
			for (const i of nodes) {
				get().nodes.set(i.id, i.data);	
			}

			set({
				nodes: get().nodes,
			});
		},
		addEdges: (edges: Edge[]) => {
			for (const i of edges) {
				get().edges.set(i.id, i.data);	
			}

			set({
				edges: get().edges,
			});
		},
    }
));