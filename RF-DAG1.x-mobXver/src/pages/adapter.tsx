import { memo, useState } from "react";
// For debug; Should be base staff for example or quick start later tho
import contextExample          from "../initialData/context";

import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { store }                  from "../store/globalStore";

import axios           from "axios";
import { reqConfig }   from "../configs/requestsConfig";
import plantumlEncoder from 'plantuml-encoder';

import rfBuilder, { BuilderResponse } from "../libs/rfBuilder";
import dataExchanger from "../libs/dataExchanger";

import { Button, Flex } from "antd";
import nodeFormatter    from "../libs/nodeFormatter";



const parseMetaInfo = (pumlScheme: string) => {
    let clearedString = pumlScheme.replace(/\(/g, ' ')
                                  .replace(/\)/g, ' ')
                                  .replace(/','/g, ' ');
    let subdividedString = clearedString.split('\n');

    let meta: any = { incs: [], defs: [], };
    for (let i = 0; i < subdividedString.length; i++) {
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
        // TODO: expand meta commands servings
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
    nodeFormatter.endFormatting();

    return scheme;
};


// For external plantuml
const Adapter = () => {
    const [code, setCode] = useState(contextExample);

    const updateCodeInEditor = () => {
        const tmp = JSON.stringify(store.getAdapterOutput(), null, 2); 
        setCode(dataExchanger.toPuml(tmp))
    };

    const sendToServer = () => {
        const encoded = plantumlEncoder.encode(code);

        axios.post(reqConfig.serverUrl, {
            pumlEncoded: encoded
        })
        .then(function (res) {
            const rfScheme = {
                meta:       parseMetaInfo(code),
                schemeData: adaptResponsedDataToRFScheme(res.data[0]).schemeData,
            };

            store.setAdapterOutput(rfScheme);
        })
        .catch(function (err) {
            console.log(err);
        });
    };
    


    return (
        <div style={{
            height: '100%',
        }}>
            <CodeMirror
                style={{
                    width:     '400px',
                    minHeight: '85%',
                    maxHeight: '89%',
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

            <Flex vertical={true} gap={5}>
                <Button
                    type="primary"
                    onClick={sendToServer}
                    style={{
                        width: '100%', 
                        height: '35px'
                    }}
                >
                    Apply to Scheme
                </Button>
                <Button
                    type="primary"
                    onClick={updateCodeInEditor}
                    style={{ 
                        width: '100%', 
                        height: '35px'
                    }}
                >
                    Apply to Editor
                </Button>
            </Flex>
        </div>
    )
}

export default memo(Adapter);