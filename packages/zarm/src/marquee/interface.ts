export default interface BaseMarqueeProps {
  direction: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  height?: number | string;
  speed?: number;
  delay?: number;
}
