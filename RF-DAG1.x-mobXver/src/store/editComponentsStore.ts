import { 
         observable, 
         action,
} from 'mobx';
import * as mobx from 'mobx'; 



export class EditStore {
	@observable showModal:   boolean;
	@observable editingNode: string;

	constructor() {
		mobx.makeObservable(this);

		this.showModal   = false;
		this.editingNode = '';
	}


	@action
	setEditingNode(node: string) {
		this.editingNode = node;
		this.showModal   = true;
	}
	getEditingNode() {
		return this.editingNode;
	}
	@action
	clearEditingNode() {
		this.showModal   = false;
		this.editingNode = '';
	}
};