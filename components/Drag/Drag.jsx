import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';

class Drag extends PureComponent {

  constructor(props) {
    super(props);
    this.dragState = {
      translateX: 0,
      translateY: 0,
    };
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  onTouchStart(event) {
    const dragState = this.dragState;
    const touch = event.touches[0];

    dragState.startX = touch.pageX;
    dragState.startY = touch.pageY;
    dragState.startYAbsolute = touch.clientY;
    dragState.startTime = new Date();

    const { onDragStart } = this.props;
    typeof onDragStart === 'function' && onDragStart(dragState);
  }

  onTouchMove(event) {
    // event.preventDefault();
    const dragState = this.dragState;
    const touch = event.touches[0];

    const currentX = touch.pageX;
    const currentY = touch.pageY;

    const offsetX = currentX - dragState.startX;
    const offsetY = currentY - dragState.startY;
    const distanceX = Math.abs(offsetX);
    const distanceY = Math.abs(offsetY);

    const state = {
      ...dragState,
      offsetX,
      offsetY,
      distanceX,
      distanceY,
      currentX,
      currentY,
    };

    const { onDragMove } = this.props;
    if (onDragMove(state)) {
      dragState.currentX = currentX;
      dragState.currentY = currentY;
    }

    console.log(dragState.currentX)
  }

  onTouchEnd(event) {
    const dragState = this.dragState;
    if (!dragState.currentX && !dragState.currentY) return;

    const offsetX = dragState.currentX - dragState.startX;
    const offsetY = dragState.currentY - dragState.startY;

    dragState.translateX += offsetX;
    dragState.translateY += offsetY;

    this.dragState = {
      translateX: dragState.translateX,
      translateY: dragState.translateY,
    };

    const { onDragEnd } = this.props;
    typeof onDragEnd === 'function' && onDragEnd(dragState);
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
};

Drag.defaultProps = {
};

export default Drag;
