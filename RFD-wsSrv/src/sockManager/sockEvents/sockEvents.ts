import { logger } from "../../logger/logger";



export const testEvent = (socket: any) => {
	const test_params = {
		label: "test-label",
		payload: {
			value: "test payload string",
		}
	};

	logger.info(`test event`);
    socket.emit('nameOfEvent', test_params);
};



/* Service events */
 
export const initEvent    = () => {};
export const endWorkEvent = () => {};

/* Service events */




/* Data managment events */

// Node events
export const NodesChange      = () => {
	
};
export const NodeLabelChange  = () => {};

// Edge events
export const EdgesChange = () => {};

/* Edn of Data managment events */