import { Node, Edge, getNodesBounds } from "reactflow";
import dagre          from '@dagrejs/dagre';

// import { store } from "../store/globalStore";



class Layouter {
	_dagreGraph: any;

	_nodeWidth:  number;
	_nodeHeight: number;

	constructor () {
		this._dagreGraph = new dagre.graphlib.Graph();
		this._dagreGraph.setDefaultEdgeLabel(() => ({}));

		// TODO: getNodeBounds or smth like that for getting shape sizes
		this._nodeWidth  = 250;
		this._nodeHeight = 250;
	}


	getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
		const isHorizontal = direction === 'LR';
		this._dagreGraph.setGraph({
			rankdir: direction,
		});

		nodes.forEach((node) => {
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


// class Formatter {
// 	/* Constants that defines how much element can be placed in a row and avg space between elements */
// 	_maxElementsInRow: number;
// 	_elementsGap:      number; 

// 	_currInRow:        number;
// 	_lastPosition:     XYPosition;


// 	constructor () {
// 		this._maxElementsInRow = 5;
// 		this._elementsGap      = 300;

// 		this._currInRow    = 0;
// 		this._lastPosition = {
// 			x: 0,
// 			y: 0,
// 		};
// 	};


// 	getNewPosition = () => {
// 		let shiftRow: boolean;
// 		if (this._currInRow > this._maxElementsInRow) {
// 			shiftRow = true;
// 			this._currInRow = 0;
// 		} else {
// 			shiftRow = false;
// 		}

// 		const newPos = { 
// 			x: this._lastPosition.x + ((shiftRow) ? (-this._elementsGap * this._maxElementsInRow) : this._elementsGap),
// 			y: this._lastPosition.y + ((shiftRow) ? this._elementsGap : 0),
// 		};
// 		this._currInRow++;
// 		// console.log(`x - ${this._lastPosition.x + ((shiftRow) ? (-this._elementsGap * this._maxElementsInRow) : this._elementsGap)}`)
// 		// console.log(`y - ${this._lastPosition.y + ((shiftRow) ? this._elementsGap : 0)}`)
// 		this._lastPosition = newPos;


// 		// return newPos;
// 		return {
// 			x: 0,
// 			y: 0,
// 		};
// 	};

// 	endFormatting = () => {
// 		this._currInRow = 0;
// 		this._lastPosition = {
// 			x: 0,
// 			y: 0,
// 		};
// 	};
// };

// const nodeFormatter = new Formatter();
// export default nodeFormatter;