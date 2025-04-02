import { EdgeStyle } from '../types';

export const edgePresets: Record<string, EdgeStyle> = {
  default: {
    type: 'default',
    color: '#b1b1b7',
    width: 1,
    animated: false,
    arrow: {
      end: true,
      size: 8,
    },
  },
  success: {
    type: 'default',
    color: '#22c55e',
    width: 2,
    animated: true,
    arrow: {
      end: true,
      size: 8,
    },
    state: {
      type: 'success',
      message: '正常に処理されました',
    },
    animation: {
      type: 'flow',
      duration: 20,
    },
  },
  error: {
    type: 'dashed',
    color: '#ef4444',
    width: 2,
    animated: true,
    arrow: {
      end: true,
      size: 8,
    },
    state: {
      type: 'error',
      message: 'エラーが発生しました',
    },
    animation: {
      type: 'pulse',
      duration: 1,
    },
  },
  warning: {
    type: 'dotted',
    color: '#f59e0b',
    width: 2,
    animated: true,
    arrow: {
      end: true,
      size: 8,
    },
    state: {
      type: 'warning',
      message: '警告があります',
    },
    animation: {
      type: 'dash',
      duration: 10,
    },
  },
  info: {
    type: 'default',
    color: '#3b82f6',
    width: 1,
    animated: true,
    arrow: {
      end: true,
      size: 8,
    },
    state: {
      type: 'info',
      message: '情報があります',
    },
    animation: {
      type: 'flow',
      duration: 30,
    },
  },
  bidirectional: {
    type: 'default',
    color: '#8b5cf6',
    width: 1,
    animated: true,
    arrow: {
      start: true,
      end: true,
      size: 8,
    },
    animation: {
      type: 'flow',
      duration: 20,
    },
  },
  thick: {
    type: 'default',
    color: '#64748b',
    width: 3,
    arrow: {
      end: true,
      size: 10,
    },
  },
  group1: {
    type: 'default',
    color: '#ec4899',
    width: 2,
    group: 'group1',
    arrow: {
      end: true,
      size: 8,
    },
  },
  group2: {
    type: 'default',
    color: '#06b6d4',
    width: 2,
    group: 'group2',
    arrow: {
      end: true,
      size: 8,
    },
  },
}; 