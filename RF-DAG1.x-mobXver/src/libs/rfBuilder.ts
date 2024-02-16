import { MarkerType, XYPosition } from "reactflow";
// import nodeFormatter  from "./nodeFormatter";



/* Allow throw errors to on some levels above */
export type BuilderErrors = {
    type:    'Critical' | 'Error' | 'Warning';
    message: string;
};

export type BuilderResponse = {
    type:   'Edge' | 'Node' | 'Boundary' | 'Comment' | 'InvalidPlantUMLObject' | undefined;
    object: any;
};

class RFObjectsBuilder {
    response:   BuilderResponse;
    lastError?: BuilderErrors | null;

    constructor () {
        this.response = { 
            type: undefined,
            object: {}
        };
        this.lastError = null;
    };

    getRfObject = (object: any, parent: any = null) => {
        if (object.comment) {
            return this.response = { type: 'Comment', object: this._createInvalid(object)}
        }

        switch (object.type_.name) {
            /* Return C4BaseNode */
            case 'Person': 
            case 'System':
            case 'System_Ext':
            case 'Container':
            case 'ContainerDb':
                this.response = { type: 'Node', object: this._createNode(object, parent) };
                return this.response;


            /* Return C4Boundary */
            case 'Boundary':
            case 'System_Boundary':
                this.response = { type: 'Boundary', object: this._createBoundary(object, parent) };
                return this.response;
                

            /* Return C4BaseEdge */
            case 'Rel':
            case 'Rel_U': 
            case 'Rel_Up': 
            case 'Rel_R': 
            case 'Rel_Right': 
            case 'Rel_L': 
            case 'Rel_Left': 
            case 'Rel_D': 
            case 'Rel_Down': 
                this.response = { type: 'Edge', object: this._createEdge(object, parent) };
                return this.response;

            default: 
                /* TODO: make way to pass making object and throw error to get a feedback from adapter/RF */
                this.response  = { type: 'InvalidPlantUMLObject', object: this._createInvalid(object) };
                this.lastError = { type: 'Error', message: `Couldn't create an object from PlantUML! Doesn't support part of commands now, or check a code for an errors!` };

                // Debug
                console.log(`Invalid object build from puml: ${object}`);
                return this.response;
        }
    };    

    _createNode = (object: any, parent: any = null) => {
        // const pos: XYPosition = nodeFormatter.getNewPosition();
        const pos: XYPosition = { x: 0, y: 0, };

        return {
            id: object.alias,
            type: 'C4Node',
            position: pos,
            data: {
                mainLabel:   object.label,
                description: object.descr,
                sprite:      object.sprite,
                tags:        object.tags,
                link:        object.link,
                nodeType:    object.type_.name,
                baseShape:   object.baseShape,

                pumlType:    object.type_.name,
            },

            parentNode:   parent,
            extent:       (parent) ? 'parent' : undefined,
            expandParent: (parent) ? true : false,
        };
    };

    _createEdge = (object: any, parent: any = null) => {
        return {
            id:     'e_' + object.from + '-' + object.to,
            // type:   'smart',
            type:   'smoothstep',
            
            source: object.from,
            target: object.to,
            
            label:  (object.techn) ? (object.label + '\n' + object.techn) : object.label,
            animated: true,

            markerEnd: {
                type: MarkerType.Arrow,
            },

            data: {
                parentNode: parent,
                pumlType:   object.type_.name,
            }
        };
    };

    _createBoundary = (object: any, parent: any = null) => {
        // const pos: XYPosition = nodeFormatter.getNewPosition();
        const pos: XYPosition = { x: 0, y: 0, };

        let nodeIds = [];
        for (let i of object.elements) {
            nodeIds.push(i.alias);
        }

        return {
            id:   object.alias,
            type: 'C4Boundary',
            position: pos,
            data: {
                label:    object.label,
                elements: nodeIds,

                pumlType: object.type_.name,
            },
            parentNode:   parent,
            extent:       (parent) ? 'parent' : undefined,
            expandParent: (parent) ? true : false,


            className: 'light',
            style: { backgroundColor: 'rgba(120, 120, 120, 0.2)', width: 400, height: 200 },
        }
    };

    _createInvalid = (_object: any): object => {
        return {};
    };
};


const rfBuilder = new RFObjectsBuilder();
export default rfBuilder;