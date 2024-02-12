


class DataExchanger {
	constructor() {}

	/**
	 * Parse JSON scheme of ReactFlow component and translate into PlantUML script
	 *
	 * @param      {string}  jsonScheme  The json scheme
	 * 
	 * @return     {string}  PlantUml script in form of one string     
	 */
	toPuml = (jsonScheme: string) => {
		let puml:string  = '';
		let pumlCommands = [];
		const rfScheme = JSON.parse(jsonScheme); 

		/* TODO: logic for data translation */


		return puml;
	};

	/**
	 * Parse data that get from server after parsing PlantUML and adapt it to
	 *  form that convinient to ReactFlow component
	 *
	 * @param      {any}     recievedData  The recieved data
	 * 
	 * @return     {object}  RF-based JS object to describe RF data
	 */
	toJson = (recievedData: any) => {
		const rfScheme = {};

		return rfScheme;
	};
};


const dataExchanger = new DataExchanger();
export default dataExchanger;