import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Drag from '../Drag';
import Spinner from '../Spinner';
import Icon from '../Icon';

class Pull extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      offsetY: 0,
      duration: 0,
      actionState: props.loading ? 'loading' : 'normal',
    };
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('loading' in nextProps) {
      const actionState = nextProps.loading ? 'loading' : 'success';
      this.doAction(actionState);
    }
  }

  onDragMove(event, { offsetY }) {
    if (offsetY < 0) return;

    if (this.pull.scrollTop > 0 || document.body.scrollTop > 0) return;

    event.preventDefault();

    const { moveDistance } = this.props;
    if (offsetY < moveDistance) {
      this.doAction('pull', offsetY);
    } else {
      this.doAction('drop', offsetY);
    }
    return true;
  }

  onDragEnd() {
    const { onRefresh } = this.props;
    const { actionState } = this.state;

    if (actionState === 'pull') {
      this.doAction('normal');
      return;
    }
    typeof onRefresh === 'function' && onRefresh();
  }

  doTransition({ offsetY, duration }) {
    this.setState({ offsetY, duration });
  }

  doAction(actionState, offset) {
    const { duration } = this.props;

    this.setState({ actionState });
    switch (actionState) {
      case 'pull':
        this.doTransition({ offsetY: offset / 2, duration: 0 });
        break;

      case 'drop':
        this.doTransition({ offsetY: offset / 2, duration: 0 });
        break;

      case 'loading':
        this.doTransition({ offsetY: 50, duration });
        break;

      case 'success':
        this.doTransition({ offsetY: 50, duration: 0 });
        setTimeout(() => {
          this.doAction('normal');
        }, 2000);
        break;

      default:
        this.doTransition({ offsetY: 0, duration });
        break;
    }
  }

  renderControlTop(offsetY) {
    const { prefixCls, moveDistance } = this.props;
    const { actionState } = this.state;
    const cls = classnames({
      [`${prefixCls}-control`]: true,
    });

    switch (actionState) {
      case 'pull':
        const percent = ((offsetY < moveDistance ? offsetY : moveDistance) * 100) / moveDistance;
        return (
          <div className={cls}>
            <Spinner percent={percent} />
            <span>下拉刷新</span>
          </div>
        );

      case 'drop':
        return (
          <div className={cls}>
            <Spinner percent={100} />
            <span>释放刷新</span>
          </div>
        );

      case 'loading':
        return (
          <div className={cls}>
            <Spinner className="rotate360" />
            <span>加载中</span>
          </div>
        );

      case 'success':
        return (
          <div className={cls}>
            <Icon type="right-round" theme="success" />
            <span>加载成功</span>
          </div>
        );

      default:
        return null;
    }
  }

  render() {
    const { prefixCls, className, children } = this.props;
    const { offsetY, duration } = this.state;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    const style = {
      WebkitTransitionDuration: `${duration}ms`,
      transitionDuration: `${duration}ms`,
      // WebkitTransform: `translate3d(0, ${offsetY}px, 0)`,
      // transform: `translate3d(0, ${offsetY}px, 0)`,
      height: offsetY,
    };

    return (
      <Drag
        onDragMove={this.onDragMove}
        onDragEnd={this.onDragEnd}>
        <div className={classes} ref={(ele) => { this.pull = ele; }}>
          <div className={`${prefixCls}-down`} style={style}>
            {this.renderControlTop(offsetY)}
          </div>
          {children}
        </div>
      </Drag>
    );
  }
}

Pull.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  moveDistance: PropTypes.number,
  duration: PropTypes.number,
  onRefresh: PropTypes.func,
};

Pull.defaultProps = {
  prefixCls: 'za-pull',
  moveDistance: 100,
  duration: 300,
};

export default Pull;
