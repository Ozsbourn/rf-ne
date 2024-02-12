import { 
    BaseEdge, 
    EdgeLabelRenderer, 
    EdgeProps, 
    MarkerType, 
    getSmoothStepPath, } from "reactflow";
import { useState } from "react";



const CustomEdge = (props: EdgeProps) => {
    const [edgePath, labelX, labelY, _offsetX, _offsetY] = getSmoothStepPath({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        sourcePosition: props.sourcePosition,
        targetX: props.targetX,
        targetY: props.targetY,
        targetPosition: props.targetPosition,
    });
    const [label, setLabel] = useState((props.label) ? props.label : 'Put label here');



    return (
        <>
            <BaseEdge 
                id={props.id}
                markerEnd={MarkerType.Arrow}
                path={edgePath} 
            />

            <EdgeLabelRenderer>
                <button
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: 'all',

                        backgroundColor: 'rgba(10, 10, 10, 0)',
                        border: 'none'
                    }}
                    className="nodrag nopan"
                >
                    {label}
                </button>
            </EdgeLabelRenderer>
        </>
    );
};

export default CustomEdge;