
import React, { Component, PropTypes, isValidElement } from 'react';
import classnames from 'classnames';

import Cell from '../Cell';
import Icon from '../Icon';
import { errors, getMsg } from './validate';

class CellBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      type: '',
      error: '',
      validate: false,
      dirty: false,
    };
    this.setResult = this.setResult.bind(this);
  }

  setResult(value, validate, opts) {
    const { setResult } = this.props;
    const { type, error } = opts;

    this.setState({
      value,
      validate,
      type,
      error,
      dirty: type !== 'init',
    }, () => {
      setResult && setResult(value, validate, opts);
    });
  }

  getHelpByObj(obj = {}) {
    const error = this.state.error || 'default';
    const curr = Object.assign({}, errors, obj);

    const func = curr[error];
    const res = getMsg(func, this.getOpts());

    return this.getHelp(res);
  }

  getOpts() {
    const { error, validate, value } = this.state;
    const { title } = this.props;

    return {
      title,
      validate,
      value,
      rule: this.props[error],
    };
  }

  getHelp(help) {
    help = help || this.props.help || null;

    let ele = null;
    const { value, validate, error } = this.state;

    if (isValidElement(help)) {
      return help;
    }

    switch (typeof help) {
      case 'string': {
        ele = (
          <span>
            <Icon type="info-round" />
            { help }
          </span>
        );
        break;
      }

      case 'function': {
        ele = help(value, validate, error);
        break;
      }

      case 'obejct': {
        ele = this.getHelpByObj(help);
        break;
      }

      default: {
        ele = this.getHelpByObj();
      }
    }

    return ele;
  }

  helpRender() {
    const { validate, dirty, type } = this.state;
    const { showHelp } = this.props;

    if (showHelp === 'always') {
      return this.getHelp();
    }

    if (!validate && dirty) {
      if (showHelp === 'change') {
        return this.getHelp();
      } else if (showHelp === type) {
        return this.getHelp();
      }
    }

    return null;
  }

  render() {
    const { children, className, showHelp, setResult, ...otherOpts } = this.props;
    // cell
    const { type, theme, icon, title, description, help, ...others } = otherOpts;
    // validInput
    const { max, min, maxLength, minLength, required, func, pattern, onChange, onBlur, value, ...rest } = others;

    const cls = classnames({
      'ui-cell-form': true,
      [className]: !!className,
    });

    const CellConfig = {
      type,
      theme,
      icon,
      title,
      description,
      ...rest,
    };

    const ValidInputConfig = {
      max,
      min,
      maxLength,
      minLength,
      required,
      func,
      pattern,
      onChange,
      onBlur,
      value,
      ...rest,
    };

    return (
      <Cell className={cls} help={this.helpRender()} {...CellConfig}>
        <Cell.Input setResult={this.setResult} {...ValidInputConfig}>
          {children}
        </Cell.Input>
      </Cell>
    );
  }
}

CellBody.propTypes = {
  type: PropTypes.oneOf(['normal', 'link', 'select']),
  className: PropTypes.string,
  showHelp: PropTypes.oneOf(['always', 'change', 'blur', 'hide']), // 显示help的时间点，always(一直显示)，change(修改就显示)，blur(失去焦点显示)，hide(一直隐藏)
};

CellBody.defaultProps = {
  type: 'normal',
  className: null,
  showHelp: 'change',
};

export default CellBody;
