import { View, ViewProps } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { createBEM } from '@zarm-design/bem';
import React from 'react';
import { ConfigContext } from '../config-provider';
import { nanoid } from '../utils';
import { useSafeLayoutEffect } from '../utils/hooks';
import type { BaseCollapseItemProps } from './interface';
import useCollapseItem from './useCollapseItem';

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

export type CollapseItemProps = Omit<ViewProps, 'key' | 'title' | 'onChange' | 'children'> &
  BaseCollapseItemProps & {
    children: React.ReactElement | (({ active }: { active: boolean }) => React.ReactElement);
  };

type CollapseItemExtraProps = CollapseItemProps & { isActive: boolean };

const CollapseItem = React.forwardRef<unknown, CollapseItemExtraProps>((props, ref) => {
  const { title, className, disabled, isActive, children, onChange, ...rest } = props;

  const content = (ref as any) || React.createRef<HTMLElement>();
  const collapseItemRef = (ref as any) || React.createRef<HTMLElement>();
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('collapse-item', { prefixCls });

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

  const { getToggleProps, getCollapseContentProps } = useCollapseItem({
    defaultExpanded: isActive,
    onChange,
    disabled,
  });

  const id = React.useMemo(() => `collapse-item-${nanoid()}`, []);

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
      <View className={bem('header')} {...getToggleProps()}>
        <View className={bem('title')}>{title}</View>
        <View className={bem('arrow')} />
      </View>
      <View
        className={bem('content')}
        ref={content}
        {...getCollapseContentProps()}
        style={style}
        id={id}
      >
        <View className={bem('content__inner')} id={id}>
          {typeof children === 'function' ? children?.({ active: isActive }) : children}
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
