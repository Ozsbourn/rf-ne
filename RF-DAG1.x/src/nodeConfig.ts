import { HandleType, Position }  from 'reactflow';



export type HandleConfig = {
	id:       string,
	type:     HandleType;
	position: Position;
};

export type CustomNodeConfig = {
	id:       string;
	handlers: HandleConfig[];
}; 

