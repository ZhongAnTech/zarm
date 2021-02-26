import { CSSProperties } from 'react';
import { Locale } from '../config-provider/PropsType';

export enum REFRESH_STATE {
  normal, // 普通
  pull, // 下拉状态（未满足刷新条件）
  drop, // 释放立即刷新（满足刷新条件）
  loading, // 加载中
  success, // 加载成功
  failure, // 加载失败
}

export enum LOAD_STATE {
  normal, // 普通
  abort, // 中止
  loading, // 加载中
  success, // 加载成功
  failure, // 加载失败
  complete, // 加载完成（无新数据）
}

export interface PullAction {
  state?: REFRESH_STATE | LOAD_STATE;
  startDistance?: number;
  distance?: number;
  render?: (state?: REFRESH_STATE | LOAD_STATE, percent?: number) => any;
  handler?: () => void;
}

export interface PropsType {
  style?: CSSProperties;
  refresh?: PullAction;
  load?: PullAction;
  animationDuration?: number;
  stayTime?: number;
  locale?: Locale['Pull'];
}
