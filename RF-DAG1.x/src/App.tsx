import { 
       useCallback, 
       useState, 
       useRef, 
} from 'react';
import ReactFlow, {
       ReactFlowProvider,
       Controls,
       Background,
       BackgroundVariant,
       XYPosition,
       MiniMap,
       ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';

import useStore  from './store/store';

import Sidebar       from './components/Sidebar';
import { nodeTypes } from './initialData/nodeTypes'; 
import { CustomNodeConfig }        from './nodeConfig';
import { createNodeConfigPattern } from './store/nodeConfigFactory';
// import SocketManager from './sockManager/sockManager';



function App() {
    const reactFlowWrapper = useRef(null);
    const { nodes, 
            edges, 
            onNodesChange, 
            onEdgesChange, 
            onConnect, 
            appendNode, 
            getAllHandles, 
            getNewId,
            appendHandlers,
            getNewHandleId,
            deleteNode } = useStore();
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);
    const onDrop = useCallback((event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: any; clientY: any; }) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');
        if (typeof type === 'undefined' || !type) {
            return;
        }

        const position: XYPosition = reactFlowInstance!.screenToFlowPosition({
            x: event.clientX - 115,
            y: event.clientY - 30,
        });
        const id = getNewId();
        const newNode = {
            id:   id,
            type: (type === 'custom') ? 'BaseNode' : type,
            position: position,
            data: {
                label: `${type} node`,
            }
        }

        let IdsArr = [getNewHandleId(), getNewHandleId(), getNewHandleId(), getNewHandleId()];
        if (type === 'custom') {
            const tmp: CustomNodeConfig = createNodeConfigPattern(id, IdsArr);
            appendHandlers(tmp);   
        }
        appendNode(newNode);
    }, [reactFlowInstance],);

    const saveToJSON = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        
        const handles = getAllHandles();
        const rfJsonInstance = {
            ...reactFlowInstance!.toObject(), 
            handles
        };
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify(rfJsonInstance, null, 2)], {
            type: 'text/plain'
        }));
        a.setAttribute('download', 'data.json');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const openJSON = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    }

    const onDeleteNodeList = (nodes: Node[]) => {
        nodes.map((node) => {
            deleteNode(node.id);
        });
    }



    return (
        <div className='dndflow'>
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onNodesDelete={onDeleteNodeList}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}

                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}

                        connectionMode={ConnectionMode.Loose}

                        fitView
                        deleteKeyCode={'Delete'}
                        selectionKeyCode={'Ctrl'}

                        proOptions={{hideAttribution: true}}
                    >
                        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                        <Controls />
                        <MiniMap 
                            style={{border: "1px solid #000000"}}
                            nodeColor={'#cd0ffe'}
                            pannable 
                            zoomable
                        />
                    </ReactFlow>
                </div>
                <div className='controls-panel'>
                    <Sidebar />

                    <div className='dndnode input save-button' onClick={saveToJSON}>
                        Save to JSON
                    </div>
                    <div className='dndnode input save-button' onClick={openJSON}>
                        Open JSON
                    </div>
                </div>
            </ReactFlowProvider>
        </div>
    );
}

export default App;