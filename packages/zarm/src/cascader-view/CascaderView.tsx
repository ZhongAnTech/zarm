import React, {
  useEffect,
  useState,
  useCallback,
  memo,
  useMemo,
  useContext,
  forwardRef,
  createRef,
} from 'react';
import { createBEM } from '@zarm-design/bem';
import type { HTMLProps } from '../utils/utilityTypes';
import { ConfigContext } from '../config-provider';
import Tabs from '../tabs';
import Radio from '../radio';
import { resolvedFieldNames } from '../picker-view/utils';
import type {
  BaseCascaderViewProps,
  CascaderItem,
  CascaderOption,
  CascaderValue,
} from './interface';
import { parseState } from './utils';

export interface CascaderViewCssVars {
  '--background-color'?: React.CSSProperties['backgroundColor'];
  '--option-font-size'?: React.CSSProperties['fontSize'];
  '--option-height'?: React.CSSProperties['height'];
  '--options-height'?: React.CSSProperties['height'];
}

export type CascaderViewProps = BaseCascaderViewProps & HTMLProps<CascaderViewCssVars>;

export type CascaderViewState = ReturnType<typeof parseState> & {
  tabIndex: number;
};

const DEFAULT_FIELD_NAMES = {
  value: 'value',
  label: 'label',
  children: 'children',
};

const CascaderView = forwardRef<HTMLDivElement, CascaderViewProps>((props, ref) => {
  const {
    className,
    dataSource,
    defaultValue,
    value,
    fieldNames: propsFieldNames,
    cols,
    itemRender,
    onChange,
    ...restProps
  } = props;
  const cascaderViewRef = ref || createRef<HTMLDivElement>();
  const { prefixCls, locale: globalLocal } = useContext(ConfigContext);
  const locale = globalLocal?.CascaderView;
  const bem = createBEM('cascader-view', { prefixCls });
  const tabsBem = createBEM('cascader-view-tabs', { prefixCls });
  const cls = bem([className]);
  const [state, setState] = useState<CascaderViewState>({ ...parseState(props), tabIndex: 0 });
  const { currentValue, tabIndex } = state;
  const fieldNames = resolvedFieldNames(propsFieldNames, DEFAULT_FIELD_NAMES);

  const handleObtainItem = useCallback(
    (list: CascaderOption[], _value: CascaderValue) => {
      return list.find((item) => item[fieldNames.value] === _value);
    },
    [fieldNames.value],
  );

  /**
   * 初始化列表值
   */
  useEffect(() => {
    const initValue: CascaderValue[] = [];
    const v = value || defaultValue || [];

    v.reduce((accumulator: CascaderOption[], _currentValue: CascaderValue) => {
      const valueItem = handleObtainItem(accumulator, _currentValue);

      if (valueItem) {
        initValue.push(valueItem[fieldNames.value]);

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
    const group: { selected?: CascaderOption; options: CascaderOption[] }[] = [];
    let _dataSource: CascaderOption[] = dataSource;
    let i = 0;

    while (_dataSource.length) {
      const colVal = currentValue[i];

      const selected = colVal ? handleObtainItem(_dataSource, colVal) : undefined;

      group.push({
        selected,
        options: _dataSource,
      });

      const childrenData = ((selected ?? _dataSource[0]) || {}).children;

      if (i < currentValue.length && childrenData && childrenData.length && i + 1 < cols!) {
        _dataSource = childrenData;
      } else {
        _dataSource = [];
      }

      i += 1;
    }

    return group;
  }, [cols, currentValue, dataSource, handleObtainItem, fieldNames]);

  /**
   * 修改列表值
   * @param itemValue
   * @param index
   */
  const handleChange = (itemValue: CascaderValue, index: number) => {
    const _value = currentValue.slice(0, index);

    if (itemValue !== undefined) {
      _value[index] = itemValue;
    }

    setState({
      ...state,
      currentValue: _value,
      tabIndex: typeof index === 'number' ? index + 1 : tabIndex,
    });

    onChange?.(_value);
  };

  /**
   * 判断是否有传入 itemRender， 否则使用默认的渲染方式
   * @param item
   */
  const handleItemRender = (item: CascaderItem) => {
    return typeof itemRender !== 'function' ? item[fieldNames.label] : itemRender(item);
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
          const groupActiveItemDisplay = group.selected?.[fieldNames.label];
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
                  value={currentValue[index]}
                  onChange={(v) => handleChange(v, index)}
                >
                  {group.options.map((item, i) => {
                    const isActive = currentValue[index] === item[fieldNames.value];
                    const label = handleItemRender(item);

                    return (
                      <Radio
                        key={`${label}${+i}`}
                        className={bem('content-item', [
                          {
                            active: isActive,
                          },
                        ])}
                        value={item[fieldNames.value]}
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
  cols: Infinity,
};

export default memo(CascaderView);
