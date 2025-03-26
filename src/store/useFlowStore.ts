import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FlowState, FlowNode, FlowEdge, Theme } from '@/types';
import { applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from '@xyflow/react';
import { initialNodes } from '@/config/initialNodes';
import { initialEdges } from '@/config/initialEdges';

const useFlowStore = create<FlowState>()(
  persist(
    (set) => ({
      nodes: initialNodes,
      edges: initialEdges,
      theme: 'light' as Theme,
      setNodes: (updater: FlowNode[] | ((nodes: FlowNode[]) => FlowNode[])) => {
        set((state) => ({
          nodes: typeof updater === 'function' ? updater(state.nodes) : updater,
        }));
      },
      setEdges: (updater: FlowEdge[] | ((edges: FlowEdge[]) => FlowEdge[])) => {
        set((state) => ({
          edges: typeof updater === 'function' ? updater(state.edges) : updater,
        }));
      },
      onNodesChange: (changes: NodeChange[]) => {
        set((state) => ({
          nodes: applyNodeChanges(changes, state.nodes) as FlowNode[],
        }));
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set((state) => ({
          edges: applyEdgeChanges(changes, state.edges) as FlowEdge[],
        }));
      },
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'flow-storage',
      partialize: (state) => ({
        nodes: state.nodes,
        edges: state.edges,
        theme: state.theme,
      }),
    }
  )
);

export default useFlowStore; 