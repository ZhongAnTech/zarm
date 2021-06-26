export interface BaseMarqueeProps {
  direction: 'left' | 'right' | 'up' | 'down';
  loop: boolean;
  speed: number;
  delay: number;
  height?: number;
  width?: number;
}
