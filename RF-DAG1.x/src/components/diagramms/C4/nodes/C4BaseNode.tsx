import { useState }  from 'react';
import { Handle, NodeProps, NodeResizer, Position } from 'reactflow';
import Label         from '../../../Label';
// import useStore from '../../../../store/store';


type C4NodeInfo = {
	mainLabel:   string;
	nodeType:    string;
	typeContent: string;
	description: string;
};



const C4BaseNode = (nodeProps: NodeProps<C4NodeInfo>) => {
	const [mainLabel, setMainLabel]     = useState(nodeProps.data.mainLabel);
	const [nodeType,  setNodeType]      = useState(nodeProps.data.nodeType);
	const [typeContent, setTypeContent] = useState(nodeProps.data.typeContent);
	const [description, setDescription] = useState(nodeProps.data.description);
	
	const [isMLShowInput, setIsMLShowInput] = useState(false);    // ML - main label
	const [isNTShowInput, setIsNTShowInput] = useState(false);    // NT - node type
	const [isTCShowInput, setIsTCShowInput] = useState(false);    // TC - type content
	const [isDShowInput,  setIsDShowInput]  = useState(false);    //  D - description

	// const { getNewHandleId } = useStore();


	const changeMLabel = (e: { target: { value: string; }; }) => {
        setMainLabel(e.target.value);
        // onNodeLabelChange(e.target.value, id);
	}
	const changeNodeType = (e: { target: { value: string; }; }) => {
        setNodeType(e.target.value);
        // onNodeLabelChange(e.target.value, id);
	}
	const changeTypeContent = (e: { target: { value: string; }; }) => {
        setTypeContent(e.target.value);
        // onNodeLabelChange(e.target.value, id);
	}
	const changeDescription = (e: { target: { value: string; }; }) => {
        setDescription(e.target.value);
        // onNodeLabelChange(e.target.value, id);
	}



	return (
		<div className='C4BaseNode' style={{minWidth: 250, width: '100%', maxWidth: 'fit-content', minHeight: 150, height: '100%'}}>
			<NodeResizer 
                color='#ff0071' 
                isVisible={nodeProps.selected} 
                minWidth={250} 
                minHeight={150}
            />

			<Label
				className='c4-mainLabel'
				value={mainLabel}
				handleChange={changeMLabel}
				handleBlur={() => setIsMLShowInput(false)}
				handleDoubleClick={() => setIsMLShowInput(true)}
                isShowInput={isMLShowInput}
			/>

			<div className='c4-type'>
				<span>[</span>
				<Label
					className='c4-nodeType'
					value={nodeType}
					handleChange={changeNodeType}
					handleBlur={() => setIsNTShowInput(false)}
					handleDoubleClick={() => setIsNTShowInput(true)}
                	isShowInput={isNTShowInput}
				/>
				<span> : </span>
				<Label
					className='c4-typeContent'
					value={typeContent}
					handleChange={changeTypeContent}
					handleBlur={() => setIsTCShowInput(false)}
					handleDoubleClick={() => setIsTCShowInput(true)}
                	isShowInput={isTCShowInput}
				/>
				<span>]</span>
			</div>
			
			<Label
				className='c4-description'
				value={description}
				handleChange={changeDescription}
				handleBlur={() => setIsDShowInput(false)}
				handleDoubleClick={() => setIsDShowInput(true)}
                isShowInput={isDShowInput}
			/>



			{/* For test only - straight way */}
            <Handle 
                id={'1'}
                type='source'
                position={Position.Left}
            />
            <Handle 
                id={'2'}
                type='source' 
                position={Position.Top}
            />
            <Handle 
                id={'3'}
                type='source' 
                position={Position.Right}
            />
            <Handle 
                id={'4'}
                type='source' 
                position={Position.Bottom}
            />
			{/* For test only - straight way */}
		</div>
	);
};

export default C4BaseNode;