import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  getStraightPath,
  getSmoothStepPath,
  getEdgeCenter,
} from '@xyflow/react';
import { FC, useState, useCallback, useMemo, useEffect } from 'react';
import { EdgeData, EdgeType, EdgeStyle } from '../../types';
import { edgePresets } from '../../config/edgePresets';

interface ExtendedEdgeProps extends EdgeProps {
  type?: EdgeType;
}

interface ControlPoint {
  x: number;
  y: number;
}

interface ControlHandleProps {
  position: ControlPoint;
  onDrag: (newPosition: ControlPoint) => void;
}

const getEdgePath = (type: EdgeType, props: any, controlPoints?: EdgeData['controlPoints']) => {
  const commonProps = {
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  };

  switch (type) {
    case 'straight':
      return getStraightPath(commonProps);
    case 'step':
      return getSmoothStepPath({
        ...commonProps,
        borderRadius: 0,
      });
    case 'smoothstep':
      return getSmoothStepPath({
        ...commonProps,
        borderRadius: 10,
      });
    case 'bezier':
    default:
      if (controlPoints) {
        const sourceHandle = controlPoints.sourceHandle || {
          x: commonProps.sourceX + (commonProps.targetX - commonProps.sourceX) * 0.25,
          y: commonProps.sourceY,
        };
        const targetHandle = controlPoints.targetHandle || {
          x: commonProps.sourceX + (commonProps.targetX - commonProps.sourceX) * 0.75,
          y: commonProps.targetY,
        };
        const path = `M ${commonProps.sourceX},${commonProps.sourceY} ` +
          `C ${sourceHandle.x},${sourceHandle.y} ` +
          `${targetHandle.x},${targetHandle.y} ` +
          `${commonProps.targetX},${commonProps.targetY}`;
        return [
          path,
          (sourceHandle.x + targetHandle.x) / 2,
          (sourceHandle.y + targetHandle.y) / 2,
        ] as [string, number, number];
      }
      return getBezierPath(commonProps);
  }
};

const getAnimationStyle = (animation?: EdgeStyle['animation']) => {
  if (!animation || animation.type === 'none') return undefined;

  const duration = animation.duration || 20;
  const delay = animation.delay || 0;

  switch (animation.type) {
    case 'flow':
      return `flow ${duration}s infinite linear`;
    case 'pulse':
      return `pulse ${duration}s infinite ease-in-out`;
    case 'dash':
      return `dash ${duration}s infinite linear`;
    default:
      return undefined;
  }
};

const StateIndicator: FC<{ state: EdgeStyle['state'] }> = ({ state }) => {
  if (!state) return null;

  const bgColorMap = {
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    success: 'bg-green-500',
    info: 'bg-blue-500',
  };

  return (
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
      <div
        className={`px-3 py-1 rounded-full text-xs text-white shadow-md ${bgColorMap[state.type]} cursor-help`}
        title={state.details}
      >
        {state.message}
      </div>
    </div>
  );
};

