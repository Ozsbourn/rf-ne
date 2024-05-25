import { 
    useState,
    useEffect, 
    memo} from 'react';
// import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import useStore from '../store/store';

// test rn
// import dataExchanger from '../libs/dataExchanger';



// For internal json
const CodeEditor = () => {
    // const { getAdapterOutput, setPumlScript } = useStore();
    // const [code, setCode]   = useState('{}');
    
    // const updateCodeInEditor = () => {
    //     const tmp = JSON.stringify(getAdapterOutput(), null, 2); 
    //     setCode(tmp);

    //     console.log(dataExchanger.toPuml(tmp));
    // };


    useEffect(() => {
        // const unsub = useStore.subscribe(updateCodeInEditor);

        // return unsub;
    }, []);


    return (
        <>
            {/*<CodeMirror
                style={{
                    width: '350px',
                    minHeight: '100%',
                    maxHeight: '100%',
                    overflow: 'auto',
                    overflowY: 'scroll',
                }}

                height='auto'
                value={code}
                // onChange={(value: string) => {
                //     setCode(value);
                // }}
                extensions={
                    [    
                        json(),
                        basicSetup({
                            foldGutter: false,
                            dropCursor: false,
                            allowMultipleSelections: false,
                            indentOnInput: false,

                            tabSize: 2
                        })
                    ]
                }
            />
            <input 
                type='button' 
                onClick={updateCodeInStore} 
                value='Apply' 
                style={{
                    width: '100px', 
                    height: '25px'
                }} 
            />*/}
        </>
    );
};

export default memo(CodeEditor);