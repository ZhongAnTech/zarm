import { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';

class Drag extends PureComponent {

  constructor(props) {
    super(props);
    this.dragState = {};
  }

  onTouchStart = (event) => {
    const dragState = this.dragState;
    const touch = event.touches[0];

    dragState.startX = touch.pageX;
    dragState.startY = touch.pageY;
    dragState.startTime = new Date();

    const { onDragStart } = this.props;
    onDragStart(event, dragState);
  }

  onTouchMove = (event) => {
    const dragState = this.dragState;
    const touch = event.touches[0];

    const currentX = touch.pageX;
    const currentY = touch.pageY;

    const offsetX = currentX - dragState.startX;
    const offsetY = currentY - dragState.startY;

    const state = {
      ...dragState,
      offsetX,
      offsetY,
      currentX,
      currentY,
    };

    const { onDragMove } = this.props;
    if (!onDragMove(event, state)) return;

    this.dragState = state;
  }

  onTouchEnd = (event) => {
    const dragState = this.dragState;
    const { onDragEnd } = this.props;
    onDragEnd(event, dragState);
    this.dragState = {};
  }

  render() {
    const { children } = this.props;
    return cloneElement(children, {
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd,
    });
  }
}

Drag.propTypes = {
  onDragStart: PropTypes.func,
  onDragMove: PropTypes.func,
  onDragEnd: PropTypes.func,
};

Drag.defaultProps = {
  onDragStart() {},
  onDragMove() {},
  onDragEnd() {},
};

export default Drag;
