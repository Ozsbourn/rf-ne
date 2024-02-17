import { useState }  from 'react';
import { 
    Handle, 
    NodeProps, 
    NodeResizer, 
    NodeToolbar, 
    Position }  from 'reactflow';
import Label    from '../../../Label';

import { editStore, store } from '../../../../store/globalStore';


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
    const [isMLShowInput, setIsMLShowInput] = useState(false);    // ML - main label
    const [isNTShowInput, setIsNTShowInput] = useState(false);    // NT - node type
    const [isDShowInput,  setIsDShowInput]  = useState(false);    //  D - description


    /**
     * @way  In bodies of these funcs should use useRef instead setters(?)
     */
    const changeMLabel      = (e: { target: { value: string; }; }) => { /*setMainLabel(e.target.value);*/ }
    const changeNodeType    = (e: { target: { value: string; }; }) => { /*setNodeType(e.target.value);*/ }
    const changeDescription = (e: { target: { value: string; }; }) => { /*setDescription(e.target.value);*/ }

    const handleCopy   = () => {};
    const handleEdit   = () => { editStore.setEditingNode(nodeProps.id); };
    const handleDelete = () => { store.deleteNode(nodeProps.id); };



    return (
        <div className='C4BaseNode' style={{minWidth: 250, width: '100%', maxWidth: 'fit-content', minHeight: 150, height: '100%'}}>
            <NodeResizer 
                color='#ff0071' 
                isVisible={nodeProps.selected} 
                minWidth={250} 
                minHeight={150}
            />

            <NodeToolbar 
                className='controlsNodePanel' 
                isVisible={nodeProps.toolbarVisible}
                position={nodeProps.toolbarPosition}
            >
                <button onClick={handleCopy}>Copy</button>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </NodeToolbar>

            <Label
                className='c4-mainLabel'
                value={nodeProps.data.mainLabel}
                handleChange={changeMLabel}
                handleBlur={() => setIsMLShowInput(false)}
                handleDoubleClick={() => setIsMLShowInput(true)}
                isShowInput={isMLShowInput}
            />

            <div className='c4-type'>
                <span>[</span>
                <Label
                    className='c4-nodeType'
                    value={nodeProps.data.nodeType}
                    handleChange={changeNodeType}
                    handleBlur={() => setIsNTShowInput(false)}
                    handleDoubleClick={() => setIsNTShowInput(true)}
                    isShowInput={isNTShowInput}
                />
                <span>]</span>
            </div>
            
            <Label
                className='c4-description'
                value={nodeProps.data.description}
                handleChange={changeDescription}
                handleBlur={() => setIsDShowInput(false)}
                handleDoubleClick={() => setIsDShowInput(true)}
                isShowInput={isDShowInput}
            />



            {/* For test only - straight way */}
            <Handle 
                id={'1'}
                type='target'
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
                position={Position.Bottom}
            />
            <Handle 
                id={'4'}
                type='source' 
                position={Position.Right}
            />
            {/* For test only - straight way */}
        </div>
    );
};

export default C4BaseNode;