import { 
       useCallback, 
       useState, 
       useRef,
       useEffect, 
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

import useStore     from './store/store';
import { useEditStore } from  './store/editComponentsStore';

import Sidebar       from './components/Sidebar';
import { 
    Button, 
    Flex,
    Modal, 
} from 'antd';
import { nodeTypes } from './initialData/nodeTypes';
import { edgeTypes } from './initialData/egdeTypes'; 
import { CustomNodeConfig }        from './nodeConfig';
import { createNodeConfigPattern } from './store/nodeConfigFactory';

import CodeEditor from './components/CodeEditor';
import Adapter    from './pages/adapter';



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
            deleteNode,
    } = useStore();
    const {
        getEditingNode,
        clearEditingNode,
    } = useEditStore();
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [isModalOpen, setIsModalOpen]             = useState(false);


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
        a.setAttribute('download', 'scheme.json');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const openJSON = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    }

    const onDeleteNodeList = (nodes: Node[]) => {
        nodes.map((node: Node) => {
            deleteNode(node.id);
        });
    }

    const showModal = () => {
        if (getEditingNode() !== '') {
            setIsModalOpen(true);
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
        clearEditingNode();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        clearEditingNode();
    };

    useEffect(() => {
        const unsub = useEditStore.subscribe(showModal);

        return unsub;
    }, []);
    useEffect(() => {}, [reactFlowInstance]);



    return (
        <div className='dndflow' style={{
            height: '100%'
        }}>
            <ReactFlowProvider>
                <div>
                    <Adapter />
                </div>

                <div className='ceditor'>
                    <CodeEditor />
                </div>

                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onNodesDelete={onDeleteNodeList}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}

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
                            nodeColor={'#4071ff'}

                            pannable 
                            zoomable
                        />
                    </ReactFlow>
                </div>
                <div className='controls-panel' style={{
                    height: '100%'
                }}>
                    <Sidebar />

                    
                    <Flex align='center' vertical={true} style={{
                        width: '100%',
                        height: '85%',
                        gap: 5
                    }}>
                        <Button type='primary' onClick={saveToJSON} style={{
                            width: '95%'
                        }}>
                            Save to JSON
                        </Button>
                        <Button type='primary' onClick={openJSON} style={{
                            width: '95%'
                        }}>
                            Open JSON
                        </Button>
                    </Flex>
                </div>

                <Modal title='Edit component' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    
                </Modal>
            </ReactFlowProvider>
        </div>
    );
}

export default App;