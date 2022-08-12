export type TransitionName =
  | 'fade'
  | 'door'
  | 'flip'
  | 'rotate'
  | 'zoom'
  | 'move-up'
  | 'move-down'
  | 'move-left'
  | 'move-right'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | string;

export interface BaseTransitionProps {
  visible?: boolean;
  forceRender?: boolean;
  destroy?: boolean;
}
