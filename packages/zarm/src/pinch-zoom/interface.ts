export interface BasePinchZoomProps {
  minScale?: number;
  maxScale?: number;
  onPinchZoom?: (scale: number, x: number, y: number) => void;
}
