import React, { 
       useCallback, 
       useState, 
       useRef 
} from 'react';
import ReactFlow, {
       ReactFlowProvider,
       Controls,
       Background,
       MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';

import { observer } from 'mobx-react-lite';

import nodeTypes    from '../initialData/nodeTypes'; 
import Sidebar      from './DnDSidebar';



const Wrapper = observer(({ store }) => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);
    const onDrop = useCallback((event) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');
        if (typeof type === 'undefined' || !type) {
            return;
        }

        const position = reactFlowInstance!.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });
        const newNode = {
            type,
            position,
            data: {
                label: `${type} node`,
            }
        }

        store.appendNode(newNode);
    }, [reactFlowInstance],);

    const saveToJSON = (event) => {
        event.preventDefault();
        const rfJsonInstance = reactFlowInstance!.toObject();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify(rfJsonInstance, null, 2)], {
            type: 'text/plain'
        }));
        a.setAttribute('download', 'data.json');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }



    return (
        <div className='dndflow'>
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={store.nodes}
                        edges={store.edges}
                        onNodesChange={store.onNodesChange}
                        onEdgesChange={store.onEdgesChange}
                        onConnect={store.onConnect}
                        nodeTypes={nodeTypes}

                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}

                        fitView
                    >
                        <Background variant="dots" gap={12} size={1} />
                        <Controls />
                        <MiniMap pannable zoomable/>
                    </ReactFlow>
                </div>
                <div className='controls-panel'>
                    <Sidebar />

                    <div className='dndnode input save-button' onClick={saveToJSON}>
                        Save to JSON
                    </div>
                </div>
            </ReactFlowProvider>
        </div>
    );
})

export default Wrapper;