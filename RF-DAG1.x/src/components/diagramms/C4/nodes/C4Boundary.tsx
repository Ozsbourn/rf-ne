import { useEffect, useState } from "react";



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
            style={{
                backgroundColor: 'rgba(120, 120, 120, 0.2)', 
                width: 400, 
                height: 200,
            }}
        >
            <p style={{ textAlign: 'center' }}>{mainLabel}</p>
        </div>
    );
};

export default C4Boundary;