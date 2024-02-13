import { useEffect, useState } from "react";
// For debug; Should be base staff for example or quick start later tho
import contextExample          from "../initialData/context";

import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import useStore                   from "../store/store";

import axios           from "axios";
import { reqConfig }   from "../configs/requestsConfig";
import plantumlEncoder from 'plantuml-encoder';

import rfBuilder, { BuilderResponse } from "../libs/rfBuilder";



const parseMetaInfo = (pumlScheme: string) => {
    let clearedString = pumlScheme.replace(/\(/g, ' ')
                                  .replace(/\)/g, ' ')
                                  .replace(/','/g, ' ');
    let subdividedString = clearedString.split('\n');

    let meta: any = { incs: [], defs: [], };
    for (let i = 0; i < subdividedString.length; i++) {
        /* Serving metainfo of PlantUML */
        if (subdividedString[i].match('!include')) {
            meta = { 
                ...meta, 
                incs: [ 
                    ...meta.incs, 
                    subdividedString[i].trim()
                ]
            }
        } else if (subdividedString[i].match('!define')) {
            meta = { 
                ...meta, 
                defs: [ 
                    ...meta.defs, subdividedString[i].trim(),
                ]
            }
        } else if (subdividedString[i].match('LAYOUT_WITH_LEGEND' )) {
            meta = { 
                ...meta, 
                legend: subdividedString[i].trim() + '()', 
            }
        } else if (subdividedString[i].match('title')) {
            let title = subdividedString[i].replace('title', '').replace(/' '/g, '');  
            meta = { 
                ...meta, 
                title: title.trim(),
            }
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
                    nodes: [
                        ...scheme.schemeData.nodes,
                        newElement.object,
                    ],
                }
            }

            for (let nestedNode of element.elements) {
                const childNode: BuilderResponse = rfBuilder.getRfObject(nestedNode, newElement.object.id);
             
                scheme = {
                    ...scheme,
                    schemeData: {
                        ...scheme.schemeData,
                        nodes: [
                            ...scheme.schemeData.nodes,
                            childNode.object,
                        ],
                    }
                }
            }
        } else {
            // Ignore an empty object, if current ver. of service isn't support this command
            continue;
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
        axios.post(reqConfig.serverUrl, {
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
                    width:     '550px',
                    minHeight: '100%',
                    maxHeight: '100%',
                    overflow:  'auto',
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