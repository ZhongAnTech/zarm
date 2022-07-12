interface TriggerCloseProps {
  (): void;
  disabled?: boolean;
}

export default interface BaseTriggerProps {
  disabled?: boolean;
  visible?: boolean;
  onClose?: TriggerCloseProps;
}
