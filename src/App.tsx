import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useFlowStore from './store/useFlowStore';
import Toolbar from './components/Toolbar';
import CustomNode from './components/nodes/CustomNode';
import CustomEdge from './components/edges/CustomEdge';

const nodeTypes = {
  input: CustomNode,
  default: CustomNode,
  output: CustomNode,
};

const edgeTypes = {
  default: CustomEdge,
};

function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    theme,
  } = useFlowStore();

  return (
    <div style={{ width: '100vw', height: '100vh' }} className={theme}>
      <Toolbar />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={[20, 20]}
        fitView
        className="bg-gray-50 dark:bg-gray-900"
      >
        <Background
          gap={20}
          size={1}
          color={theme === 'light' ? '#e5e7eb' : '#374151'}
        />
        <Controls />
        <MiniMap
          style={{
            backgroundColor: theme === 'light' ? '#f9fafb' : '#1f2937',
          }}
          nodeColor={theme === 'light' ? '#e5e7eb' : '#374151'}
        />
      </ReactFlow>
    </div>
  );
}

export default App; 