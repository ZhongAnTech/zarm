import * as React from 'react';

export interface BaseRateProps {
  /**
   * 当前分值
   */
  value?: number;
  /**
   * 默认分值
   * @default 0
   */
  defaultValue?: number;
  /**
   * 评分总数
   * @default 5
   */
  count?: number;
  /**
   * 自定义字符
   * @default
   */
  character?: React.ReactNode;
  /**
   * 是否允许半选
   * @default false
   */
  allowHalf?: boolean;
  /**
   * 是否允许再次点击后清除
   * @default true
   */
  allowClear?: boolean;
  /**
   * 设置只读状态
   * @default false
   */
  readonly?: boolean;
  /**
   * 当前分值变化时的回调
   */
  onChange?: (value: number) => void;
}
