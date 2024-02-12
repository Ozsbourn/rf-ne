


/* Allow throw errors to on some levels above */
export type BuilderErrors = {
	type: 'Critical' | 'Error' | 'Warning';
	message: string;
};

export type BuilderResponse = {
	type:   'Edge' | 'Node' | 'Boundary' | 'InvalidPlantUMLObject';
	object: any;
};

class RFObjectsBuilder {
	response:  BuilderResponse;
	lastError?: BuilderErrors | null;

	constructor () {
		this.response = { 
			type: undefined,
			object: {}
		};
		this.lastError = null;
	};

	getRfObject = (object: any) => {
		switch (object.type_.name) {
			/* Return C4BaseNode */
			case 'Person': 
			case 'System':
			case 'System_Ext':
			case 'Container':
			case 'ContainerDb':
				this.response = { type: 'Node', object: this._createNode(object) };
				return this.response;


			/* Return C4Boundary */
			case 'Boundary':
			case 'System_Boundary':
				this.response = { type: 'Boundary', object: this._createBoundary(object) };
				return this.response;
				

			/* Return C4BaseEdge */
			case 'Rel':
			case 'Rel_U': 
			case 'Rel_R': 
			case 'Rel_L': 
			case 'Rel_D': 
				this.response = { type: 'Edge', object: this._createEdge(object) };
				return this.response;

			default: 
				/* TODO: make way to pass making object and throw error to get a feedback from adapter/RF */
				this.response = { type: 'InvalidPlantUMLObject', object: this._createInvalid(object) }
				console.log(object);
				return this.response;
		}
	};	

	_createNode = (object: any) => {
		return {
			id: object.alias,
            type: 'C4Node',
            position: {
                x: 0,
                y: 0,
            },
            data: {
                mainLabel:   object.label,
                nodeType:    object.type_.name,
                typeContent: (object.techn) ? object.techn : object.type_.name,
                description: object.descr,

                pumlType:    object.type_.name,
            }
		};
	};

	_createEdge = (object: any) => {
		return {
			// id:     object.alias,
			id:     'e_' + object.from + '-' + object.to,
            type:   'defaultEdge',
            
            source: object.from,
            target: object.to,
            
            label:  (object.techn) ? (object.label + '\n' + object.techn) : object.label,

            data: {
            	pumlType: object.type_.name,
            }
		};
	};

	_createBoundary = (object: any) => {
		let nodeIds = [];
		for (let i of object.elements) {
			nodeIds.push(i.alias);
		}

		return {
			id:   object.alias,
			type: 'C4BaseBoundary',
			position: {
				x: 0,
				y: 0,
			},
			data: {
				label:    object.label,
				elements: nodeIds,
			}
		}
	};

	_createInvalid = (_object: any) => {
		return {};
	};
};


const rfBuilder = new RFObjectsBuilder();
export default rfBuilder;