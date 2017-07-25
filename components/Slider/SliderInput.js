/**
 * Created by lvs on 2017/5/9.
 */
import React, { Component } from 'react';
import pubsub from './pubsub';
import './SliderInput.scss';

function noop() {

}

export default class SliderInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  componentDidMount() {
    pubsub.subscribe('changeFromSlider', (value) => {
      this.setState({
        value,
      });
    });

        // 原型遮蔽
    if (this.props.disabled) {
      this.handleAdd = noop;
      this.handleSub = noop;
    }
  }

  componentWillReceiveProps(props) {
    if (props.disabled) {
      this.handleAdd = noop;
      this.handleSub = noop;
    } else {
      delete this.handleAdd;
      delete this.handleSub;
    }
    this.forceUpdate();
  }

  handleAdd(e) {
    const { mark_data } = this.props;
    const index = mark_data.indexOf(this.state.value) + 1;
    if (index > mark_data.length - 1) {
      return;
    }
    this.setState({
      value: mark_data[index],
    });
    pubsub.dispatch('changeFromInput', mark_data[index]);
  }

  handleSub() {
    const { mark_data } = this.props;
    const index = mark_data.indexOf(this.state.value) - 1;
    if (index < 0) {
      return;
    }
    this.setState({
      value: mark_data[index],
    });
    pubsub.dispatch('changeFromInput', mark_data[index]);
  }

  render() {
    return (
      <div
        className={`slider-input${this.props.disabled ? ' disabled' : ''}`}>
        <div
          className="action-sub"
          onClick={e => this.handleSub(e)}
          />
        <div className="slider-input-box">
          <input
            type="text"
            value={this.state.value}
            disabled={this.props.disabled}
            onBlur={() => {
              const value = this.props.handleValue(this.state.value);
              this.setState({
                value,
              });
              pubsub.dispatch('changeFromInput', value);
            }}
            onChange={(e) => {
              const value = e.target.value;
              if (!(/[0-9]+(\.)?[0-9]*$/.test(value)) && value !== '') {
                return;
              }
              this.setState({
                value,
              });
              pubsub.dispatch('changeFromInput', value);
            }}
            />
        </div>

        {/* 加按钮*/}
        <div
          className="action-plus"
          onClick={e => this.handleAdd(e)}
          />
      </div >
    );
  }
}
