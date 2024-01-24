import { useEffect, useState } from 'react';
import { Handle } from 'reactflow';

import useStore   from '../store/store';
import { HandleConfig } from '../nodeConfig';


type SideHandles = {
	num:     number,
	handles: HandleConfig[],
};

type HandlesBySides = {
	left:   SideHandles,
	top:    SideHandles,
	right:  SideHandles,
	bottom: SideHandles,
};



const HandleHolder = (id: string, w: number, h: number) => {
	const nodeId: string = id;

	const [width,   setWidth] = useState(w);
	const [height, setHeight] = useState(h);

	const { getHandlersCount, getHandlers } = useStore();


	const getHandlesBySides = (width: number, height: number) => {
		
	};

	useEffect(() => {
		const handles = getHandlers(nodeId);
	}, [width, height]);



	return (
		{
            getHandlers(nodeId).map((e) => (
                <Handle 
                    id={e.id}
                    key={e.id}
                    type={e.type} 
                    position={e.position}
                />
            ))
        }
	);
};


export default HandleHolder;