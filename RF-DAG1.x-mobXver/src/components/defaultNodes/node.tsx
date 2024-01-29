import { memo,
         useState, 
         useCallback, 
         useRef,
         useEffect} from 'react';
import { Handle, 
         Position, 
         NodeToolbar,
         NodeResizer } from 'reactflow';

import Label     from '../Label';

import { store } from '../../store/globalStore';
         


const CustomNode = ({ id, data, selected }: any) => {
    const ref = useRef(null);

    const [label, setLabel]             = useState(data.label);
    const [isShowInput, setIsShowInput] = useState(false);

    const handleCopy   = () => {
        {/* TODO: here should be node copy logic */}
        {/*
          * possible way:
          *     get node w/o edges(?), w/ handles tho
          *     serialize it to json string 
          *     set it to navigator.clipboard
          *     and to paste - deserialize and add node with same properties, gen new Id tho
          *     
          */}
    };
    const handleEdit   = () => {};
    const handleDelete = () => {
        store.deleteNode(id);
    };

    useEffect(() => {}, []);


    return (
        <div className='customNode' ref={ref}>
            <NodeResizer 
                color='#ff0071' 
                isVisible={selected} 
                minWidth={100} 
                minHeight={30}
            />

            <NodeToolbar 
                className='controlsNodePanel' 
                isVisible={data.toolbarVisible}
                position={data.toolbarPosition}
            >
                <button onClick={handleCopy}>Copy</button>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </NodeToolbar>

            <div 
                className='label' 
                style={{ padding: '10px 20px' }}
            >
                <Label 
                    value={label}
                    handleChange={(e: { target: { value: string; }; }) => {
                        setLabel(e.target.value);
                        store.onNodeLabelChange(e.target.value, id);
                    }}
                    handleDoubleClick={() => setIsShowInput(true)}
                    handleBlur={() => setIsShowInput(false)}
                    isShowInput={isShowInput}
                />
            </div>

            {
                store.getHandlers(id).map((e) => (
                    <Handle 
                        id={e.id}
                        key={e.id}
                        type={e.type} 
                        position={e.position}
                    />
                ))
            }
        </div>
    );
}

export default memo(CustomNode);