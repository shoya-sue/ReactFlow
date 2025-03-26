import { FlowNode } from '@/types';

export const initialNodes: FlowNode[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'スタート' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: '処理1', description: 'サンプル処理1' },
    position: { x: 250, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: '完了' },
    position: { x: 250, y: 200 },
  },
]; 