import React, {
  useEffect,
  useState,
  ReactNode,
  useCallback,
  memo,
  useMemo,
  useContext,
  forwardRef,
  createRef,
} from 'react';
import { createBEM } from '@zarm-design/bem';
import type { HTMLProps } from '../utils/utilityTypes';
import { ConfigContext } from '../n-config-provider';
import Tabs from '../tabs';
import Radio from '../radio';
import type { BaseCascaderViewProps, TDataSource, IDataSource } from './Interface';
import { parseState } from './utils';

export interface CascaderViewCssVars {
  '--option-font-size'?: React.CSSProperties['fontSize'];
  '--option-height'?: React.CSSProperties['height'];
  '--options-height'?: React.CSSProperties['height'];
}

export type CascaderViewProps = BaseCascaderViewProps & HTMLProps<CascaderViewCssVars>;

export type CascaderViewState = ReturnType<typeof parseState> & {
  tabIndex: number;
};

const CascaderView = forwardRef<unknown, CascaderViewProps>((props, ref) => {
  const {
    className,
    dataSource,
    defaultValue,
    value,
    displayMember,
    valueMember,
    cols,
    itemRender,
    onChange,
    ...restProps
  } = props;
  const cascaderViewRef = (ref as any) || createRef<HTMLDivElement>();
  const { prefixCls, locale: globalLocal } = useContext(ConfigContext);
  const locale = globalLocal?.CascaderView;
  const bem = createBEM('cascader-view', { prefixCls });
  const tabsBem = createBEM('cascader-view-tabs', { prefixCls });
  const cls = bem([className]);
  const [state, setState] = useState<CascaderViewState>({ ...parseState(props), tabIndex: 0 });
  const { currentValue, tabIndex } = state;

  const handleObtainItem = useCallback(
    (list: typeof dataSource, _value: ReactNode) => {
      return list.find((item) => item[valueMember as 'value'] === _value);
    },
    [valueMember],
  );

  /**
   * 初始化列表值
   */
  useEffect(() => {
    const initValue: typeof dataSource = [];
    const v = value || defaultValue || [];

    v.reduce((accumulator: IDataSource[], _currentValue: ReactNode) => {
      const valueItem = handleObtainItem(accumulator, _currentValue);

      if (valueItem) {
        initValue.push(valueItem);

        return valueItem.children || [];
      }

      return [];
    }, dataSource);

    setState({
      ...state,
      currentValue: initValue,
      tabIndex: initValue.length,
    });
  }, [dataSource, handleObtainItem, value, defaultValue]);

  /**
   * 获取列表数据
   */
  const columnDataList = useMemo(() => {
    const group: { selected: IDataSource | undefined; options: IDataSource[] }[] = [];
    let _dataSource: typeof dataSource = dataSource;
    let i = 0;

    while (_dataSource.length) {
      const colVal = currentValue[i];

      const selected =
        !!colVal && handleObtainItem(_dataSource, colVal[valueMember as keyof ReactNode]);

      group.push({
        selected,
        options: _dataSource,
      });

      const childrenData: typeof dataSource | undefined = ((selected ?? _dataSource[0]) || {})
        .children;

      if (i < currentValue.length && childrenData && childrenData.length && i + 1 < cols!) {
        _dataSource = childrenData;
      } else {
        _dataSource = [];
      }

      i += 1;
    }

    return group;
  }, [cols, currentValue, dataSource, handleObtainItem, valueMember]);

  /**
   * 修改列表值
   * @param itemValue
   * @param index
   */
  const handleChange = (itemValue: any, index: number) => {
    const _value = currentValue.slice(0, index);

    if (typeof index === 'number') {
      _value[index] = handleObtainItem(columnDataList[index].options, itemValue)!;
    }

    setState({
      ...state,
      currentValue: _value,
      tabIndex: typeof index === 'number' ? index + 1 : tabIndex,
    });

    if (onChange) {
      if (typeof onChange !== 'function') {
        console.error('onChange need a function');
      } else {
        onChange(_value.map((v) => v![valueMember as 'value']));
      }
    }
  };

  /**
   * 判断是否有传入 itemRender， 否则使用默认的渲染方式
   * @param item
   */
  const handleItemRender = (item: TDataSource) => {
    return typeof itemRender !== 'function' ? item[displayMember as 'label'] : itemRender(item);
  };

  return (
    <div className={cls} ref={cascaderViewRef} {...restProps}>
      <Tabs
        swipeable
        scrollable
        defaultValue={tabIndex}
        onChange={(i) => setState({ ...state, tabIndex: i })}
        className={tabsBem('')}
        lineWidth={60}
      >
        {columnDataList.map((group, index) => {
          const groupActiveItemDisplay = group.selected?.[displayMember as 'label'];
          const panelTitle = (
            <span className={bem('tab-text', [{ unselected: !groupActiveItemDisplay }])}>
              {groupActiveItemDisplay ?? locale!.unselectedTabText}
            </span>
          );

          return (
            <Tabs.Panel key={+index} title={panelTitle}>
              <div className={bem('content')}>
                <Radio.Group
                  type="list"
                  listMarkerAlign="after"
                  value={currentValue[index]?.[valueMember as 'value']}
                  onChange={(v) => handleChange(v, index)}
                >
                  {group.options.map((item, i) => {
                    const isActive =
                      currentValue[index] &&
                      currentValue[index][valueMember as 'value'] === item[valueMember as 'value'];
                    const label = handleItemRender(item);

                    return (
                      <Radio
                        key={`${label}${+i}`}
                        className={bem('content-item', [
                          {
                            active: isActive,
                          },
                        ])}
                        value={item[valueMember as 'value']}
                      >
                        {label}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
});

CascaderView.displayName = 'CascaderView';

CascaderView.defaultProps = {
  displayMember: 'label',
  valueMember: 'value',
  cols: Infinity,
};

export default memo(CascaderView);
