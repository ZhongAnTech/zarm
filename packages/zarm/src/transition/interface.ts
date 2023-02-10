export type TransitionName =
  | 'fade'
  | 'door'
  | 'flip'
  | 'rotate'
  | 'zoom'
  | 'zoom-fade'
  | 'move-up'
  | 'move-down'
  | 'move-left'
  | 'move-right'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'menu-slide'
  | (string & {});

export interface BaseTransitionProps {
  visible?: boolean;
  forceRender?: boolean;
  destroy?: boolean;
}
