
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Cell from '../Cell';
import ValidForm from '../ValidForm';

class CellForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      validate: false,
      dirty: false,
    };
    this.setResult = this.setResult.bind(this);
  }

  setResult(value, validate) {
    this.setState({
      value,
      validate,
      dirty: true,
    });
  }

  helpRender() {
    const { validate, dirty } = this.state;
    const { showHelp, help = null } = this.props;

    if (showHelp) {
      return help;
    }

    if (!validate && dirty) {
      return help;
    }

    return null;
  }

  render() {
    const { children, className, showHelp, ...otherOpts } = this.props;
    // cell
    const { type, theme, icon, title, description, help, ...others } = otherOpts;
    // validInput
    const { max, min, maxLength, minLength, required, func, pattern, onChange, onBlur, ...rest } = others;

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
      ...rest,
    };

    return (
      <Cell className={cls} help={this.helpRender()} {...CellConfig}>
        <ValidForm.ValidInput setResult={this.setResult} {...ValidInputConfig}>
          {children}
        </ValidForm.ValidInput>
      </Cell>
    );
  }
}

CellForm.propTypes = {
  type: PropTypes.oneOf(['normal', 'link', 'select']),
  className: PropTypes.string,
  showHelp: PropTypes.bool,
};

CellForm.defaultProps = {
  type: 'normal',
  className: null,
  showHelp: false,
};

export default CellForm;
