import React, { PureComponent } from 'react';
import classnames from 'classnames';

import PropsType from './PropsType';

export interface CountdownProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Countdown extends PureComponent<CountdownProps, {}> {

  static defaultProps = {
    interval: 1000,
    initialTimeRemaining: 24 * 3600 * 1000,
    className: '',
  };

  state = {
    timeRemaining: this.props.initialTimeRemaining || 0,
    timeoutId: null,
    prevTime: null,
  };

  componentDidMount() {
    this.tick();
  }

  componentDidUpdate() {
    if (!this.state.prevTime && this.state.timeRemaining > 0) {
      this.tick();
    }
  }

  componentWillUnmount() {
    const {
      timeoutId,
    } = this.state;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  getFormattedTime(milliseconds) {
    const {
      onFormatFunc,
    } = this.props;

    if (onFormatFunc) {
      return onFormatFunc(milliseconds);
    }

    const totalSeconds = (Math.round(milliseconds / 1000)).toString();

    let seconds: number | string = parseInt(totalSeconds, 10) % 60;
    let minutes: number | string = parseInt((+totalSeconds / 60).toString(), 10) % 60;
    let hours: number | string = parseInt((+totalSeconds / 3600).toString(), 10);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    return `${hours}:${minutes}:${seconds}`;
  }

  tick() {
    const {
      onCompleteCallback,
      onTickCallback,
      interval = 0,
    } = this.props;

    const {
      prevTime,
      timeoutId,
    } = this.state;

    const currentTime = Date.now();
    const dt = prevTime ? (currentTime - prevTime) : 0;

    // correct for small variations in actual timeout time
    const timeRemainingInInterval = (interval - (dt % interval));

    let timeout = timeRemainingInInterval;

    if (timeRemainingInInterval < (interval / 2.0)) {
      timeout += interval;
    }

    const timeRemaining = Math.max(this.state.timeRemaining - dt, 0);
    const countdownComplete = !!(prevTime && timeRemaining <= 0);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    this.setState({
      timeoutId: countdownComplete ? null : setTimeout(() => { this.tick(); }, timeout),
      prevTime: currentTime,
      timeRemaining,
    });

    if (countdownComplete && onCompleteCallback) {
      onCompleteCallback();
    } else if (onTickCallback) {
      onTickCallback(timeRemaining);
    }
  }

  render() {
    const { className } = this.props;

    const { timeRemaining } = this.state;

    const cls = classnames(className);

    return (
      <div className={cls}>
        {this.getFormattedTime(timeRemaining) || ''}
      </div>
    );
  }

}
