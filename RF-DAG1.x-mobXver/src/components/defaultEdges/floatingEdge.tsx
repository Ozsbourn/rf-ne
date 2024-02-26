import { FC, useCallback, useState } from 'react';
import { 
    EdgeLabelRenderer, 
    EdgeProps, 
    getStraightPath 
} from 'reactflow';

import { getEdgeParams } from '../../libs/utils.js';
import { store }         from '../../store/globalStore.js';
import Label from '../Label.js';



const FloatingEdge: FC<EdgeProps> = ({ id, source, target, markerEnd, style, label }) => {
    const [isShowInput, setIsShowInput] = useState(false);

    const sourceNode = useCallback(() => store.getNode(source), [source]);
    const targetNode = useCallback(() => store.getNode(target), [target]);

    if (!sourceNode || !targetNode) {
        return null;
    }
    
    const { sx, sy, tx, ty } = getEdgeParams(sourceNode(), targetNode());

    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
    });



    return (
        <>
            <path
                id={id}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
                style={style}
            />

            <EdgeLabelRenderer>
                <div 
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        // background: '#ffcc00',
                        padding: 10,
                        borderRadius: 5,
                        fontSize: 11,
                        fontWeight: 500,

                        // pointerEvents: 'all', // allow make an editable svg element

                        textAlign: 'center',
                    }}
                    className='nodrag nopan'
                >
                    <Label 
                        value={label}
                        handleChange={e => store.onEdgeLabelChange(e.target.value, id)}
                        handleBlur={() => setIsShowInput(false)}
                        handleDoubleClick={() => setIsShowInput(true)}
                        isShowInput={isShowInput}
                    />
                </div>
            </EdgeLabelRenderer>
        </>
    );
}

export default FloatingEdge;