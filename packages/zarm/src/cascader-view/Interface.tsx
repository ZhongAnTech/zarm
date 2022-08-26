import { ReactNode } from 'react';

export interface IDataSource {
  [key: string]: any;
  label: string;
  value: string;
  children: IDataSource[];
}

export type TDataSource = Pick<IDataSource, 'label' | 'value'>;

type TItemRender = (data: TDataSource) => string;

export interface BaseCascaderViewProps {
  defaultValue?: ReactNode[];
  value?: ReactNode[];
  displayMember?: string;
  valueMember?: string;
  dataSource: IDataSource[];
  cols?: number;
  itemRender?: TItemRender;
  onChange?: (selected: string[]) => void;
}
