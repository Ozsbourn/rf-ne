import { Server }   from 'socket.io';
import serverConfig from '../configs/server.config';
import { logger }   from '../logger/logger';
import eventsDefs   from './sockEvents/sockEventsDefinitions';



export class SocketService {
    io: any;

    constructor(server: any) {
        this.io = new Server(server, {
            cors: {
                origin: serverConfig.client_url,
                credentials: true
            }
        });



        /**     
         * Definition of event listener for CONNECTION event and start up socket listener
         */
        this.io.on(eventsDefs.conn, (socket: any) => {
            logger.info(`client connected w/ ID: ${socket.id}.`);
            
            socket.on(eventsDefs.discon, () => {
                logger.info('Client disconnected.');
            });
            socket.on(eventsDefs.nodeChange, (sourcererId: string, data: any) => {
                logger.info(`Socket w/ ID: ${socket.id} sent nodes changes data`);
                this.io.emit(eventsDefs.nodeChange, sourcererId, data);
            });
            socket.on(eventsDefs.nodeLabelChange, (sourcererId: string, newLabel: string, nodeId: string) => {
                logger.info(`Socket w/ ID: ${socket.id} sent data for update label in ${nodeId} node`);
                this.io.emit(eventsDefs.nodeLabelChange, sourcererId, newLabel, nodeId);
            });
        });
    }

    // for external callings
    emitter(event: any, body: any) {
        if (body) {
            this.io.emit(event, body);
        }
    }
};

































