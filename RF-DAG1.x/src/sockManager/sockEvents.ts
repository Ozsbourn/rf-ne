import { EdgeChange, NodeChange } from "reactflow";
import useStore from "../store/store";

import socketManager from "./sockManager";



export const eventsDefs = {
    conn:  'connection',

    edgeChange: 'edgesChange',

    nodeChange:      'nodesChange',
    nodeLabelChange: 'nodeLabelChange',

    discon: 'disconnect',
};



/**
 * Apply got nodes change data to ReactFlow component
 *
 * @param      {string}        sourcererId  The sourcerer identifier
 * @param      {NodeChange[]}  changes      The changes of nodes
 */
export const nodesChangeEvent = (sourcererId: string, changes: NodeChange[]) => {
    if (socketManager.getSocketId() !== sourcererId) {
        useStore.getState().onNodesChangeByEmit(changes);    
    }
};

/**
 * Apply got edges change data to ReactFlow component
 *
 * @param      {string}        sourcererId  The sourcerer identifier
 * @param      {EdgeChange[]}  changes      The changes of edges
 */
export const edgesChangeEvent = (sourcererId: string, changes: EdgeChange[]) => {
    if (socketManager.getSocketId() !== sourcererId) {
        useStore.getState().onEdgesChangeByEmit(changes);
    }
};


/**
 * Apply new label for node 
 *
 * @param      {string}  sourcererId  The sourcerer identifier
 * @param      {string}  newLabel     The new label
 * @param      {string}  nodeId       The node identifier that needed to update label
 */
export const nodeLabelChange = (sourcererId: string, newLabel: string, nodeId: string) => {
    if (socketManager.getSocketId() !== sourcererId) {
        useStore.getState().onNodeLabelChangeByEmit(newLabel, nodeId);
    }
};