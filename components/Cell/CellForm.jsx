
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Cell from '../Cell';

class CellForm extends Component {

  render () {
    const { className, help, ...others } = this.props;

    const cls = classnames({
      'ui-cell-form': true,
      [className]   : !!className,
    });

    return (
      <div className={cls} {...others}>
        <Cell {...others} />
        <div className="ui-cell-explain">
          <div className="ui-cell-explain-text">{help}</div>
        </div>
      </div>
    );
  }
}

CellForm.propTypes = {
  type      : PropTypes.oneOf(['normal', 'link', 'select']),
  className : PropTypes.string,
};

CellForm.defaultProps = {
  type      : 'normal',
  className : null,
};

export default CellForm;
