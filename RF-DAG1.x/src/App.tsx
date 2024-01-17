import React, { useCallback, useState, useRef } from 'react';

import ReactFlow, {
		 ReactFlowProvider,
		 Controls,
		 Background,
		 MiniMap
}
from 'reactflow';
import 'reactflow/dist/style.css';

import { shallow } from 'zustand/shallow';
import useStore		from './store/store';

import nodeTypes	 from './initialData/nodeTypes'; 

import Sidebar from './components/DnDSidebar';



const selector = (state) => ({	nodes: state.nodes,
	edges: state.edges,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnect: state.onConnect,
    appendNode: state.appendNode,
});


function App() {
	// const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow); // RFC: deprecated #1937
	const reactFlowWrapper = useRef(null);
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, appendNode } = useStore(selector);
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

        appendNode(newNode);
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
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
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
}

export default App;