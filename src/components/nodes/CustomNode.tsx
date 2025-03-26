import { Handle, Position, NodeProps } from '@xyflow/react';
import { useState, useCallback } from 'react';

const CustomNode = ({ data, isConnectable, type }: NodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const onDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsEditing(false);
    data.label = label;
  }, [data, label]);

  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(evt.target.value);
  }, []);

  const nodeColors = {
    input: 'border-blue-500 bg-blue-50 dark:bg-blue-900',
    default: 'border-green-500 bg-green-50 dark:bg-green-900',
    output: 'border-red-500 bg-red-50 dark:bg-red-900',
  };

  const colorClass = type ? nodeColors[type as keyof typeof nodeColors] : nodeColors.default;

  return (
    <div className={`px-4 py-2 shadow-md rounded-md border-2 ${colorClass}`}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-gray-500 dark:bg-gray-400"
      />

      <div className="flex items-center">
        {isEditing ? (
          <input
            type="text"
            value={label}
            onChange={onChange}
            onBlur={onBlur}
            className="bg-white dark:bg-gray-800 p-1 rounded border border-gray-300 dark:border-gray-600"
            autoFocus
          />
        ) : (
          <div
            onDoubleClick={onDoubleClick}
            className="text-sm font-medium text-gray-800 dark:text-gray-200 cursor-text"
          >
            {label}
          </div>
        )}
      </div>

      {data.description && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {data.description}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-2 h-2 bg-gray-500 dark:bg-gray-400"
      />
    </div>
  );
};

export default CustomNode; 