import { createWithEqualityFn as create } from 'zustand/traditional';

import { Node, Edge }       from 'reactflow';
import { CustomNodeConfig } from '../nodeConfig';

// import * as Y from 'yjs';
// import yjsMiddleware from "zustand-middleware-yjs";
// import { WebrtcProvider } from 'y-webrtc';



// const ydoc = new Y.Doc();
// ydoc.on('beforeTransaction', function(tr: Transaction, ydoc: Y.Doc) {
//     console.log(ydoc);
// })
// ydoc.on('update', (update: Uint8Array) => {
//     Y.applyUpdate(ydoc, update);
// }); 
// const provider = new WebrtcProvider('room-name', ydoc);


type RFState = {
    nodes:  Node[];
    edges:  Edge[];

    handlers:       CustomNodeConfig[];

    getJsonScheme:     () => string;
};

const collabStore = create<RFState>(
    yjsMiddleware<RFState>(ydoc, 'shared', (set: any, get: any) => ({
        nodes: [],
        edges: [],

        handlers: [],

        getJsonScheme: () => {
            const json = {
                ...get().nodes,
                ...get().edges,
                ...get().handlers,
            };
            return json.stringify();
        },
    }))
);

export default collabStore;