const ControlHandle: FC<ControlHandleProps> = ({ position, onDrag }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        onDrag({
          x: event.clientX,
          y: event.clientY,
        });
      }
    },
    [isDragging, onDrag]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className="absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-move transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform"
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
    />
  );
};

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  style: defaultStyle,
  type = 'bezier',
}: ExtendedEdgeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState((data as EdgeData)?.label || '');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [controlPoints, setControlPoints] = useState<EdgeData['controlPoints']>(
    (data as EdgeData)?.controlPoints || {
      sourceHandle: {
        x: sourceX + (targetX - sourceX) * 0.25,
        y: sourceY,
      },
      targetHandle: {
        x: sourceX + (targetX - sourceX) * 0.75,
        y: targetY,
      },
    }
  );

  // エッジのパスを計算
  const [edgePath, labelX, labelY] = useMemo(() => {
    return getEdgePath(type as EdgeType, {
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    }, type === 'bezier' ? controlPoints : undefined);
  }, [type, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, controlPoints]);

  // スタイルの設定
  const style = useMemo(() => {
    const edgeData = data as EdgeData;
    const edgeStyle = edgeData?.style || {};
    const preset = edgeStyle.preset ? edgePresets[edgeStyle.preset] : undefined;
    const mergedStyle = preset ? { ...preset, ...edgeStyle } : edgeStyle;

    return {
      ...defaultStyle,
      strokeDasharray: mergedStyle.type === 'dashed' ? '5,5' : mergedStyle.type === 'dotted' ? '1,5' : undefined,
      stroke: mergedStyle.color || '#b1b1b7',
      strokeWidth: mergedStyle.width || 1,
      animation: getAnimationStyle(mergedStyle.animation),
    };
  }, [defaultStyle, data]);

  // 矢印のマーカーを設定
  const markers = useMemo(() => {
    const edgeData = data as EdgeData;
    const edgeStyle = edgeData?.style || {};
    const preset = edgeStyle.preset ? edgePresets[edgeStyle.preset] : undefined;
    const mergedStyle = preset ? { ...preset, ...edgeStyle } : edgeStyle;
    const arrow = mergedStyle.arrow || {};
    const color = mergedStyle.color || '#b1b1b7';
    const size = arrow.size || 8;

    return (
      <defs>
        {arrow.start && (
          <marker
            id={`arrow-start-${id}`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth={size}
            markerHeight={size}
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
          </marker>
        )}
        {(arrow.end || !mergedStyle.arrow) && (
          <marker
            id={`arrow-end-${id}`}
            viewBox="0 0 10 10"
            refX="1"
            refY="5"
            markerWidth={size}
            markerHeight={size}
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
          </marker>
        )}
      </defs>
    );
  }, [id, data]);

  const onDoubleClick = useCallback((evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsEditing(true);
  }, []);

  const onContextMenu = useCallback((evt: React.MouseEvent) => {
    evt.preventDefault();
    setContextMenu({ x: evt.clientX, y: evt.clientY });
  }, []);

  const onBlur = useCallback(() => {
    setIsEditing(false);
    if (data) {
      (data as EdgeData).label = label;
    }
  }, [data, label]);

  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(evt.target.value);
  }, []);

  const handleSourceHandleDrag = useCallback((newPosition: ControlPoint) => {
    setControlPoints((prev) => ({
      ...prev,
      sourceHandle: newPosition,
    }));
    if (data) {
      (data as EdgeData).controlPoints = {
        ...controlPoints,
        sourceHandle: newPosition,
      };
    }
  }, [data, controlPoints]);

  const handleTargetHandleDrag = useCallback((newPosition: ControlPoint) => {
    setControlPoints((prev) => ({
      ...prev,
      targetHandle: newPosition,
    }));
    if (data) {
      (data as EdgeData).controlPoints = {
        ...controlPoints,
        targetHandle: newPosition,
      };
    }
  }, [data, controlPoints]);

  // マーカーの設定を適用
  const edgeData = data as EdgeData;
  const edgeStyle = edgeData?.style || {};
  const preset = edgeStyle.preset ? edgePresets[edgeStyle.preset] : undefined;
  const mergedStyle = preset ? { ...preset, ...edgeStyle } : edgeStyle;
  const arrow = mergedStyle.arrow || {};
  const markerStartUrl = arrow.start ? `url(#arrow-start-${id})` : undefined;
  const markerEndUrl = arrow.end || !mergedStyle.arrow ? `url(#arrow-end-${id})` : undefined;

  return (
    <>
      {markers}
      <BaseEdge
        path={edgePath}
        markerStart={markerStartUrl}
        markerEnd={markerEndUrl}
        style={style}
        onContextMenu={onContextMenu}
        className={`cursor-pointer ${mergedStyle.group ? `group-${mergedStyle.group}` : ''}`}
      />
      {type === 'bezier' && controlPoints && (
        <>
          <ControlHandle
            position={controlPoints.sourceHandle!}
            onDrag={handleSourceHandleDrag}
          />
          <ControlHandle
            position={controlPoints.targetHandle!}
            onDrag={handleTargetHandleDrag}
          />
        </>
      )}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          {isEditing ? (
            <input
              type="text"
              value={label}
              onChange={onChange}
              onBlur={onBlur}
              className="bg-white dark:bg-gray-800 p-1 rounded text-sm border border-gray-300 dark:border-gray-600"
              autoFocus
            />
          ) : (
            <div
              onDoubleClick={onDoubleClick}
              className="px-2 py-1 rounded bg-white dark:bg-gray-800 shadow-md text-sm text-gray-700 dark:text-gray-300 cursor-text hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {label || 'エッジをダブルクリックして編集'}
            </div>
          )}
          {mergedStyle.state && <StateIndicator state={mergedStyle.state} />}
        </div>
      </EdgeLabelRenderer>
      <style>
        {`
          @keyframes flow {
            from {
              stroke-dashoffset: 100;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes pulse {
            0% {
              stroke-opacity: 1;
            }
            50% {
              stroke-opacity: 0.3;
            }
            100% {
              stroke-opacity: 1;
            }
          }
          @keyframes dash {
            from {
              stroke-dashoffset: 0;
            }
            to {
              stroke-dashoffset: 100;
            }
          }
          .group-group1 {
            filter: drop-shadow(0 0 3px rgba(236, 72, 153, 0.5));
          }
          .group-group2 {
            filter: drop-shadow(0 0 3px rgba(6, 182, 212, 0.5));
          }
        `}
      </style>
    </>
  );
};

export default CustomEdge; 