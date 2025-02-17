import * as React from 'react';
import { PickerColumnItem } from '../picker-view';

export enum COLUMN_TYPE {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
  MERIDIEM = 'meridiem',
  HOUR = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
  WEEK = 'week',
  WEEK_DAY = 'week-day',
}

export enum MERIDIEM {
  AM = 0,
  PM = 1,
}

export type ColumnType = `${COLUMN_TYPE}`;

export interface DatePickerFilterExtend {
  value: number;
  date: Date;
}

export type DatePickerFilter = (type: ColumnType, extend: DatePickerFilterExtend) => boolean;

export type RenderLabel = (type: ColumnType, value: number) => React.ReactNode;

export interface BaseDatePickerViewProps {
  columnType?: ColumnType[];
  min?: Date;
  max?: Date;
  disabled?: boolean;
  filter?: DatePickerFilter;
  renderLabel?: RenderLabel;
  defaultValue?: Date;
  wheelDefaultValue?: Date;
  value?: Date;
  onChange?: (value: Date, items: PickerColumnItem[], level: number) => void;
}
