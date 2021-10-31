import { ReactNode } from 'react';

export interface BaseCalendarProps {
  /**
   * 值
   */
  value?: Date | Date[];
  /**
   * 初始值
   */
  defaultValue?: Date | Date[];
  /**
   * 最小可选日期
   */
  min?: Date;
  /**
   * 最大可选日期
   */
  max?: Date;
  /**
   * 是否双选
   */
  multiple: boolean;
  /**
   * 日期渲染函数
   */
  dateRender?: (value?: Date) => ReactNode;
  /**
   * 日期是否禁止选择
   */
  disabledDate?: (value?: Date) => boolean;
  /**
   * 日期选择发生变化时触发的回调函数
   */
  onChange?: (value?: Date[]) => void;
}

export interface BaseCalendarMonthProps {
  value: Date[];
  min: Date;
  max: Date;
  dateMonth: Date;
  dateRender?: (value?: Date) => ReactNode;
  disabledDate?: (value?: Date) => boolean;
  onDateClick?: (value?: Date) => void;
}

export interface CalendarStates {
  value: Date[];
  min: Date;
  max: Date;
  startMonth: Date;
  endMonth: Date;
  /**
   * 是否是入参更新(主要是月份跨度更新，需要重新定位)
   */
  refresh: boolean;
  //
  /**
   * steps 是总的选择的个数
   */
  steps: number;
  /**
   * 初始化点击步数
   */
  step: number;
  multiple: boolean;
}
