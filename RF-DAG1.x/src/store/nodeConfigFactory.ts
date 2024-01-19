import { Position } from 'reactflow';
import { HandleConfig } from '../nodeConfig';



export const createNodeConfigPattern = (nodeId: string, IdsArr: string[]) => {
	// Also isn't good way tho
	const handles: HandleConfig[] = [
		{
			id: IdsArr[0],
            type: 'source',
            position: Position.Left,
        },
        { 
			id: IdsArr[1],
			type: 'source',
            position: Position.Right,
        },
        {
            id: IdsArr[2],
			type: 'source',
            position: Position.Top,
        },
        {
        	id: IdsArr[3],
			type: 'source',
            position: Position.Bottom,
		},
	];
	const object = {
		id: nodeId,
		handlers: handles,
	};

	return object;
}