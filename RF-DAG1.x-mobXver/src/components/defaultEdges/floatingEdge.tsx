import { useCallback } from 'react';
import { getStraightPath } from 'reactflow';

import { getEdgeParams } from '../../libs/utils.js';
import { store } from '../../store/globalStore.js';



function FloatingEdge({ id, source, target, markerEnd, style }) {
    const sourceNode = useCallback(() => store.getNode(source), [source]);
    const targetNode = useCallback(() => store.getNode(target), [target]);

    if (!sourceNode || !targetNode) {
        return null;
    }
    
    const { sx, sy, tx, ty } = getEdgeParams(sourceNode(), targetNode());

    const [edgePath] = getStraightPath({
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
    });



    return (
        <path
            id={id}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
            style={style}
        />
    );
}

export default FloatingEdge;