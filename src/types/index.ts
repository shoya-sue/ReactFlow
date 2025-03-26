import { Node, Edge } from '@xyflow/react';

export type Theme = 'light' | 'dark';

export interface NodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  type?: string;
}

export interface EdgeData extends Record<string, unknown> {
  label?: string;
}

export type FlowNode = Node<NodeData>;
export type FlowEdge = Edge<EdgeData>;

export interface FlowState {
  nodes: FlowNode[];
  edges: FlowEdge[];
  theme: Theme;
  setNodes: (nodes: FlowNode[] | ((nodes: FlowNode[]) => FlowNode[])) => void;
  setEdges: (edges: FlowEdge[] | ((edges: FlowEdge[]) => FlowEdge[])) => void;
  onNodesChange: (changes: any[]) => void;
  onEdgesChange: (changes: any[]) => void;
  toggleTheme: () => void;
}

export interface ToolbarProps {
  onSave?: () => void;
  onExport?: () => void;
  onReset?: () => void;
  onThemeToggle?: () => void;
}

export interface ErrorState {
  message: string;
  type: 'error' | 'warning' | 'info';
  show: boolean;
} 