import { store } from "../store/globalStore";
import { getToken } from "./tokenizer";



/**
 * This class describes a data exchanger that allow translate PlatUML to JSON in mirror way.
 *
 * @class      DataExchanger (name)
 * 
 * @method     getLastData  {(void) => string}   Return last memorized data after translation  
 * @method     toJson       {(string) => string} Translate PlantUML to JSON that used by RF  
 * @method     toPuml       {(string) => string} Translate JSON that used by RF to PlantUML   
 */
class DataExchanger {
	dataHandler: string;

    constructor() {
    	this.dataHandler = '';
    }


    getLastData = (): string => {
    	return this.dataHandler;
    };

    /**
     * Parse JSON scheme of ReactFlow component and translate into PlantUML script
     *
     * @param      {string}  jsonScheme  The json scheme
     * 
     * @return     {string}  PlantUML script in form of string     
     */
    toPuml = (jsonScheme: string): string => {
        const rfScheme = JSON.parse(jsonScheme);

        let puml: string  = '@startuml';

        puml += this._metadataToString();

        if (rfScheme.schemeData) {
        	if (rfScheme.schemeData.nodes) {
        		const nodesArr = rfScheme.schemeData.nodes; 
		        puml += this._elementsToString(nodesArr);    // parse nodes
        	}
        	if (rfScheme.schemeData.edges) {
		        const edgesArr = rfScheme.schemeData.edges; 
		        puml += this._elementsToString(edgesArr);    // parse edges
        	}
        }
        puml += '\n\n@enduml';

        return puml;
    };

    /**
     * Parse data that get from server after parsing PlantUML and adapt it to
     *  form that convinient to ReactFlow component
     *
     * @param      {any}     recievedData  The recieved data
     * 
     * @return     {object}  RF-based JS object to describe RF data
     */
    toJson = (_recievedData: any): object => {
        const rfScheme = {};

        return rfScheme;
    };


    _metadataToString = (): string => {
        const metaObj = store.getSchemePumlMetaInfo();
        let meta: string = '';

        // if (metaObj.defs) {
        //     for (let i in metaObj.defs) {
        //         meta += i + '\n';
        //     }   
        // }

        // meta += '\n';
        // for (let i in metaObj.incs) {
        //     meta += i + '\n';
        // }

        meta += '\n';
        meta += (metaObj.legend) ? metaObj.legend + '\n\n'  : '';
        meta += (metaObj.title)  ? `title ${metaObj.title}` : '';
    
        return meta;
    };

    /**
     * Returns a string representation of collection of elements.
     *
     * @param      {any}     collection  The collection
     * @return     {string}  String representation of the elements.
     */
    _elementsToString = (collection: any): string => {
    	let str: string = '';

    	let tokenHandler = '', prevTokenHandler = '', currParent = '__root__', inBlock = false, tab = '';
    	for (let i of collection) {
    		tokenHandler = getToken(i.data.pumlType);
    		if (prevTokenHandler !== tokenHandler && !inBlock) {
    			str += '\n';
    			prevTokenHandler = tokenHandler;
    		}

    		if ((currParent !== i.parentNode && i.data.pumlType !== 'Rel') && inBlock) {
    			str += '\n}\n';
    			currParent = '__root__'; inBlock = false; tab = '';
    		} else if (((currParent !== i.data.parentNode || i.data.parentNode === null) && i.data.pumlType === 'Rel') && inBlock === true) {
    			str += '\n}\n';
    			currParent = '__root__'; inBlock = false; tab = '';
    		} 


    		if (tokenHandler === 'Person' || 
    			tokenHandler === 'System') {
    			// str += `\n${tab}/' Pos ${i.position.x} ${i.position.y} '/\n`;
    			str += `\n${tab}${i.data.pumlType}(${i.id}, \"${i.data.mainLabel}\"`;
	    		str += (i.data.description) ? `, \"${i.data.description}\"`    : '';
	    		str += (i.data.sprite)      ? `, $sprite=\"${i.data.sprite}\"` : '';
	    		str += (i.data.tags)        ? `, $tags=\"${i.data.tags}\"`     : '';
	    		str += (i.data.link)        ? `, $link=\"${i.data.link}\"`     : '';
	    		str += (i.data.type)        ? `, $type=\"${i.data.type}\"`     : '';
	    		str += (i.data.baseShape)   ? `, ${i.data.baseShape}`          : '';
	    		str += ')';
    		} else if (tokenHandler === 'Boundary') {
    			// str += `\n/' Pos ${i.position.x} ${i.position.y} '/\n`;
    			str += `\n${i.data.pumlType}(${i.id}, \"${i.data.label}\"`;
	    		str += (i.data.type) ? `, $type=\"${i.data.type}\"` : '';
	    		str += (i.data.tags) ? `, $tags=\"${i.data.tags}\"` : '';
	    		str += (i.data.link) ? `, $link=\"${i.data.link}\"` : '';
	    		str += ') {';

	    		currParent = i.id; inBlock = true; tab = '\t';
    		} else if (tokenHandler === 'Rel') {
    			str += `\n${tab}${i.data.pumlType}(${i.source}, ${i.target}, \"${i.label}\"`;
    			str += (i.data.techn)  ? `, \"${i.data.techn}\"`          : '';
    			str += (i.data.descr)  ? `, \"${i.data.descr}\"`          : '';
    			str += (i.data.sprite) ? `, $sprite=\"${i.data.sprite}\"` : '';
    			str += (i.data.tags)   ? `, $tags=\"${i.data.tags}`       : '';
    			str += (i.data.link)   ? `, $link=\"${i.data.link}`       : '';
    			str += ')';
    		}
    	}

    	/* Serve situation when se stayed in block, but collection ended (boundary and eg. is last in collection) */
    	if (inBlock) {
    		str += '\n}';
    	}

    	return str;
    };
};


const dataExchanger = new DataExchanger();
export default dataExchanger;