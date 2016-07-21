
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Input from '../Input';
import SelectContainer from './SelectContainer';

class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    };
  }

  toggle() {
    this.setState({
      isShow: !this.state.isShow
    });
  }

  render () {
    const { placeholder, onOk, ...others } = this.props;

    return (
      <div className="ui-select">
        <Input type="text" placeholder={placeholder} readOnly onClick={() => this.toggle()} />
        <SelectContainer {...others}
          visible={this.state.isShow}
          onMaskClick={() => this.toggle()}
          onCancel={() => this.toggle()}
          onOk={(data) => {
            onOk();
            this.toggle();
          }}>
          <option>1111</option>
        </SelectContainer>
      </div>
    );
  }
}

Select.propTypes = { 
};

Select.defaultProps = {
};

export default Select;

