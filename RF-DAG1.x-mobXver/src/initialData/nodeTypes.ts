// import CustomNode from '../components/defaultNodes/node';
import CustomNode from '../components/defaultNodes/customNode';

import C4BaseNode from '../components/diagramms/C4/nodes/C4BaseNode';
import C4Boundary from '../components/diagramms/C4/nodes/C4Boundary';



export const nodeTypes = {
    custom:     CustomNode,
    // BaseNode:   CustomNode,
    C4Node:     C4BaseNode,
    C4Boundary: C4Boundary,
}