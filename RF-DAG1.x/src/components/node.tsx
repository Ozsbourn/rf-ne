import { memo,
         useEffect,
         useRef,
         useState } from 'react';
import { Handle, 
         NodeToolbar,
         NodeResizer, } from 'reactflow';

// import Copy   from '../assets/copy.svg';
// import Expand from '../assets/expand-arrows.svg';
// import Close  from '../assets/cross.svg';

import useStore         from '../store/store';

// import { Modal } from 'antd';
import Label            from './Label';



const CustomNode = ({ id, data, selected }) => {
    const ref = useRef(null);
    const { 
        getHandlers, 
        onNodeLabelChange, 
        deleteNode,
    } = useStore();

    const [label, setLabel]             = useState(data.label);
    const [isShowInput, setIsShowInput] = useState(false); 

    // const [nodeHeight, setNodeHeight] = useState();
    // const [nodeWidth,   setNodeWidth] = useState();

    // const [isModalOpen, setIsModalOpen] = useState(false);


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
    const handleEdit   = () => {
        // setNodeEditId(id);
        // showModal();
    };
    const handleDelete = () => {
        deleteNode(id);
    };


    // Handlers for Modal
    // const showModal = () => {
    //     setIsModalOpen(true);
    // };
    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };
    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };

    useEffect(() => {
        // setNodeWidth(ref.current.offsetWidth);
        // setNodeHeight(ref.current.offsetHeight);
    }, []);



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
                        onNodeLabelChange(e.target.value, id);
                    }}
                    handleDoubleClick={() => setIsShowInput(true)}
                    handleBlur={() => setIsShowInput(false)}
                    isShowInput={isShowInput}
                />
            </div>

            {
                getHandlers(id).map((e) => (
                    <Handle 
                        id={e.id}
                        key={e.id}
                        type={e.type} 
                        position={e.position}
                    />
                ))
            }
            
            {/* Should be separated component: from here */}
            {/*<Modal
                title='Edit Node Window'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <span>Label:</span>
                <input 
                    value={label}
                    onChange={(e) => {
                        setLabel(e.target.value);
                        onNodeLabelChange(e.target.value, id);
                    }}
                />
            </Modal>*/}
            {/* to here w/o links between that component and anything in modal*/}
        </div>
    );
}

export default memo(CustomNode);