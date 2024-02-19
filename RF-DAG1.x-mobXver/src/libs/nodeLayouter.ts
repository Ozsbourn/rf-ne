import { Node, Edge } from "reactflow";
import dagre          from '@dagrejs/dagre';



/**
 * This class describes a layouter. In base: dagre layouting library.
 *
 * @class      Layouter (name)
 * 
 * @method     getLayoutedElements Return nodes and changed align on flow [default: TB (top-to-bottom)]
 * 
 */
class Layouter {
	_dagreGraph: any;

	_nodeWidth:  number;
	_nodeHeight: number;

	constructor () {
		this._dagreGraph = new dagre.graphlib.Graph();
		this._dagreGraph.setDefaultEdgeLabel(() => ({}));

		// TODO: getNodeBounds or smth like that for getting shape sizes
		this._nodeWidth  = 275;
		this._nodeHeight = 200;
	}


	/**
	 * Gets the layouted elements.
	 *
	 * @param      {Node[]}  nodes             The nodes
	 * @param      {Edge[]}  edges             The edges
	 * @param      {string}  [direction='TB']  The direction ('LR' for horizontal alignment)
	 * @return     {Object}  The layouted elements.
	 */
	getLayoutedElements = (nodes: Node[], edges: Edge[], direction: string = 'TB'): object => {
		const isHorizontal = direction === 'LR';
		this._dagreGraph.setGraph({
			rankdir: direction,
		});

		nodes.forEach((node) => {
			// const rect = getNodesBounds([node]);
			this._dagreGraph.setNode(node.id, {
				width:  this._nodeWidth,
				height: this._nodeHeight,
			});
		});
		edges.forEach((edge) => {
		    this._dagreGraph.setEdge(edge.source, edge.target);
		});


		dagre.layout(this._dagreGraph);


		nodes.forEach((node) => {
			const nodeWithPosition = this._dagreGraph.node(node.id);
			node.targetPosition = (isHorizontal) ? 'left' : 'top'; 
			node.sourcePosition = (isHorizontal) ? 'right' : 'bottom'; 

			node.position = {
				x: nodeWithPosition.x - this._nodeWidth  / 2,
				y: nodeWithPosition.y - this._nodeHeight / 2,
			};

			return node;
		});

		return { nodes, edges };
	};
};
export const layouter = new Layouter();