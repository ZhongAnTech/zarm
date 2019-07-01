import { MouseEvent, CSSProperties } from 'react';

export default interface PropsType {
  prefixcls?: string; // 前缀
  type?: string; // icon的类别
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger'; // icon的主题色
  size?: 'sm' | 'md' | 'lg'; // icon的尺寸
  style?: CSSProperties; // 使用时需要额外添加的样式
  className?: string; // 额外添加的css类名
  onClick?: (e: MouseEvent<HTMLElement>) => void; // 绑定在icon上的click事件
}
