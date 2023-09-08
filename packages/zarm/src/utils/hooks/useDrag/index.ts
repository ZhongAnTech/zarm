import { useCallback } from 'react';
import Draggable from './core';

const useDrag = (callback, options) => {
  const target = new Draggable(callback, options);
  return useCallback(() => {
    return {
      onTouchStart: target.handleStart,
      onTouchMove: target.handleMove,
      onTouchEnd: target.handleEnd,
      onTouchCancel: target.handleCancel,
    };
  }, []);
};

export default useDrag;
