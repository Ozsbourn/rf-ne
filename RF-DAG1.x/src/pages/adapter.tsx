import { useEffect, useState } from "react";
// For debug; Should be base staff for example or quick start later tho
import contextExample          from "../initialData/context";

import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import useStore                   from "../store/store";

import axios           from "axios";
import plantumlEncoder from 'plantuml-encoder';

import rfBuilder, { BuilderResponse } from "../libs/rfBuilder";



const parseMetaInfo = (pumlScheme: string) => {
    let clearedString = pumlScheme.replace(/\(/g, ' ')
                           .replace(/\)/g, ' ')
                           .replace(/','/g, ' ');
    let subdividedString = clearedString.split('\n');

    let meta: any = {};
    for (let i = 0; i < subdividedString.length; i++) {
        /* Serving metainfo of PlantUML */
        if (subdividedString[i].match('!include')) {
            meta = { ...meta, inc: subdividedString[i].trim() }
        } else if (subdividedString[i].match('LAYOUT_WITH_LEGEND' )) {
            meta = { ...meta, legend: subdividedString[i].trim() + '()' }
        } else if (subdividedString[i].match('title')) {
            let title = subdividedString[i].replace('title', '').replace(/' '/g, '');  
            meta = { ...meta, title: title.trim() }
        }
    }

    return meta;
};

const adaptResponsedDataToRFScheme = (responsedData: any) => {
    let scheme: any = { meta: {}, schemeData: { nodes: [], edges: [], groups: [], }};
    
    for (let element of responsedData.elements) {
        const newElement: BuilderResponse = rfBuilder.getRfObject(element);

        if (newElement.type === 'Node') {
            scheme = {
                ...scheme,
                schemeData: {
                    ...scheme.schemeData,
                    nodes: [
                        ...scheme.schemeData.nodes,
                        newElement.object,
                    ],
                }
            }
        } else if (newElement.type === 'Edge') {
            scheme = {
                ...scheme,
                schemeData: {
                    ...scheme.schemeData,
                    edges: [
                        ...scheme.schemeData.edges,
                        newElement.object,
                    ],
                }
            }
        } else if (newElement.type === 'Boundary') {
            scheme = {
                ...scheme,
                schemeData: {
                    ...scheme.schemeData,
                    groups: [
                        ...scheme.schemeData.groups,
                        newElement.object,
                    ],
                }
            }
        }
    }

    return scheme;
};


// For external plantuml
const Adapter = () => {
    const { setAdapterOutput } = useStore();
    const [code, setCode] = useState(contextExample);

	useEffect(() => {}, []);

    const sendToServer = () => {
        const encoded = plantumlEncoder.encode(code);

        // Full way for test
        axios.post('http://localhost:5000', {
            pumlEncoded: encoded
        })
        .then(function (res) {
            const rfScheme = {
                meta:       parseMetaInfo(code),
                schemeData: adaptResponsedDataToRFScheme(res.data[0]).schemeData,
            };

            setAdapterOutput(rfScheme);
        })
        .catch(function (err) {
            // Debug
            console.log(err);
        });
    };
    


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
                onChange={(value: string) => {
                    setCode(value);
                }}
                extensions={
                    [    
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
                onClick={sendToServer} 
                value='Apply to editor' 
                style={{
                    width: '100px', 
                    height: '25px'
                }} />
        </>
    )
}

export default Adapter;