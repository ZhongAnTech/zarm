import React, { Component, PropTypes } from 'react';
import IScroll from 'iscroll/build/iscroll-probe.js';
import './index.scss';


class Scroll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myScroll: null,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.state.myScroll = new IScroll(this.scrollWrapper, {
        mouseWheel: true,
        probeType: 3,
        bounce: this.props.bounce,
        preventDefault: false,
        disablePointer: false,
        scrollbars: this.props.scrollbar,
      });
      this.myScrollBox = this.state.myScroll;
      this.stopTouchmove = (e) => {
        e.preventDefault();
      };
      this.state.myScroll.on('scroll', () => {
        this.props.onScroll && this.props.onScroll(this.state.myScroll.y);
      });

      const allowScroll = this.props.allowScroll;
      if (allowScroll) {
        this.scrollWrapper.addEventListener('touchmove', this.stopTouchmove);
        document.addEventListener('touchmove', this.stopTouchmove);
        this.state.myScroll.enable();
      } else {
        this.state.myScroll.disable();
      }
    }, 250);
  }

  componentWillReceiveProps(nextProps) {
    this.manualTouchMove(nextProps.allowScroll);
    if (nextProps.refresh) {
      setTimeout(() => {
        this.state.myScroll && this.state.myScroll.refresh();
      }, 150);
    }
    const { ScrollToY } = nextProps;

    if (!ScrollToY || this.updateY === nextProps.updateY) {
      return;
    }

    this.updateY = nextProps.updateY;

    this.state.myScroll.scrollTo(0, -ScrollToY, 500);
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.state.myScroll.refresh();
    }, 350);
  }

  componentWillUnmount() {
    this.scrollWrapper.removeEventListener('touchmove', this.stopTouchmove);
    document.removeEventListener('touchmove', this.stopTouchmove);
  }

  manualTouchMove(allowScroll) {
    if (allowScroll) {
      document.addEventListener('touchmove', this.stopTouchmove);
      if (this.state.myScroll) {
        this.state.myScroll.enable();
      }
    } else {
      document.removeEventListener('touchmove', this.stopTouchmove);
      if (this.state.myScroll) {
        this.state.myScroll.disable();
      }
    }
  }

  render() {
    const props = this.props;
    const { children, className, ...others } = props;
    return (
      <div className="scroll-wrapper" ref={(scrollWrapper) => { this.scrollWrapper = scrollWrapper; }}>
        <div className="scroller">
          { children }
        </div>
      </div>
    );
  }
}

Scroll.defaultProps = {
  bounce: true, // 是否允许回弹效果
  allowScroll: true, //是否可以滑动
};

export default Scroll;
