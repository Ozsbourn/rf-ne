import { memo, useEffect, useRef, useState } from 'react';
import Label      from '../../Label';
import { Handle, NodeResizer, NodeToolbar } from 'reactflow';



export const SoftwareSystem = ({props} : any) => {
	const ref = useRef(null);

    const [label, setLabel]             = useState(props.data.label);
    const [isShowInput, setIsShowInput] = useState(false); 


    const handleCopy   = () => {};
    const handleEdit   = () => {};
    const handleDelete = () => {};

    useEffect(() => {}, []);

	return (
        <div className='customNode' ref={ref}>
            <NodeResizer 
                color='#ff0071' 
                isVisible={props.selected} 
                minWidth={100} 
                minHeight={30}
            />

            <NodeToolbar 
                className='controlsNodePanel' 
                isVisible={props.data.toolbarVisible}
                position={props.data.toolbarPosition}
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
                    }}
                    handleDoubleClick={() => setIsShowInput(true)}
                    handleBlur={() => setIsShowInput(false)}
                    isShowInput={isShowInput}
                />
            </div>

            {/* Handlers here */}
        </div>
    );
};

const Container      = () => {};
const Component      = () => {};
const Code           = () => {};
const Person         = () => {};

const CustomNode = ({props} : any) => {
    const ref = useRef(null);

    const [label, setLabel]             = useState(props.data.label);
    const [isShowInput, setIsShowInput] = useState(false); 


    const handleCopy   = () => {};
    const handleEdit   = () => {};
    const handleDelete = () => {};

    useEffect(() => {}, []);



    return (
        <div className='customNode' ref={ref}>
            <NodeResizer 
                color='#ff0071' 
                isVisible={props.selected} 
                minWidth={100} 
                minHeight={30}
            />

            <NodeToolbar 
                className='controlsNodePanel' 
                isVisible={props.data.toolbarVisible}
                position={props.data.toolbarPosition}
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
                    }}
                    handleDoubleClick={() => setIsShowInput(true)}
                    handleBlur={() => setIsShowInput(false)}
                    isShowInput={isShowInput}
                />
            </div>

            /* Handlers here */
        </div>
    );
}

export default memo(CustomNode);
