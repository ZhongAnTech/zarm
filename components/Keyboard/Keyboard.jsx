import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

const NUMBER_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'close'];
const PRICE_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'close'];
const IDCARD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'x', '0', 'close'];

class Keyboard extends PureComponent {

  onKeyClick = (e, key) => {
    e.preventDefault();
    if (key.length === 0) return;

    const { onKeyClick } = this.props;
    typeof onKeyClick === 'function' && onKeyClick(key);
  }

  getKeys = () => {
    const { type } = this.props;
    switch (type) {
      case 'price':
        return PRICE_KEYS;

      case 'idcard':
        return IDCARD_KEYS;

      default:
        return NUMBER_KEYS;
    }
  }

  render() {
    const { prefixCls } = this.props;

    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}-key`}>
          {
            this.getKeys().map((text, i) => {
              const keyCls = classnames(`${prefixCls}-key-item`, {
                [`${prefixCls}-key-item-disabled`]: text.length === 0,
              });
              return <div className={keyCls} key={+i} onTouchStart={e => this.onKeyClick(e, text)}>{(text === 'close') ? <Icon type="keyboard" /> : text}</div>;
            })
          }
        </div>
        <div className={`${prefixCls}-handle`}>
          <div className={`${prefixCls}-handle-item`} onTouchStart={e => this.onKeyClick(e, 'delete')}><Icon type="deletekey" /></div>
          <div className={`${prefixCls}-handle-item ${prefixCls}-handle-item-ok`} onClick={e => this.onKeyClick(e, 'ok')}>确定</div>
        </div>
      </div>
    );
  }
}

Keyboard.propTypes = {
  prefixCls: PropTypes.string,  // eslint-disable-line
  className: PropTypes.string,  // eslint-disable-line
  type: PropTypes.oneOf(['number', 'price', 'idcard']),
  onKeyClick: PropTypes.func,
};

Keyboard.defaultProps = {
  prefixCls: 'za-keyboard',
  type: 'number',
};

export default Keyboard;
