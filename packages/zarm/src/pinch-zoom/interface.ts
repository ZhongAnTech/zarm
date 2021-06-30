export interface Point {
  clientX: number;
  clientY: number;
}

export interface ApplyChangeOpts {
  panX?: number;
  panY?: number;
  scaleDiff?: number;
  originX?: number;
  originY?: number;
}

export interface BasePinchZoomProps {
  minScale: number;
  maxScale: number;
  onPinchZoom?: Function;
}
