import { View, ViewProps } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { createBEM } from '@zarm-design/bem';
import React from 'react';
import { ConfigContext } from '../config-provider';
import { nanoid } from '../utils';
import { useSafeLayoutEffect } from '../utils/hooks';
import CollapseContext from './context';
import type { BaseCollapseItemProps } from './interface';

const getRect = (id): Promise<Taro.NodesRef.BoundingClientRectCallbackResult> => {
  return new Promise((resolve) => {
    Taro.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec((rect) => {
        resolve(rect[0]);
      });
  });
};

export type CollapseItemProps = Omit<ViewProps, 'key' | 'title' | 'onChange'> &
  BaseCollapseItemProps;

type CollapseItemExtraProps = CollapseItemProps & { value: string };

const CollapseItem = React.forwardRef<unknown, CollapseItemExtraProps>((props, ref) => {
  const { title, className, disabled, value, children, onChange, ...rest } = props;

  const content = (ref as any) || React.createRef<HTMLElement>();
  const collapseItemRef = (ref as any) || React.createRef<HTMLElement>();
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('collapse-item', { prefixCls });

  const { isActive: isExpanded, toggleItem } = React.useContext(CollapseContext);

  const isActive = isExpanded(value);
  const onClickItem = () => {
    if (disabled) return;
    onChange?.(isActive!);
    toggleItem(value, !isActive);
  };

  const id = React.useMemo(() => `collapse-item-${nanoid()}`, []);

  const cls = bem([
    {
      active: isActive,
      disabled,
    },
    className,
  ]);

  const [style, setStyle] = React.useState({
    height: 0,
  });

  useSafeLayoutEffect(() => {
    async function computeStyle() {
      if (isActive) {
        const rect = await getRect(id);
        setTimeout(() => {
          setStyle({
            height: rect.height,
          });
        }, 100);
      } else {
        setStyle({
          height: 0,
        });
      }
    }
    computeStyle();
  }, [setStyle, isActive]);

  return (
    <View className={cls} {...rest} ref={collapseItemRef}>
      <View className={bem('header')} onClick={onClickItem}>
        <View className={bem('title')}>{title}</View>
        <View className={bem('arrow')} />
      </View>
      <View className={bem('content')} ref={content} style={style}>
        <View className={bem('content__inner')} id={id}>
          {children}
        </View>
      </View>
    </View>
  );
});

CollapseItem.displayName = 'CollapseItem';

CollapseItem.defaultProps = {
  disabled: false,
};

export default CollapseItem;
