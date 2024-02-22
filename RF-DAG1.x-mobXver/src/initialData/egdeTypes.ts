import CustomEdge from "../components/defaultEdges/edge";
import FloatingEdge from "../components/defaultEdges/floatingEdge";
// import { SmartBezierEdge } from '@tisoap/react-flow-smart-edge'



export const edgeTypes = {
    'defaultEdge': CustomEdge,
    floating: FloatingEdge,
    // smart:         SmartBezierEdge,
};