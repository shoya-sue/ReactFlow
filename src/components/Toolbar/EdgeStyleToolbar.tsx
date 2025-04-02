import { FC } from 'react';
import { Edge } from '@xyflow/react';
import { EdgeData, EdgeStyle, EdgeType } from '../../types';
import useFlowStore from '../../store/useFlowStore';

interface EdgeStyleToolbarProps {
  selectedEdge?: Edge<EdgeData>;
}

export const EdgeStyleToolbar: FC<EdgeStyleToolbarProps> = ({ selectedEdge }) => {
  const { updateEdge } = useFlowStore();

  if (!selectedEdge) return null;

  const handleStyleChange = (style: Partial<EdgeStyle>) => {
    const newData: Partial<Edge<EdgeData>> = {
      data: {
        ...selectedEdge.data,
        style: {
          ...(selectedEdge.data?.style || {}),
          ...style,
        },
      },
    };
    updateEdge(selectedEdge.id, newData);
  };

  const handleArrowChange = (arrowStyle: Partial<EdgeStyle['arrow']>) => {
    const newData: Partial<Edge<EdgeData>> = {
      data: {
        ...selectedEdge.data,
        style: {
          ...(selectedEdge.data?.style || {}),
          arrow: {
            ...(selectedEdge.data?.style?.arrow || {}),
            ...arrowStyle,
          },
        },
      },
    };
    updateEdge(selectedEdge.id, newData);
  };

  const handleTypeChange = (type: EdgeType) => {
    updateEdge(selectedEdge.id, { ...selectedEdge, type });
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex gap-2">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">スタイル:</label>
        <select
          className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
          onChange={(e) => handleStyleChange({ type: e.target.value as EdgeStyle['type'] })}
          value={selectedEdge.data?.style?.type || 'default'}
        >
          <option value="default">実線</option>
          <option value="dashed">破線</option>
          <option value="dotted">点線</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">タイプ:</label>
        <select
          className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
          onChange={(e) => handleTypeChange(e.target.value as EdgeType)}
          value={selectedEdge.type || 'bezier'}
        >
          <option value="bezier">ベジェ曲線</option>
          <option value="straight">直線</option>
          <option value="step">直角</option>
          <option value="smoothstep">スムーズ直角</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">色:</label>
        <input
          type="color"
          className="w-6 h-6 rounded cursor-pointer"
          value={selectedEdge.data?.style?.color || '#b1b1b7'}
          onChange={(e) => handleStyleChange({ color: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">太さ:</label>
        <input
          type="number"
          className="w-16 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
          min="1"
          max="10"
          value={selectedEdge.data?.style?.width || 1}
          onChange={(e) => handleStyleChange({ width: parseInt(e.target.value) })}
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">アニメーション:</label>
        <input
          type="checkbox"
          className="rounded cursor-pointer"
          checked={selectedEdge.data?.style?.animated || false}
          onChange={(e) => handleStyleChange({ animated: e.target.checked })}
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">矢印:</label>
        <div className="flex items-center gap-1">
          <label className="text-xs">始点</label>
          <input
            type="checkbox"
            className="rounded cursor-pointer"
            checked={selectedEdge.data?.style?.arrow?.start || false}
            onChange={(e) => handleArrowChange({ start: e.target.checked })}
          />
        </div>
        <div className="flex items-center gap-1">
          <label className="text-xs">終点</label>
          <input
            type="checkbox"
            className="rounded cursor-pointer"
            checked={selectedEdge.data?.style?.arrow?.end || true}
            onChange={(e) => handleArrowChange({ end: e.target.checked })}
          />
        </div>
        <div className="flex items-center gap-1">
          <label className="text-xs">サイズ</label>
          <input
            type="number"
            className="w-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-1 py-0.5 text-xs"
            min="4"
            max="16"
            value={selectedEdge.data?.style?.arrow?.size || 8}
            onChange={(e) => handleArrowChange({ size: parseInt(e.target.value) })}
          />
        </div>
      </div>
    </div>
  );
}; 