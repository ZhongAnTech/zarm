export default interface BaseMarqueeProps {
  direction: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  speed?: number;
  delay?: number;
}
