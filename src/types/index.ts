import { Node, Edge } from '@xyflow/react';

export type Theme = 'light' | 'dark';

export interface NodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  type?: string;
}

export interface EdgeData extends Record<string, unknown> {
  label?: string;
  style?: EdgeStyle;
  controlPoints?: {
    sourceHandle?: { x: number; y: number };
    targetHandle?: { x: number; y: number };
  };
}

export interface EdgeStyle {
  type?: 'default' | 'dashed' | 'dotted';
  color?: string;
  width?: number;
  animated?: boolean;
  arrow?: {
    start?: boolean;
    end?: boolean;
    size?: number;
  };
  state?: {
    type: 'error' | 'warning' | 'success' | 'info';
    message?: string;
    timestamp?: string;
    details?: string;
  };
  group?: string;
  preset?: string;
  animation?: {
    type: 'flow' | 'pulse' | 'dash' | 'none';
    duration?: number;
    delay?: number;
  };
}

export type EdgeType = 'default' | 'straight' | 'step' | 'smoothstep' | 'bezier';

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