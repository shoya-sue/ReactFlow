import { FC, useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Edge,
  ReactFlowProvider,
} from '@xyflow/react';
import useFlowStore from '../store/useFlowStore';
import CustomEdge from './edges/CustomEdge';
import { EdgeStyleToolbar } from './Toolbar/EdgeStyleToolbar';
import { EdgeData } from '../types';

const edgeTypes = {
  default: CustomEdge,
};

const FlowContent: FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    theme,
  } = useFlowStore();

  const [selectedEdge, setSelectedEdge] = useState<Edge<EdgeData> | undefined>();

  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge<EdgeData>) => {
    setSelectedEdge(edge);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedEdge(undefined);
  }, []);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        edgeTypes={edgeTypes}
        fitView
        className={theme === 'dark' ? 'dark' : ''}
      >
        <Background />
        <Controls />
        <EdgeStyleToolbar selectedEdge={selectedEdge} />
      </ReactFlow>
    </div>
  );
};

export const Flow: FC = () => (
  <ReactFlowProvider>
    <FlowContent />
  </ReactFlowProvider>
); 