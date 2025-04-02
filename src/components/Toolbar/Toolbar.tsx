import { Node } from '@xyflow/react';
import useFlowStore from '../../store/useFlowStore';
import { NodeData } from '../../types';

const nodeTypes = [
  {
    type: 'default',
    label: '基本ノード',
    emoji: '📦',
    className: 'bg-white dark:bg-gray-800',
  },
  {
    type: 'input',
    label: '入力ノード',
    emoji: '📥',
    className: 'bg-blue-100 dark:bg-blue-900',
  },
  {
    type: 'output',
    label: '出力ノード',
    emoji: '📤',
    className: 'bg-green-100 dark:bg-green-900',
  },
];

const actionButtons = [
  {
    label: 'デフォルトに戻す',
    emoji: '🔄',
    action: 'resetToDefault',
  },
  {
    label: 'クリア',
    emoji: '🗑️',
    action: 'clearCanvas',
  },
  {
    label: '保存',
    emoji: '💾',
    action: 'saveToLocalStorage',
  },
  {
    label: '読込',
    emoji: '📂',
    action: 'loadFromLocalStorage',
  },
];

export const Toolbar = () => {
  const {
    addNode,
    theme,
    toggleTheme,
    clearCanvas,
    saveToLocalStorage,
    loadFromLocalStorage,
    resetToDefault,
  } = useFlowStore();

  const handleAddNode = (type: string) => {
    const position = {
      x: Math.random() * 500,
      y: Math.random() * 500,
    };

    const newNode: Node<NodeData> = {
      id: `node-${Date.now()}`,
      type,
      position,
      data: { 
        label: `${type} node`,
        description: '新しいノード'
      },
    };

    addNode(newNode);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'resetToDefault':
        if (window.confirm('デフォルトの状態に戻しますか？\n現在のキャンバスは上書きされます。')) {
          resetToDefault();
        }
        break;
      case 'clearCanvas':
        if (window.confirm('キャンバスをクリアしますか？')) {
          clearCanvas();
        }
        break;
      case 'saveToLocalStorage':
        saveToLocalStorage();
        alert('保存しました！');
        break;
      case 'loadFromLocalStorage':
        if (window.confirm('保存されたデータを読み込みますか？\n現在のキャンバスは上書きされます。')) {
          loadFromLocalStorage();
        }
        break;
    }
  };

  return (
    <div className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">ツールボックス</h3>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* ノード追加ボタン */}
        <div className="border-b dark:border-gray-700 pb-2 mb-2">
          {nodeTypes.map((nodeType) => (
            <button
              key={nodeType.type}
              onClick={() => handleAddNode(nodeType.type)}
              className={`
                flex items-center gap-2 p-2 rounded-md w-full
                hover:bg-gray-100 dark:hover:bg-gray-700
                transition-colors duration-200
                ${nodeType.className}
              `}
            >
              <span>{nodeType.emoji}</span>
              <span className="text-sm">{nodeType.label}</span>
            </button>
          ))}
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col gap-1">
          {actionButtons.map((button) => (
            <button
              key={button.action}
              onClick={() => handleAction(button.action)}
              className="
                flex items-center gap-2 p-2 rounded-md w-full
                bg-gray-100 dark:bg-gray-700
                hover:bg-gray-200 dark:hover:bg-gray-600
                transition-colors duration-200
              "
            >
              <span>{button.emoji}</span>
              <span className="text-sm">{button.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 