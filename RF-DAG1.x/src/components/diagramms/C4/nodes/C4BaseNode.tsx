import { useState }  from 'react';
import { Handle, NodeProps, NodeResizer, Position } from 'reactflow';
import Label         from '../../../Label';
// import useStore from '../../../../store/store';


type C4NodeInfo = {
    mainLabel:    string;
    nodeType:     string;
    description?: string;

    sprite?:      string, 
    tags?:        string, 
    link?:        string, 
    type?:        string,  
    
    baseShape?:   string
};


/* 
 * PlantUML params for node:
 * (
 *      alias      -> id, 
 *      label      -> mainLabel, 
 *      ?descr     -> decription, 
 *      ?sprite    -> sprite, 
 *      ?tags      -> tags, 
 *      ?link      -> link, 
 *      ?type      -> nodeType,  
 *      ?baseShape -> shape
 * )
 * 
 */
const C4BaseNode = (nodeProps: NodeProps<C4NodeInfo>) => {
    const [mainLabel,   setMainLabel]   = useState(nodeProps.data.mainLabel);
    const [description, setDescription] = useState(nodeProps.data.description);
    const [sprite,      setSprite]      = useState(nodeProps.data.sprite);        // unused rn
    const [tags,        setTags]        = useState(nodeProps.data.tags);          // unused rn
    const [link,        setLink]        = useState(nodeProps.data.link);          // unused rn
    const [nodeType,    setNodeType]    = useState(nodeProps.data.nodeType);
    const [baseShape,   setBaseShape]   = useState(nodeProps.data.baseShape);     // unused rn

    
    const [isMLShowInput, setIsMLShowInput] = useState(false);    // ML - main label
    const [isNTShowInput, setIsNTShowInput] = useState(false);    // NT - node type
    const [isDShowInput,  setIsDShowInput]  = useState(false);    //  D - description


    const changeMLabel = (e: { target: { value: string; }; }) => {
        setMainLabel(e.target.value);
        // onNodeLabelChange(e.target.value, id);
    }
    const changeNodeType = (e: { target: { value: string; }; }) => {
        setNodeType(e.target.value);
        // onNodeLabelChange(e.target.value, id);
    }
    const changeDescription = (e: { target: { value: string; }; }) => {
        setDescription(e.target.value);
        // onNodeLabelChange(e.target.value, id);
    }



    return (
        <div className='C4BaseNode' style={{minWidth: 250, width: '100%', maxWidth: 'fit-content', minHeight: 150, height: '100%'}}>
            <NodeResizer 
                color='#ff0071' 
                isVisible={nodeProps.selected} 
                minWidth={250} 
                minHeight={150}
            />

            <Label
                className='c4-mainLabel'
                value={mainLabel}
                handleChange={changeMLabel}
                handleBlur={() => setIsMLShowInput(false)}
                handleDoubleClick={() => setIsMLShowInput(true)}
                isShowInput={isMLShowInput}
            />

            <div className='c4-type'>
                <span>[</span>
                <Label
                    className='c4-nodeType'
                    value={nodeType}
                    handleChange={changeNodeType}
                    handleBlur={() => setIsNTShowInput(false)}
                    handleDoubleClick={() => setIsNTShowInput(true)}
                    isShowInput={isNTShowInput}
                />
                <span>]</span>
            </div>
            
            <Label
                className='c4-description'
                value={description}
                handleChange={changeDescription}
                handleBlur={() => setIsDShowInput(false)}
                handleDoubleClick={() => setIsDShowInput(true)}
                isShowInput={isDShowInput}
            />



            {/* For test only - straight way */}
            <Handle 
                id={'1'}
                type='source'
                position={Position.Left}
            />
            <Handle 
                id={'2'}
                type='target' 
                position={Position.Top}
            />
            <Handle 
                id={'3'}
                type='source' 
                position={Position.Right}
            />
            <Handle 
                id={'4'}
                type='source' 
                position={Position.Bottom}
            />
            {/* For test only - straight way */}
        </div>
    );
};

export default C4BaseNode;