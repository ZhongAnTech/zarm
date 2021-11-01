interface SignatureProps {
  velocityFilterWeight: number; // default: 0.7
  minWidth: number; // default: 0.5
  maxWidth: number; // default: 2.5
  minDistance: number; // default: 5
  dotSize: number | (() => number); // default: () => (this.minWidth + this.maxWidth) / 2
  penColor: string; // default: 'black'
  throttle: number; // default: 16
  backgroundColor?: string; // default: 'rgba(0,0,0,0)'
  clearOnResize?: boolean; // default: true

  onEnd: () => void;
  onBegin: () => void;
}

export default interface PropsType {
  onFinish: (...args: any[]) => void;
  tips?: string;
  width?: number;
  height?: number;
  confirmTitle?: string;
  resignTitle?: string;
  confirmButton?: React.ReactElement;
  signatureProps?: SignatureProps;
  getSignatureRef?: (ref: any) => void;
  hiddenUndoButton?: boolean; // 隐藏回退按钮
}
