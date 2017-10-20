import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FastClick from 'fastclick';
import { Popup, Icon } from '../../components';

const TEL_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '-1'];
const PRICE_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '-1'];
const ID_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', '0', '-1'];

class NumKeyboard extends Component {
  componentDidMount() {
    FastClick.attach(this.keyboard, { tapDelay: 10 });
  }
  _genKey() {
    const { type, keyCallback } = this.props;
    let keys = null;
    switch (type) {
      case 'price':
        keys = [].concat(PRICE_KEYS);
        break;
      case 'id':
        keys = [].concat(ID_KEYS);
        break;
      case 'tel':
      default:
        keys = [].concat(TEL_KEYS);
        break;
    }
    return keys.map((key, index) => {
      return (
        <div
          className={classnames('key-btn', { 'top-right-1px-line': index % 3 !== 2, 'top-1px-line': index % 3 === 2 })}
          onClick={() => typeof keyCallback === 'function' && keyCallback(key)}
          key={key}>
          {key !== '-1' ? key : (<Icon type="wrong" />)}
        </div>
      );
    });
  }
  render() {
    const { prefixCls, className, type, mask, btnTitle, visible, doneCallback, keyCallback, ...others } = this.props;
    return (
      <Popup mask={mask} visible={visible} onMaskClick={() => typeof doneCallback === 'function' && doneCallback()}>
        <div className={classnames(`${prefixCls}`, className)} ref={(e) => { this.keyboard = e; }} {...others}>
          <div className="op-zone">
            <button
              className="comfirm-btn"
              onClick={
                () => {
                  typeof doneCallback === 'function' && doneCallback();
                }
              }>{btnTitle}</button>
          </div>
          <div className="key-zone">
            {this._genKey()}
          </div>
        </div>
      </Popup>
    );
  }
}

NumKeyboard.propTypes = {
  prefixCls: PropTypes.string,
  type: PropTypes.string,
  mask: PropTypes.bool,
  btnTitle: PropTypes.string,
  visible: PropTypes.bool,
  keyCallback: PropTypes.func,
  doneCallback: PropTypes.func,
};

NumKeyboard.defaultProps = {
  prefixCls: 'za-numkeyboard',
  mask: false,
  type: 'tel',
  btnTitle: '确定',
  visible: false,
};

export default NumKeyboard;
