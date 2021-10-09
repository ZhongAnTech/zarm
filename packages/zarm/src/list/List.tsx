import * as React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import ListItem from './ListItem';

export type ListProps = React.HTMLAttributes<HTMLDivElement>;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<ListProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof ListItem;
}

const List = React.forwardRef<unknown, ListProps>((props, ref) => {
  const { className, children, ...restProps } = props;

  const compRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-list`;
  const cls = classnames(prefixCls, className);

  return (
    <div ref={compRef} className={cls} {...restProps}>
      <ul>{children}</ul>
    </div>
  );
}) as CompoundedComponent;

List.displayName = 'List';

List.defaultProps = {};

export default List;
