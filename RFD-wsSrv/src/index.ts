import express           from 'express';
import { createServer }  from 'node:http';
import { SocketService } from './sockManager/socketManager';
import { logger }        from './logger/logger';
import serverConfig      from './configs/server.config';


/**
 * Basics init express application, http web-server 
 *      and sockets singleton handler 
 */
export const app        = express();
export const server     = createServer(app);
export const io_service = new SocketService(server);


logger.info(`Server have started up on ${serverConfig.server_host}:${serverConfig.socket_port}\n`);
server.listen(serverConfig.socket_port);