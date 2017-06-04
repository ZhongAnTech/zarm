
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Cell from '../Cell';

class CellBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      type: '',
      validate: false,
      dirty: false,
    };
    this.setResult = this.setResult.bind(this);
  }

  setResult(value, validate, opts) {
    const { setResult } = this.props;
    const { type } = opts;

    this.setState({
      value,
      validate,
      type,
      dirty: type !== 'init',
    }, () => {
      setResult && setResult(value, validate, opts);
    });
  }

  helpRender() {
    const { validate, dirty, type } = this.state;
    const { showHelp, help = null } = this.props;

    if (showHelp === 'always') {
      return help;
    }

    if (!validate && dirty) {
      if (showHelp === 'change') {
        return help;
      } else if (showHelp === type) {
        return help;
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
  showHelp: PropTypes.oneOf(['always', 'change', 'blur']), // 显示help的时间点，always(一直显示)，change(修改就显示)，blur(失去焦点显示)
};

CellBody.defaultProps = {
  type: 'normal',
  className: null,
  showHelp: 'change',
};

export default CellBody;
