import includes from 'lodash/includes';

export const getTransitionName = (prefixCls, placement, animationType) => {
  if (animationType === 'menu-slide' && placement) {
    if (includes(placement, 'top')) {
      return `${prefixCls}-${animationType}-down`;
    }
    return `${prefixCls}-${animationType}-up`;
  }
  return `${prefixCls}-${animationType}`;
};

export const getTransformOrigin = (placement: string) => {
  const transformOrigin = {
    'top-start': 'left bottom',
    top: 'center bottom',
    'top-end': 'right bottom',
    'left-start': 'right top',
    left: 'right center',
    'left-end': 'right bottom',
    'bottom-start': 'left top',
    bottom: 'center top',
    'bottom-end': 'right top',
    'right-start': 'left top',
    right: 'left center',
    'right-end': 'left bottom',
  };
  return transformOrigin[placement];
};
