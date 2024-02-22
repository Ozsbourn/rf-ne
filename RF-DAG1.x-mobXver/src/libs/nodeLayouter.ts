import { Node, Edge } from "reactflow";
import dagre          from '@dagrejs/dagre';



type ElementSize = {
	width?:  number;
	height?: number;
};

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

	_maxNodeWidth:  number;
	_maxNodeHeight: number;

	// _sizeMap: Map<string, ElementSize>;

	constructor () {
		this._dagreGraph = new dagre.graphlib.Graph({
			compound:   true,
			multigraph: true,
		});
		this._dagreGraph.setDefaultEdgeLabel(() => ({}));

		this._maxNodeWidth  = 350;
		this._maxNodeHeight = 250;

		// this._sizeMap = new Map<string, ElementSize>([
		// 	['invalid', { width: 0, height: 0 }],
		// ]);
		// this._initSizeMap();
	}



	// _initSizeMap = () => {
	// 	let el = document.querySelector('.C4BaseNode'); 
	// 	this._sizeMap.set('c4node', { width: el.offsetWidth, height: offsetHeight });

	// 	el = document.querySelector('.C4Boundary'); 
	// 	this._sizeMap.set('c4boundary', { width: el.offsetWidth, height: offsetHeight });
	// };


	/**
	 * Gets the layouted elements.
	 *
	 * @param      {Node[]}  nodes             The nodes
	 * @param      {Edge[]}  edges             The edges
	 * @param      {string}  [direction='TB']  The direction ('LR' for
	 *                                         horizontal alignment)
	 * @return     {Object}  The layouted elements.
	 */
	getLayoutedElements = (nodes: Node[], edges: Edge[], direction: string = 'TB'): object => {
		const isHorizontal = direction === 'LR';
		this._dagreGraph.setGraph({
			rankdir: direction,
			nodesep: 15,
			edgesep: 10,
			ranksep: 35,
		});

		nodes.forEach((node) => {
			if (node.parentNode) {
				this._dagreGraph.setParent(node.id, node.parentNode);
			}

			this._dagreGraph.setNode(node.id, {
				width:  (node.width)  ? node.width  : this._maxNodeWidth, 
				height: (node.height) ? node.height : this._maxNodeHeight,
			});
		});
		edges.forEach((edge) => {
		    this._dagreGraph.setEdge(edge.source, edge.target);
		});


		dagre.layout(this._dagreGraph);


		nodes.forEach((node) => {
			const nodeWithPosition = this._dagreGraph.node(node.id);
			node.targetPosition = (isHorizontal) ? 'left'  : 'top'; 
			node.sourcePosition = (isHorizontal) ? 'right' : 'bottom'; 

			if (node.parentNode) {
				const parentNodeWithPosition = this._dagreGraph.node(node.parentNode);

				node.position = {
		        	x: nodeWithPosition.x - (parentNodeWithPosition.x - parentNodeWithPosition.width  / 2) - this._maxNodeWidth  / 2,
		        	y: nodeWithPosition.y - (parentNodeWithPosition.y - parentNodeWithPosition.height / 2) - this._maxNodeHeight / 2,
		     	}
			} else {
				node.position = {
					x: nodeWithPosition.x - this._maxNodeWidth  / 2,
					y: nodeWithPosition.y - this._maxNodeHeight / 2,
				};
			}

			return node;
		});

		return { nodes, edges };
	};


	/**
	 * Gets the size of an element.
	 *
	 * @param      {string}  elementType  The element type
	 * @return     {Object}  The size.
	 */
	// getSize = (elementType: string): object => {
	// 	let sizes: Required<ElementSize> = this._sizeMap.get(elementType);

	// 	if (!sizes) {
	// 		sizes = this._sizeMap.get('invalid');
	// 	}

	// 	return { width: sizes.width, height: sizes.height };
	// };
};
export const layouter = new Layouter();