import { useEffect, useState } from "react";
import { NodeResizer } from "reactflow";



export type C4BoundaryInfo = {

};


/* 
 * PlantUML params for boundary:
 * (
 *      alias      -> id, 
 *      label      -> mainLabel,
 *      
 *      ?type      -> nodeType,  
 *      
 *      ?tags      -> tags, 
 *      ?link      -> link,
 * ) 
 * 
 */
const C4Boundary = (nodeProps: any) => {
	const [mainLabel,   setMainLabel] = useState(nodeProps.data.label);
    const [nodeType,    setNodeType]  = useState(nodeProps.data.nodeType);
    const [tags,        setTags]      = useState(nodeProps.data.tags);
    const [link,        setLink]      = useState(nodeProps.data.link);

    useEffect(() => {
        // TODO: sub on store changes here
    }, []);


    return (
        <div 
            className='boundaryBase'
        >
            <NodeResizer 
                color='#ff0071' 
                isVisible={nodeProps.selected} 
                minWidth={250} 
                minHeight={150}
            />

            <p style={{ 
                textAlign: 'center' 
            }}>
                {mainLabel}
            </p>
        </div>
    );
};

export default C4Boundary;