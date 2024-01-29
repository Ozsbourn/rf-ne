import { 
       useCallback, 
       useState, 
       useRef 
} from 'react';
import ReactFlow, {
       ReactFlowProvider,
       Controls,
       Background,
       MiniMap,
       ConnectionMode,
       BackgroundVariant,
       XYPosition
} from 'reactflow';
import 'reactflow/dist/style.css';

import { observer } from 'mobx-react-lite';

import { nodeTypes } from '../initialData/nodeTypes'; 
import { CustomNodeConfig }        from '../nodeConfig';
import { createNodeConfigPattern } from '../store/nodeConfigFactory';
import Sidebar       from './Sidebar';



const Wrapper = observer(( { store } ) => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);
    const onDrop = useCallback((event: any) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');
        if (typeof type === 'undefined' || !type) {
            return;
        }

        const position: XYPosition = reactFlowInstance!.screenToFlowPosition({
            x: event.clientX - 115,
            y: event.clientY - 30,
        });
        const id = store.getNewId();
        const newNode = {
            id:   id,
            type: (type === 'custom') ? 'BaseNode' : type,
            position: position,
            data: {
                label: `${type} node`,
            }
        }

        let IdsArr = [store.getNewHandleId(), store.getNewHandleId(), store.getNewHandleId(), store.getNewHandleId()];
        if (type === 'custom') {
            const tmp: CustomNodeConfig = createNodeConfigPattern(id, IdsArr);
            store.appendHandlers(tmp);   
        }
        store.appendNode(newNode);
    }, [reactFlowInstance],);

    const saveToJSON = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const handles = store.getAllHandles();
        const rfJsonInstance = {
            ...reactFlowInstance!.toObject(),
            handles
        }
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
            store.deleteNode(node.id);
        });
    }



    return (
        <div className='dndflow'>
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={store.nodes}
                        edges={store.edges}
                        onNodesChange={store.onNodesChange}
                        onNodesDelete={onDeleteNodeList}
                        onEdgesChange={store.onEdgesChange}
                        onConnect={store.onConnect}
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
})

export default Wrapper;