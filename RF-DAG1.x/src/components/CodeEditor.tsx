import { 
    useState,
    useEffect } from 'react';
import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import useStore from '../store/store';
import { json } from '@codemirror/lang-json';
import axios from 'axios';



// For internal json
const CodeEditor = () => {
    const { 
    	// getJsonScheme, 
    	// setJsonScheme, 
    	getAdapterOutput } = useStore();
    const [code, setCode]   = useState('');
    
    const updateCodeInEditor = () => {
        // setCode(getJsonScheme());
    	setCode(JSON.stringify(getAdapterOutput(), null, 2));
    };
    const updateCodeInStore = () => {
        // setJsonScheme(code)
    };



    useEffect(() => {
        const unsub = useStore.subscribe(updateCodeInEditor);

        return unsub;
    }, []);


    return (
        <>
            <CodeMirror
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
            />
        </>
    );
};

export default CodeEditor;