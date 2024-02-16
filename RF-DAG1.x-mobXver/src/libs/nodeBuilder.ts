import { XYPosition } from "reactflow";



class NodeBuilder {
	constructor() {}


	getNode = (id: string, type: string, position: XYPosition) => {
		switch (type) {
			case 'C4Node':
				return this._makeC4Node(id, type, position);
			default:
				return this._makeInvalidNode();
		}
	};

	_makeC4Node = (id: string, type: string, position: XYPosition) => {
		return {
            id: id,
            type: type,
            position: position,
            data: {
                mainLabel:   'Put here node label',
                description: 'Describe ur node here w/ any description',
                sprite:      undefined,
                tags:        undefined,
                link:        undefined,
                nodeType:    'Put here type of node',
                baseShape:   undefined,

                pumlType:    'Put here type of node',
            },

            parentNode: null,
            extent:     null,
        };
	};

	_makeInvalidNode = () => { return {}; };
};

export const nodeBuilder = new NodeBuilder();
