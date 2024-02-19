import { useEffect, useState }  from 'react';
import { 
    Handle, 
    NodeProps, 
    NodeResizer, 
    NodeToolbar, 
    Position }  from 'reactflow';
import Label    from '../../../Label';

import { editStore, store } from '../../../../store/globalStore';



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

const C4BaseNode = (nodeProps: NodeProps<C4NodeInfo>) => {
    const [ml,     setMl]     = useState(nodeProps.data.mainLabel);
    const [nt,     setNt]     = useState(nodeProps.data.nodeType);
    const [desc,   setDesc]   = useState(nodeProps.data.description);
    const [sprite, setSprite] = useState(nodeProps.data.sprite);
    const [tags,   setTags]   = useState(nodeProps.data.tags);
    const [link,   setLink]   = useState(nodeProps.data.link);
    const [type,   setType]   = useState(nodeProps.data.type);
    const [bs,     setBs]     = useState(nodeProps.data.baseShape);

    const [isMLShowInput, setIsMLShowInput] = useState(false);    // ML - main label
    const [isNTShowInput, setIsNTShowInput] = useState(false);    // NT - node type
    const [isDShowInput,  setIsDShowInput]  = useState(false);    //  D - description


    const handleCopy   = () => {};
    const handleEdit   = () => { editStore.setEditingNode(nodeProps.id); };
    const handleDelete = () => { store.deleteNode(nodeProps.id); };


    useEffect(() => {
        setMl(nodeProps.data.mainLabel);
        setNt(nodeProps.data.nodeType);
        setDesc(nodeProps.data.description);
        setSprite(nodeProps.data.sprite);
        setTags(nodeProps.data.tags);
        setLink(nodeProps.data.link);
        setType(nodeProps.data.type);
        setBs(nodeProps.data.baseShape);
    }, [nodeProps.data]);
    useEffect(() => {
        store.updateNodeData(nodeProps.id, { 
            ...nodeProps.data,  

            mainLabel:   ml,
            nodeType:    nt,
            description: desc,
            sprite:      sprite, 
            tags:        tags, 
            link:        link, 
            type:        type,  
            baseShape:   bs,
        }) 
    }, [ml, nt, desc, sprite, tags, link, type, bs]);



    return (
        <div 
            className='C4BaseNode' 
            style={{
                minWidth: 250, 
                width: '100%', 
                maxWidth: 'fit-content', 
                minHeight: 150, 
                height: '100%'
            }}
        >
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
                value={ml}
                handleChange={e => setMl(e.target.value)}
                handleBlur={() => setIsMLShowInput(false)}
                handleDoubleClick={() => setIsMLShowInput(true)}
                isShowInput={isMLShowInput}
            />

            <div className='c4-type'>
                <span>[</span>
                <Label
                    className='c4-nodeType'
                    value={nt}
                    handleChange={e => setNt(e.target.value)}
                    handleBlur={() => setIsNTShowInput(false)}
                    handleDoubleClick={() => setIsNTShowInput(true)}
                    isShowInput={isNTShowInput}
                />
                <span>]</span>
            </div>
            
            <Label
                className='c4-description'
                value={desc}
                handleChange={e => setDesc(e.target.value)}
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