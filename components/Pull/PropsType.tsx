export enum REFRESH_STATE {
  normal,   // 普通
  pull,     // 下拉状态（未满足刷新条件）
  drop,     // 释放立即刷新（满足刷新条件）
  loading,  // 加载中
  success,  // 加载成功
  failure,  // 加载失败
}

export enum LOAD_STATE {
  normal,   // 普通
  abort,    // 中止
  loading,  // 加载中
  success,  // 加载成功
  failure,  // 加载失败
  complete, // 加载完成（无新数据）
};

interface BaseProps {
  refreshing?: REFRESH_STATE;
  refreshInitDistance: number;
  refreshDistance: number;
  refreshRender?: (refreshState: REFRESH_STATE, percent: number) => any;
  onRefresh?: () => void;
  loading?: LOAD_STATE;
  loadDistance: number;
  onLoad?: () => void;
  loadRender?: (loadState: LOAD_STATE) => any;
  animationDuration?: number;
  stayTime?: number;
}

export interface PullProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}
