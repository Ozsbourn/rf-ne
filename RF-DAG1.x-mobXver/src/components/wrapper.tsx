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
       XYPosition,
       Node
} from 'reactflow';
import 'reactflow/dist/style.css';

import { observer }  from 'mobx-react-lite';

import { nodeTypes } from '../initialData/nodeTypes'; 
import { edgeTypes } from '../initialData/egdeTypes'; 

import { CustomNodeConfig }        from '../nodeConfig';
import { createNodeConfigPattern } from '../store/nodeConfigFactory';
import Sidebar          from './Sidebar';
import { Button, Flex } from 'antd';
import { nodeBuilder }  from '../libs/nodeBuilder';
import { editStore }    from '../store/globalStore';
import ModalWrapper     from './modalWrapper';
import Adapter from '../pages/adapter';



const Wrapper = observer(( { store }: any ) => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);


    /* D&D events handlers */
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
        const newNode = nodeBuilder.getNode(id, type, position);

        let IdsArr = [store.getNewHandleId(), store.getNewHandleId(), store.getNewHandleId(), store.getNewHandleId()];
        if (type === 'custom') {
            const tmp: CustomNodeConfig = createNodeConfigPattern(id, IdsArr);
            store.appendHandlers(tmp);   
        }
        store.appendNode(newNode);
    }, [reactFlowInstance],);
    /* D&D events handlers end */


    /* JSON manipulators handlers */
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
    /* JSON manipulators handlers end */


    const onDeleteNodeList = (nodes: Node[]) => {
        nodes.map((node: Node) => {
            store.deleteNode(node.id);
        });
    }


    



    return (
        <div className='dndflow'>
            <ReactFlowProvider>
                <Adapter />

                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={store.nodes}
                        edges={store.edges}
                        onNodesChange={store.onNodesChange}
                        onNodesDelete={onDeleteNodeList}
                        onEdgesChange={store.onEdgesChange}
                        onConnect={store.onConnect}
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

                    {/*<pre>
                        {
                            store.nodes.map(node => {
                                return JSON.stringify(node, null, 2);
                            })
                        }
                    </pre>*/}
                </div>

                <ModalWrapper 
                    store={editStore} 
                    title='Edit component' 
                />
            </ReactFlowProvider>
        </div>
    );
})

export default Wrapper;