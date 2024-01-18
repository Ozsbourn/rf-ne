import { 
       useCallback, 
       useState, 
       useRef 
} from 'react';
import ReactFlow, {
       ReactFlowProvider,
       Controls,
       Background,
       BackgroundVariant,
       // MiniMap,
       // ProOptions
} from 'reactflow';
import 'reactflow/dist/style.css';

import useStore  from './store/store';

import nodeTypes from './initialData/nodeTypes'; 
import Sidebar   from './components/DnDSidebar';



// const selector = (state) => ({    
//     nodes: state.nodes,
//     edges: state.edges,
//     onNodesChange: state.onNodesChange,
//     onEdgesChange: state.onEdgesChange,
//     onConnect: state.onConnect,
//     appendNode: state.appendNode,
// });


function App() {
    // const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow); // RFC: deprecated #1937
    const reactFlowWrapper = useRef(null);
    // const {state: { nodes, edges, onNodesChange, onEdgesChange, onConnect, appendNode }} = useStore();
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, appendNode, getAllHandles } = useStore();
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
                        deleteKeyCode={'Delete'}
                        selectionKeyCode={'Ctrl'}

                        // proOptions={{hideAttribution: true}}
                    >
                        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                        <Controls />
                        {/*<MiniMap pannable zoomable/>*/}
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