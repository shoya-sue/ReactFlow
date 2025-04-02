import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import { defaultNodes, defaultEdges } from '../config/defaultState';
import { EdgeData, NodeData } from '../types';

type Theme = 'light' | 'dark';

interface IFlowState {
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
  theme: Theme;
  onNodesChange: (changes: NodeChange<Node<NodeData>>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge<EdgeData>>[]) => void;
  onConnect: (connection: Connection) => void;
  updateEdge: (id: string, data: Partial<Edge<EdgeData>>) => void;
  addNode: (node: Node<NodeData>) => void;
  removeNode: (nodeId: string) => void;
  toggleTheme: () => void;
  clearCanvas: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  resetToDefault: () => void;
}

const useFlowStore = create<IFlowState>()(
  persist(
    (set, get) => ({
      nodes: defaultNodes,
      edges: defaultEdges,
      theme: 'light',
      onNodesChange: (changes: NodeChange<Node<NodeData>>[]) => {
        set({
          nodes: applyNodeChanges<Node<NodeData>>(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange<Edge<EdgeData>>[]) => {
        set({
          edges: applyEdgeChanges<Edge<EdgeData>>(changes, get().edges),
        });
      },
      onConnect: (connection) => {
        set((state) => ({
          edges: [
            ...state.edges,
            {
              ...connection,
              id: `edge-${Date.now()}`,
              data: {
                label: 'New Edge',
                style: {
                  type: 'default',
                  color: '#b1b1b7',
                  width: 1,
                  animated: false,
                },
              },
            } as Edge<EdgeData>,
          ],
        }));
      },
      updateEdge: (id, data) => {
        set((state) => ({
          edges: state.edges.map((edge) =>
            edge.id === id ? { ...edge, ...data } : edge
          ),
        }));
      },
      addNode: (node) => {
        set((state) => ({
          nodes: [...state.nodes, node],
        }));
      },
      removeNode: (nodeId) => {
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== nodeId),
          edges: state.edges.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId
          ),
        }));
      },
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        }));
      },
      clearCanvas: () => {
        set({
          nodes: [],
          edges: [],
        });
      },
      saveToLocalStorage: () => {
        const state = get();
        localStorage.setItem(
          'flow-manual-save',
          JSON.stringify({
            nodes: state.nodes,
            edges: state.edges,
            timestamp: new Date().toISOString(),
          })
        );
      },
      loadFromLocalStorage: () => {
        const savedState = localStorage.getItem('flow-manual-save');
        if (savedState) {
          const { nodes, edges } = JSON.parse(savedState);
          set({ nodes, edges });
        }
      },
      resetToDefault: () => {
        set({
          nodes: defaultNodes,
          edges: defaultEdges,
        });
      },
    }),
    {
      name: 'flow-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        nodes: state.nodes,
        edges: state.edges,
        theme: state.theme,
      }),
    }
  )
);

export default useFlowStore; 