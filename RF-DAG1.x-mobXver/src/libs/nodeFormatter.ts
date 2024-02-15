import { XYPosition } from "reactflow";



class Formatter {
	/* Constants that defines how much element can be placed in a row and avg space between elements */
	_maxElementsInRow: number;
	_elementsGap:      number; 

	_currInRow:        number;
	_lastPosition:     XYPosition;


	constructor () {
		this._maxElementsInRow = 5;
		this._elementsGap      = 300;

		this._currInRow    = 0;
		this._lastPosition = {
			x: 0,
			y: 0,
		};
	};


	getNewPosition = () => {
		let shiftRow: boolean;
		if (this._currInRow > this._maxElementsInRow) {
			shiftRow = true;
			this._currInRow = 0;
		} else {
			shiftRow = false;
		}

		const newPos = { 
			x: this._lastPosition.x + ((shiftRow) ? (-this._elementsGap * this._maxElementsInRow) : this._elementsGap),
			y: this._lastPosition.y + ((shiftRow) ? this._elementsGap : 0),
		};
		this._currInRow++;
		// console.log(`x - ${this._lastPosition.x + ((shiftRow) ? (-this._elementsGap * this._maxElementsInRow) : this._elementsGap)}`)
		// console.log(`y - ${this._lastPosition.y + ((shiftRow) ? this._elementsGap : 0)}`)
		this._lastPosition = newPos;


		return newPos;
	};

	endFormatting = () => {
		this._currInRow = 0;
		this._lastPosition = {
			x: 0,
			y: 0,
		};
	};
};

const nodeFormatter = new Formatter();
export default nodeFormatter;