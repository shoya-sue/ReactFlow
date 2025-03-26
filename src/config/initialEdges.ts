import { FlowEdge } from '@/types';

export const initialEdges: FlowEdge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    data: { label: 'フロー1' },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    data: { label: 'フロー2' },
  },
]; 