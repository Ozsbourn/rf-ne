import { Node, XYPosition } from "reactflow";


/**
 * Front-end builder for create nodes on dnd mode.
 *
 * @class      NodeBuilder (name)
 * 
 * @method     getNode (id, type, position) Return node for choosen type
 */
class NodeBuilder {
	constructor() {}


	/**
	 * Gets the node.
	 *
	 * @param      {string}      id        The identifier
	 * @param      {string}      type      The type of node
	 * @param      {XYPosition}  position  The position of node
	 * 
	 * @return     {<type>}      The node.
	 */
	getNode = (id: string, type: string, position: XYPosition): Node | object => {
		switch (type) {
			case 'C4Node':
				return this._makeC4Node(id, type, position);

			default:
				return this._makeInvalidNode();
		}
	};

	_makeC4Node = (id: string, type: string, position: XYPosition): Node => {
		return {
            id: id,
            type: type,
            position: position,
            data: {
                mainLabel:   'Put here node label',
                description: 'Describe your node here with any description',
                sprite:      undefined,
                tags:        undefined,
                link:        undefined,
                nodeType:    'Put here type of node',
                baseShape:   undefined,

                pumlType:    'Put here type of node',
            },

            parentNode: undefined,
            extent:     undefined,
        };
	};

	_makeInvalidNode = (): object => { return {}; };
};

export const nodeBuilder = new NodeBuilder();
