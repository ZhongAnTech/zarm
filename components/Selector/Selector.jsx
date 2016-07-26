
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Input from '../Input';
import SelectorContainer from './SelectorContainer';

class Selector extends Component {

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
    const { placeholder, onOk, children, ...others } = this.props;

    return (
      <div className="ui-selector" onClick={() => this.toggle()}>
        <div className="ui-select-placeholder">{placeholder}</div>
        <SelectorContainer {...others}
          visible={this.state.isShow}
          onMaskClick={() => this.toggle()}
          onCancel={() => this.toggle()}
          onOk={(data) => {
            onOk();
            this.toggle();
          }}>
          {children}
        </SelectorContainer>
      </div>
    );
  }
}

Selector.propTypes = { 
};

Selector.defaultProps = {
};

export default Selector;

