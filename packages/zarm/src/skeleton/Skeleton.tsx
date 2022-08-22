import * as React from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../config-provider/ConfigProvider';
import type { SkeletonProps } from './interface';

const Skeleton = (props: SkeletonProps) => {
  const { className, shape, width, height, animated } = props;

  const { globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-skeleton`;

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--${shape}`]: !!shape,
    [`${prefixCls}--animated`]: !!animated,
  });

  const style: CSSProperties = {
    width,
    height,
  };

  return <div className={cls} style={style} />;
};

Skeleton.displayName = 'skeleton';

Skeleton.defaultProps = {
  shape: 'radius',
};

export default Skeleton;
