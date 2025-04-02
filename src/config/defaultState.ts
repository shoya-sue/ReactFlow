import { Node, Edge } from '@xyflow/react';
import { NodeData, EdgeData } from '../types';

export const defaultNodes: Node<NodeData>[] = [
  {
    id: 'node-1',
    type: 'default',
    position: { x: 100, y: 100 },
    data: { label: 'Node 1' },
  },
  {
    id: 'node-2',
    type: 'default',
    position: { x: 300, y: 100 },
    data: { label: 'Node 2' },
  },
];

export const defaultEdges: Edge<EdgeData>[] = [
  {
    id: 'edge-1',
    source: 'node-1',
    target: 'node-2',
    type: 'bezier',
    data: {
      label: 'Edge 1',
      style: {
        type: 'default',
        color: '#b1b1b7',
        width: 1,
        animated: false,
      },
    },
  },
]; 