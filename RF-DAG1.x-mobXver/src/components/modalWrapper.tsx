import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Input, Modal }    from "antd";

import { store as rfDataStore } from "../store/globalStore";



const ModalWrapper = observer(({store, title}: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currNode, setCurrNode]       = useState(null);


    const getObjectData = () => {
    	return rfDataStore.getNode(store.getEditingNode())[0].target;
    };

    const showModal = () => {
        if (store.getEditingNode() !== '') {
            setIsModalOpen(true);
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
        store.clearEditingNode();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        store.clearEditingNode();
    };


    useEffect(() => {
    	// setCurrNode(getObjectData());
    	// console.log(currNode)
    	showModal();
    }, [store.showModal]);
    


	return (
		<Modal 
			title={title} 
			open={isModalOpen} 
			onOk={handleOk} 
			onCancel={handleCancel}
		>
			<p>Здесь пока ничего нет, потому что предполагаем, что для ознакомления с сервисом Вам не понадобится настройка нод гибче, чем с помощью двойных кликов соответствующим полям на самих нодах.</p>
			{/* TODO: edit fields for deep edit of nodes (edges too?) */}
		</Modal>
	);	
});

export default ModalWrapper;