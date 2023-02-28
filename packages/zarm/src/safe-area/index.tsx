import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { BaseSafeAreaProps } from './interface';

export type SafeAreaProps = BaseSafeAreaProps & React.HTMLAttributes<HTMLDivElement>;

const SafeArea: React.FC<SafeAreaProps> = (props) => {
  const { position, ...rest } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('safe-area', { prefixCls });

  return <div {...rest} className={bem('', [bem(`position-${position}`)])} />;
};

export default SafeArea;
