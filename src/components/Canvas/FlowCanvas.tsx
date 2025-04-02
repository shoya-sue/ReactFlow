import { ReactNode, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlowProvider,
  BackgroundVariant,
  useReactFlow,
  useKeyPress,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useFlowStore from '../../store/useFlowStore';
import { Toolbar } from '../Toolbar/Toolbar';
import { CustomNode } from '../Nodes/CustomNode';

const nodeTypes = {
  default: CustomNode,
  input: CustomNode,
  output: CustomNode,
};

// スナップグリッドの設定
const snapGrid: [number, number] = [16, 16];

interface IFlowCanvasProps {
  children?: ReactNode;
}

const Flow = ({ children }: IFlowCanvasProps) => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    theme,
    removeNode,
  } = useFlowStore();

  const { getNodes } = useReactFlow();

  // BackspaceとDeleteキーの押下を検知
  const isBackspace = useKeyPress('Backspace');
  const isDelete = useKeyPress('Delete');

  // 選択されたノードを削除
  const onDeleteKey = useCallback(() => {
    const selectedNodes = getNodes().filter((node) => node.selected);
    selectedNodes.forEach((node) => removeNode(node.id));
  }, [getNodes, removeNode]);

  // BackspaceまたはDeleteキーが押されたら削除
  if (isBackspace || isDelete) {
    onDeleteKey();
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={{
        type: 'smoothstep',
        animated: true,
      }}
      fitView
      className="bg-white dark:bg-gray-900"
      snapToGrid={true}
      snapGrid={snapGrid}
      connectionMode={ConnectionMode.Loose}
      selectNodesOnDrag={false}
    >
      {/* 背景グリッド */}
      <Background
        color={theme === 'light' ? '#ccc' : '#333'}
        variant={BackgroundVariant.Dots}
        gap={snapGrid[0]}
        size={1}
        offset={1}
      />

      {/* コントロールパネル */}
      <Controls
        className="bg-white dark:bg-gray-800 shadow-lg"
        showInteractive={false}
      />

      {/* ミニマップ */}
      <MiniMap
        className="bg-white dark:bg-gray-800 shadow-lg"
        zoomable
        pannable
      />

      {/* カスタムパネル */}
      <Panel position="top-left" className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
        <h3 className="text-sm font-medium">React Flow GUI Tool</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Shift + ドラッグで範囲選択<br />
          Delete/Backspaceで削除<br />
          グリッドにスナップします
        </p>
      </Panel>

      {children}
    </ReactFlow>
  );
};

export const FlowCanvas = (props: IFlowCanvasProps) => {
  return (
    <ReactFlowProvider>
      <div className="h-screen w-full">
        <Flow {...props} />
        <Toolbar />
      </div>
    </ReactFlowProvider>
  );
}; 