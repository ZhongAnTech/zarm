import Taro from '@tarojs/taro';
import '@zarm-design/icons/style';
import '@zarm-design/icons/style/font';
import * as React from 'react';
import { Collapse, Panel } from 'zarm/mini';

export const getRect = (id): Promise<Taro.NodesRef.BoundingClientRectCallbackResult> => {
  return new Promise((resolve) => {
    Taro.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec((rect) => {
        resolve(rect[0]);
      });
  });
};

/* style placeholder */

const urlAlphabet = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';

export const nanoid = (size = 21) => {
  let id = '';
  // A compact alternative for `for (var i = 0; i < step; i++)`.
  let i = size;
  // eslint-disable-next-line no-plusplus
  while (i--) {
    // `| 0` is more compact and faster than `Math.floor()`.
    // eslint-disable-next-line no-bitwise
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id;
};

const CollapseItem = (poprs) => {
  const { useCollapseItem } = Collapse;
  const { isActive, title, disable, onChange, children } = poprs;
  const { getCollapseContentProps, getToggleProps } = useCollapseItem({
    defaultExpanded: isActive,
    disable,
    onChange,
  });
  const id = React.useMemo(() => `collapse-item-${nanoid()}`, []);
  const [style, setStyle] = React.useState({
    height: 0,
  });

  React.useEffect(() => {
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
    <>
      <div {...getToggleProps()} className="collapse-header">
        {title}
      </div>
      <div {...getCollapseContentProps()} className="collapse-content" style={style}>
        <div className="collapse-content__inner" id={id}>
          {typeof children === 'function' ? children?.({ active: isActive }) : children}
        </div>
      </div>
    </>
  );
};

export default () => {
  const [value, setValue] = React.useState();
  return (
    <>
      <Panel title="自定义样式">
        <Collapse onChange={(newVal) => setValue(newVal)} value={value}>
          <CollapseItem title="第一项" key="1">
            {({ active }) => {
              const style = active ? { color: 'red' } : {};
              return (
                <div style={style}>
                  This is content of item1. This is content of item1. This is content of item1.
                </div>
              );
            }}
          </CollapseItem>
          <CollapseItem title="第二项" key="2">
            <div>This is content of item2. This is content of item2. This is content of item2.</div>
          </CollapseItem>
        </Collapse>
      </Panel>
    </>
  );
};
