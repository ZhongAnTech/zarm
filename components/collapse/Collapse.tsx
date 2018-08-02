import React, { PureComponent, Children, cloneElement } from 'react';
import classnames from 'classnames';
import { BaseCollapseProps } from './PropsType';
import { isArray } from '../utils/validate';

export interface CollapseProps extends BaseCollapseProps {
  prefixCls?: string;
  className?: string;
}

export default class Collapse extends PureComponent<CollapseProps, any> {
  static defaultProps = {
    prefixCls: 'za-collapse',
    multiple: true,
    animated: false,
    open: false,
    onChange: () => {},
  };

  static Item: any;

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: this.getActiveIndex(props),
      activeKey: this.getActiveKey(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.isPropEqual(this.props.activeIndex, nextProps.activeIndex)) {
      this.setState({
        activeIndex: this.getActiveIndex(nextProps),
      });
    }

    if (!this.isPropEqual(this.props.activeKey, nextProps.activeKey)) {
      this.setState({
        activeKey: this.getActiveKey(nextProps),
      });
    }
  }

  onItemChange = key => {
    const { multiple, onChange } = this.props;
    if (typeof key === 'string') {
      const { activeKey } = this.state;
      const hasKey = activeKey.indexOf(key) > -1;
      let newActiveKey: Array<string> = [];
      if (multiple) {
        if (hasKey) {
          newActiveKey = activeKey.filter(i => i !== key);
        } else {
          newActiveKey = activeKey.slice(0);
          newActiveKey.push(key);
        }
      } else {
        newActiveKey = hasKey ? [] : [key];
      }
      this.setState({
        activeKey: newActiveKey,
      });
    }
    onChange(key);
    /* const { activeIndex } = this.state;
    const hasKey = activeIndex.indexOf(key) > -1;
    let newActiveIndex: Array<string> = [];
    if (multiple) {
      if (hasKey) {
        newActiveIndex = activeIndex.filter(i => i !== key);
      } else {
        newActiveIndex = activeIndex.slice(0);
        newActiveIndex.push(key);
      }
    } else {
      newActiveIndex = hasKey ? [] : [key];
    }
    this.setState({
      activeIndex: newActiveIndex,
    });
    onChange(Number(key)); */
  }

  getActiveIndex(props) {
    const { activeIndex, defaultActiveIndex, multiple } = props;

    const defaultIndex = (activeIndex || activeIndex === 0) ? activeIndex : defaultActiveIndex;

    if (defaultIndex || defaultIndex === 0) {
      if (isArray(defaultIndex)) {
        return !multiple ?
        [String(defaultIndex[0])] : (defaultIndex as Array<any>).map(key => String(key));
      } else {
        return [String(defaultIndex)];
      }
    }

    return [];
  }

  getActiveKey(props) {
    const { activeKey, defaultActiveKey, multiple } = props;

    const defaultKey = (activeKey || activeKey === 0) ? activeKey : defaultActiveKey;

    if (defaultKey || defaultKey === 0) {
      if (isArray(defaultKey)) {
        return !multiple ?
        [String(defaultKey[0])] : (defaultKey as Array<any>).map(key => String(key));
      } else {
        return [String(defaultKey)];
      }
    }

    return [];
  }

  isPropEqual(cur, next) {
    if (isArray(next) && isArray(cur)) {
     return next.length === cur.length && next.every((key, i) => key === cur[i]);
    }

    return cur === next;
  }

  renderItems() {
    const { animated, open } = this.props;
    const { activeIndex, activeKey } = this.state;

    return Children.map(this.props.children, (ele: any, index) => {
      const { disabled } = ele.props;
      const key = ele.key ? String(ele.key) : index;
      const isActive = activeKey.indexOf(key) > -1;
      return cloneElement(ele as JSX.Element, {
        /* key: String(key), */
        // index,
        // can be removed?
        activeIndex,
        animated,
        isActive,
        open,
        onItemChange: disabled ? null : () => this.onItemChange(key),
      });
    });
  }

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(`${prefixCls}`, className);

    return (
      <div className={cls}>
        {this.renderItems()}
      </div>
    );
  }
}
