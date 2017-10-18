import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FakeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isFocus: false,
    };
    this.fakeFocus = this.fakeFocus.bind(this);
    this.fakeBlur = this.fakeBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    });
  }

  fakeFocus() {
    const { cbFocus } = this.props;
    const referInput = this.refs['referInput'];
    referInput.focus();
    this.setState({
      isFocus: true,
    });
    typeof cbFocus === 'function' && cbFocus();
  }

  fakeBlur(e) {
    const { cbBlur } = this.props;
    this.setState({
      isFocus: false,
    });
    typeof cbBlur === 'function' && cbBlur();
  }

  render() {
    const { prefixCls, className, wrapStyle, inputStyle, placeholder } = this.props;
    const { value, isFocus } = this.state;
    
    return (
      <article className={ classnames(`${prefixCls}`, className) }
               style={ wrapStyle }
               onClick={ this.fakeFocus }>
        <div className={ classnames('fake-input', {'editing': isFocus, 'placeholder': value === '' && !isFocus})}
             placeholder={ placeholder }
             style={ inputStyle }>{ value }</div>
        <div ref="referInput" tabIndex={-1}
             className="refer-input"
             onBlur={ this.fakeBlur }/>
      </article>
    );
  }
}

FakeInput.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  wrapStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  cbFocus: PropTypes.func,
  cbBlur: PropTypes.func,
};

FakeInput.defaultProps = {
  prefixCls: 'za-fakeinput',
  wrapStyle: {},
  inputStyle: {width: '100%', minWidth: '150px'},
  placeholder: '',
  value: '',
};

export default FakeInput;
