import { 
	BaseEdge, 
	EdgeLabelRenderer, 
	EdgeProps, 
	MarkerType, 
	getSmoothStepPath, } from "reactflow";
// import Label from "../Label";
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
	// const [isShowInput, setIsShowInput] = useState(false);



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
					}}
					className="nodrag nopan"
				>
					{label}
				</button>
				{/*<Label 
					value={label}

					className="nodrag nopan"
					style={{
						position: 'absolute',
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						pointerEvents: 'all',
					}}

					handleChange={(e: any) => {
						setLabel(e.target.value);
					}}
					handleDoubleClick={() => setIsShowInput(true)}
					handleBlur={() => setIsShowInput(false)}
					isShowInput={isShowInput}
				/>*/}
			</EdgeLabelRenderer>
		</>
	);
};

export default CustomEdge;