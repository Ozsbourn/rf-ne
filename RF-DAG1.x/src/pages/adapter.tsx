import { useEffect, useState } from "react";
import contextExample from "../initialData/context";
import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import useStore from "../store/store";
import axios from "axios";
import plantumlEncoder from 'plantuml-encoder';



const parse = (pumlScheme: string) => {
    let newStr = pumlScheme.replace(/\(/g, ' ')
                           .replace(/\)/g, ' ')
                           .replace(/','/g, ' ');
    let newStr2 = newStr.split('\n');

    let scheme: any = { meta: {}, schemeData: { nodes: [], edges: [] }};
    for (let i = 0; i < newStr2.length; i++) {
        /* Serving metainfo of PlantUML */
    	if (newStr2[i].match('!include')) {
    		scheme = { ...scheme, meta: { ...scheme.meta, inc: newStr2[i].trim() } }
    	} else if (newStr2[i].match('LAYOUT_WITH_LEGEND')) {
    		scheme = { ...scheme, meta: { ...scheme.meta, legend: newStr2[i].trim() + '()' } }
    	} else if (newStr2[i].match('title')) {
    		let title = newStr2[i].replace('title', '').replace(/' '/g, '');  
    		scheme = { ...scheme, meta: { ...scheme.meta, title: title.trim() } }
    	}
        /* Serving data of nodes from PlantUML to RFNE */ 
        else if (newStr2[i].match('Person')) {
    		let persons = newStr2[i].replace('Person', ' ').split(/"*"/gi);

    		let personsClear: string[] = [];
    		for (let element of persons) {
    			let tmp = element.replace(',', ' ').trim();
    			if (tmp[0] == ',') 
    				continue;
    			if (tmp !== '') {
    				personsClear.push(tmp);
    			}
    		}
    		                     
    		scheme = {
    			...scheme,
    			schemeData: {
    				...scheme.schemeData,
    				nodes: [
    					...scheme.schemeData.nodes,
    					{
    						id: personsClear[0],
    						type: 'C4BaseNode',
    						position: {
    							x: 0,
    							y: 0,
    						},
    						data: {
    							// userDefName: personsClear[0],
    							mainLabel:   personsClear[1],
    							nodeType:    'Person',
    							typeContent: personsClear[0],
    							description: personsClear[2], 
    						}
    					}
    				]
    			}
    		}
    	} else if (newStr2[i].match('System_Ext')) {
    		let systemExts = newStr2[i].replace('System_Ext', ' ').split(/"*"/gi);

    		let systemsExtClear: string[] = [];
    		for (let element of systemExts) {
    			let tmp = element.replace(',', ' ').trim();
    			if (tmp[0] == ',') 
    				continue;
    			if (tmp !== '') {
    				systemsExtClear.push(tmp);
    			}
    		}
    		                     
    		scheme = {
    			...scheme,
    			schemeData: {
    				...scheme.schemeData,
    				nodes: [
    					...scheme.schemeData.nodes,
    					{
    						id: systemsExtClear[0],
    						type: 'C4BaseNode',
    						position: {
    							x: 0,
    							y: 0,
    						},
    						data: {
    							// userDefName: personsClear[0],
    							mainLabel:   systemsExtClear[1],
    							nodeType:    'Software System Extension',
    							typeContent: systemsExtClear[0],
    							description: systemsExtClear[2], 
    						}
    					}
    				]
    			}
    		}
    	} else if (newStr2[i].match('System ')) {
    		let systems = newStr2[i].replace('System', ' ').split(/"*"/gi);

    		let systemsClear: string[] = [];
    		for (let element of systems) {
    			let tmp = element.replace(',', ' ').trim();
    			if (tmp[0] == ',') 
    				continue;
    			if (tmp !== '') {
    				systemsClear.push(tmp);
    			}
    		}
    		                     
    		scheme = {
    			...scheme,
    			schemeData: {
    				...scheme.schemeData,
    				nodes: [
    					...scheme.schemeData.nodes,
    					{
    						id: systemsClear[0],
    						type: 'C4BaseNode',
    						position: {
    							x: 0,
    							y: 0,
    						},
    						data: {
    							// userDefName: personsClear[0],
    							mainLabel:   systemsClear[1],
    							nodeType:    'Software System',
    							typeContent: systemsClear[0],
    							description: systemsClear[2], 
    						}
    					}
    				]
    			}
    		}
    	} else if (newStr2[i].match('Rel')) {
    		let rels = newStr2[i].replace('Rel', ' ').split(/"*"/gi);

    		let relsClear: string[] = [];
    		for (let i = 0; i < rels.length; i++) {
                let tmp = rels[i].trim();

                console.log(tmp);
    			if (i == 0) {
    				let ids = tmp.split(',');
    				relsClear.push(ids[0].trim());
    				relsClear.push(ids[1].trim());
    			} else if (tmp !== '') {
    				relsClear.push(tmp);
    			}	
    		}
    		                     
    		scheme = {
    			...scheme,
    			schemeData: {
    				...scheme.schemeData,
    				edges: [
    					...scheme.schemeData.edges,
    					{
    						id: relsClear[0] + '-' + relsClear[1],
    						type: 'C4BaseEdge',
    						source: relsClear[0],
    						target: relsClear[1],
    						data: {
    							label: relsClear[2], 
    						}
    					}
    				]
    			}
    		}
    	} else {
            console.log(`Unexpected token at string #${i}: ${newStr2[i]}`);
        }
    }

    scheme = {
    	...scheme,
    	meta: {
    		...scheme.meta,
    		edited: Date()
    	}
    }

    useStore.getState().setAdapterOutput(JSON.stringify(scheme, null, 2));
};

// Need builder pattern usage here
// const adaptResponseToRFScheme = (responsedData: any) => {
//     let result: any = { meta: {}, schemeData: { nodes: [], edges: [] }}};
    
//     for (let element of responsedData.elements) {
//         result = {
//             ...result,
//             schemeData: {
//                 nodes: [
//                     ...result.nodes,
//                     {
//                         id: element.alias,
//                         type: 'C4BaseNode',
//                         position: {
//                             x: 0,
//                             y: 0,
//                         },
//                         data: {
//                             mainLabel:   element.label,
//                             nodeType:    element.type_.name,
//                             typeContent: (element.techn) ? element.techn : element.type_.name,
//                             description: element.descr,
//                         }
//                     }
//                 ]
//             }
//         };
//     }

//     return JSON.stringify(result, null, 2);
// };


// For external plantuml
const Adapter = () => {
    const { setAdapterOutput } = useStore();
    const [code, setCode] = useState(contextExample);

	useEffect(() => {
		// parse(contextExample);
        // let parser = new ParseAdapter(contextExample);
        // console.log(parser.toJson())
	}, []);

    const sendToServer = () => {
        const encoded = plantumlEncoder.encode(code);
        console.log(encoded);

        // Full way for test
        axios.post('http://localhost:5000', {
            pumlEncoded: encoded
        })
        .then(function (res) {
            // setAdapterOutput(adaptResponseToRFScheme(res.data[0]));
            setAdapterOutput(res.data[0]);
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
                    width: '550px',
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
                        // json(),
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
                value='Apply changes' 
                style={{
                    width: '100px', 
                    height: '25px'
                }} />
        </>
    )
}

export default Adapter;