import * as React from 'react';

interface TriggerCloseProps {
  (): void;
  disabled?: boolean;
}

export default interface BaseTriggerProps {
  disabled?: boolean;
  visible?: boolean;
  children?: React.ReactNode;
  onClose?: TriggerCloseProps;
}
