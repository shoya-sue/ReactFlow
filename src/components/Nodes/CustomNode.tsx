import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface CustomNodeData {
  label: string;
}

interface CustomNodeProps {
  data: CustomNodeData;
  type?: string;
}

export const CustomNode = memo(({ data, type }: CustomNodeProps) => {
  const getNodeStyle = () => {
    switch (type) {
      case 'input':
        return 'bg-blue-100 dark:bg-blue-900';
      case 'output':
        return 'bg-green-100 dark:bg-green-900';
      default:
        return 'bg-white dark:bg-gray-800';
    }
  };

  return (
    <div
      className={`
        px-4 py-2 rounded-lg shadow-lg
        border-2 border-gray-200 dark:border-gray-700
        ${getNodeStyle()}
      `}
    >
      {/* 入力ハンドル（input以外のノードに表示） */}
      {type !== 'input' && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-blue-500"
        />
      )}

      {/* ノードの内容 */}
      <div className="flex items-center gap-2">
        <span className="text-xl">
          {type === 'input' ? '📥' : type === 'output' ? '📤' : '📦'}
        </span>
        <span className="font-medium">{data.label}</span>
      </div>

      {/* 出力ハンドル（output以外のノードに表示） */}
      {type !== 'output' && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 !bg-blue-500"
        />
      )}
    </div>
  );
}); 