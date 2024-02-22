import { 
    useCallback, 
    useState, 
    useRef,
} from 'react';
import ReactFlow, {
       ReactFlowProvider,
       Controls,
       Background,
       MiniMap,
       ConnectionMode,
       BackgroundVariant,
       XYPosition,
       Node,
       MarkerType,
} from 'reactflow';


import { observer }  from 'mobx-react-lite';

import { nodeTypes } from '../initialData/nodeTypes'; 
import { edgeTypes } from '../initialData/egdeTypes'; 

import { CustomNodeConfig }        from '../nodeConfig';
import { createNodeConfigPattern } from '../store/nodeConfigFactory';
import Sidebar          from './Sidebar';
import { Button, Divider, Flex, Modal } from 'antd';
import { nodeBuilder }  from '../libs/nodeBuilder';
import { editStore }    from '../store/globalStore';
import ModalWrapper     from './modalWrapper';
import Adapter from '../pages/adapter';
import dataExchanger from '../libs/dataExchanger';
import CustomConnectionLine from './defaultEdges/connectionLine';



const connectionLineStyle = {
    strokeWidth: 2,
    stroke: 'black',
};
const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: 'gray' },
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'gray',
  },
};


const Wrapper = observer(( { store }: any ) => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const [showInitModal, setShowInitModal] = useState(true);


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


    /* JSON & Puml manipulators handlers */
    const saveToJSON = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const handles = store.getAllHandles();
        const rfJsonInstance = {
            ...reactFlowInstance!.toObject(),
            handles
        }
        console.log(rfJsonInstance)
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify(rfJsonInstance, null, 2)], {
            type: 'text/plain'
        }));
        a.setAttribute('download', 'data.json');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    const openJSON   = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    }

    const saveToPuml = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const tmp = JSON.stringify(store.getAdapterOutput(), null, 2);
        const pumlScript = dataExchanger.toPuml(tmp);
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([pumlScript], {
            type: 'text/plain'
        }));
        a.setAttribute('download', 'script.puml');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    const openPuml   = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };
    /* JSON & Puml manipulators handlers end */


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
                        defaultEdgeOptions={defaultEdgeOptions}

                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}

                        connectionMode={ConnectionMode.Loose}
                        connectionLineComponent={CustomConnectionLine}
                        connectionLineStyle={connectionLineStyle} 

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

                    <Divider />
                    
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

                        <Button type='primary' onClick={saveToPuml} style={{
                            width: '95%'
                        }}>
                            Save to PlantUML
                        </Button>
                        <Button type='primary' onClick={openPuml} style={{
                            width: '95%'
                        }}>
                            Open PlantUML
                        </Button>

                        <Divider/>

                        <Button type='primary' onClick={store.disableEdgeAnimations} style={{
                            width: '95%'
                        }}>
                            {(store.getAnimationStatus()) ? 'Disable edges animation' : 'Enable edges animation'}
                        </Button>
                    </Flex>
                </div>

                <ModalWrapper 
                    store={editStore} 
                    title='Edit component' 
                />

                <Modal
                    title='Комментарии'
                    open={showInitModal}
                    onOk={() => setShowInitModal(false)}
                    onCancel={() => setShowInitModal(false)}
                >
                    <p>В левой части расположен редактор кода и кнопки: для применения изменений с текстового редактора в нодовый, и наоборот, соответственно. <br/>В правой: элементы управления для работы с файлами и базовая нода для D&D режима работы редактора.<br/>Для MVP ограничен набор нод до С4 (все С4 сущности выводятся из базовой) - просто редактируйте поля двойным кликом.</p>
                    <br/>

                    <p>EPs: На данный момент возможно несовпадение порядка элементов в PlantUML скриптах, которые формирует пользователь и генерирует сервис, поэтому изменения могут приводить к переопределению порядка команд.</p>
                    <p>EPs: На данный момент есть некорректная работа с группами, при лэйаутинге элементов на схеме, поэтому любые макросы формирования групп (Boundary и т.п.) игнорируются.</p>
                    <p>Подсветка синтаксиса и определение ошибок пока также отключены. Возможны баги :)</p>
                </Modal>
            </ReactFlowProvider>
        </div>
    );
})

export default Wrapper;