import socketIOClient, { Socket } from 'socket.io-client';
import sockConfig                 from './sockConfig';
import { eventsDefs, 
         edgesChangeEvent, 
         nodesChangeEvent, 
         nodeLabelChange} from './sockEvents';

import { NodeChange, EdgeChange } from 'reactflow';



class SocketManager {
	socket: Socket<any, any> = socketIOClient(sockConfig.socketServerUrl);

	constructor() {
		this.socket.on(eventsDefs.conn, (data: any) => {
			console.log(data);
		});
		this.socket.on(eventsDefs.discon, () => {
			console.log("disconnect");
		});
		
		this.socket.on(eventsDefs.nodeChange, nodesChangeEvent);
		this.socket.on(eventsDefs.nodeChange, edgesChangeEvent);
		this.socket.on(eventsDefs.nodeLabelChange, nodeLabelChange);
	}



	getSocketId = () => {
		return this.socket.id;
	};
	
	sendNodeChanges = (sourcererId: string, data: NodeChange[]) => {
		this.socket.emit(eventsDefs.nodeChange, sourcererId, data);
	};
	sendEdgeChanges = (sourcererId: string, data: EdgeChange[]) => {
		this.socket.emit(eventsDefs.nodeChange, sourcererId, data);
	};
	sendLabelChange = (sourcererId: string, newLabel: string, nodeId: string) => {
		this.socket.emit(eventsDefs.nodeLabelChange, sourcererId, newLabel, nodeId);
	};
};

const socketManager = new SocketManager();

export default socketManager;