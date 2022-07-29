import React, { useEffect } from 'react';
import includes from 'lodash/includes';
import BaseTriggerProps from './interface';
import Events from '../utils/events';

export type TriggerProps = BaseTriggerProps;

const Trigger: React.FC<TriggerProps> & {
  instanceList: TriggerProps['onClose'][];
} = (props) => {
  const { visible, onClose, disabled } = props;

  // execute callback function, KeyboardEvent.keycode was not recommended in MDN
  const onKeydown = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      const lens = Trigger.instanceList.length;
      const last = Trigger.instanceList[lens - 1];
      if (last) {
        !last.disabled && last();
      }
    }
  };

  useEffect(() => {
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
  }, [visible, disabled, onClose]);

  useEffect(() => {
    if (Trigger.instanceList.length === 1) {
      Events.on(document.body, 'keydown', onKeydown);
    }

    return () => {
      const index = Trigger.instanceList.findIndex((c) => c === onClose);
      if (index > -1) {
        Trigger.instanceList.splice(index, 1);
      }
      Events.off(document.body, 'keydown', onKeydown);
    };
  }, []);

  return <>{props.children}</>;
};

Trigger.defaultProps = {
  visible: false,
  disabled: false,
};

Trigger.instanceList = [];

export default Trigger;
