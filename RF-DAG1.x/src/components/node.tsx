import { memo,
         useState, 
         useCallback } from 'react';
import { Handle, 
         Position, 
         NodeToolbar,
         NodeResizer } from 'reactflow';

import Copy   from '../assets/copy.svg';
import Expand from '../assets/expand-arrows.svg';
import Close  from '../assets/cross.svg';



const CustomNode = ({ data, selected }) => {
    return (
        <div className='customNode'>
            <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />

            <NodeToolbar 
                className='controlsNodePanel' 
                visible={data.toolbarVisible}
                position={data.toolbarPosition}
            >
                <button>delete</button>
                <button>copy</button>
                <button>expand</button>
            </NodeToolbar>

            <div style={{ padding: '10px 20px' }}>
                {data.label}
            </div>

            <Handle type="target" position={Position.Left}  />
             <Handle type="source" position={Position.Right} />
        </div>
    );
}

export default memo(CustomNode);