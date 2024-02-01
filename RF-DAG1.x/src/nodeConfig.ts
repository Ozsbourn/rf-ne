import { HandleType, Position }  from 'reactflow';



/*
 * id - ID of handle
 * type - type of handle [possible vals is: "source" or "target"] 
 * position - position of handle on node [possible vals is: "top", "right", "left" and "bottom"]
 * 
 */
export type HandleConfig = {
	id:       string,
	type:     HandleType;
	position: Position;
};

/*
 * id - ID of node
 * handlers - array of handles for curr node 
 * 
 */
export type CustomNodeConfig = {
	id:       string;
	handlers: HandleConfig[];
}; 

