import React from 'react';
import Label from './Label';



export default () => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    }


    return (
        <aside>
            <div>
                <div className='aside-description'>
                    Drag&Drop these nodes at a schema:
                </div>

                <div className='dndnode input' onDragStart={(event) => onDragStart(event, 'input')} draggable>
                    Input node
                </div>

                <div className='dndnode default' onDragStart={(event) => onDragStart(event, 'default')} draggable>
                    Default node
                </div>

                <div className='dndnode output' onDragStart={(event) => onDragStart(event, 'output')} draggable>
                    Output node
                </div>  

                <div className='dndnode output' onDragStart={(event) => onDragStart(event, 'custom')} draggable>
                    Custom node
                </div>        
            </div>

            <div className='nodeEditFields'>
            </div>
        </aside>
    );
};