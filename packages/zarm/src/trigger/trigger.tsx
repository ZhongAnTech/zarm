import React, { Component } from 'react';
import includes from 'lodash/includes';
import PropsType, { InstanceFn } from './PropsType';

class Trigger extends Component<PropsType, {}> {
  static defaultProps = {
    disabled: false,
  };

  static count = 0;

  static instanceList: InstanceFn[] = [];

  static getDerivedStateFromProps(nextProps: Trigger['props']) {
    const { visible, onClose, disabled } = nextProps;
    onClose && (onClose.disabled = disabled);
    if (visible === true && typeof onClose === 'function') {
      if (!includes(Trigger.instanceList, onClose)) {
        Trigger.instanceList.push(onClose);
      }
    } else {
      const index = Trigger.instanceList.findIndex((c) => c === onClose);
      if (index > -1) {
        Trigger.instanceList.splice(index, 1);
      }
    }

    return null;
  }

  static onKeydown(e: KeyboardEvent) {
    if (e.keyCode === 27) {
      const lens = Trigger.instanceList.length;
      const last = Trigger.instanceList[lens - 1];
      if (last) {
        if (last.disabled) {
          return;
        }
        last();
      }
    }
  }

  state = {};

  componentDidMount() {
    if (Trigger.count === 0) {
      document.body.addEventListener('keydown', Trigger.onKeydown);
    }
    Trigger.count += 1;
  }

  componentWillUnmount() {
    const { onClose } = this.props;
    const index = Trigger.instanceList.findIndex((c) => c === onClose);
    if (index > -1) {
      Trigger.instanceList.splice(index, 1);
    }
    Trigger.count -= 1;
    if (Trigger.count === 0) {
      document.body.removeEventListener('keydown', Trigger.onKeydown);
    }
  }

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

export default Trigger;
