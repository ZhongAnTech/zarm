export interface BaseMarqueeProps {
  direction: 'left' | 'right' | 'up' | 'down';
  loop: boolean;
  speed: number;
  animationDelay: number;
  height?: number;
  width?: number;
}
