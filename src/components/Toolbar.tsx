import { useCallback } from 'react';
import useFlowStore from '../store/useFlowStore';
import { FlowNode } from '../types';

const Toolbar = () => {
  const { setNodes, setEdges, toggleTheme, theme } = useFlowStore();

  const addNode = useCallback((type: string) => {
    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      type,
      position: { x: 100, y: 100 },
      data: { 
        label: type === 'input' ? '開始' : type === 'output' ? '終了' : '処理',
        description: '新しいノード'
      },
    };

    setNodes((nodes) => [...nodes, newNode]);
  }, [setNodes]);

  const resetCanvas = useCallback(() => {
    setNodes(() => []);
    setEdges(() => []);
  }, [setNodes, setEdges]);

  return (
    <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-3">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">ノード追加</h3>
          <div className="flex flex-col gap-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
              onClick={() => addNode('input')}
            >
              <span className="material-icons text-lg">play_arrow</span>
              開始ノード
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
              onClick={() => addNode('default')}
            >
              <span className="material-icons text-lg">add_box</span>
              処理ノード
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
              onClick={() => addNode('output')}
            >
              <span className="material-icons text-lg">stop</span>
              終了ノード
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">キャンバス操作</h3>
          <div className="flex flex-col gap-2">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
              onClick={resetCanvas}
            >
              <span className="material-icons text-lg">restart_alt</span>
              リセット
            </button>
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
              onClick={toggleTheme}
            >
              <span className="material-icons text-lg">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
              {theme === 'light' ? 'ダークモード' : 'ライトモード'}
            </button>
          </div>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Tip: Delete キーでノードを削除できます
        </div>
      </div>
    </div>
  );
};

export default Toolbar; 