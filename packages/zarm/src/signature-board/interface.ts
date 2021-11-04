interface SignatureProps {
  velocityFilterWeight: number; // default: 0.7
  minWidth: number; // default: 0.5
  maxWidth: number; // default: 2.5
  minDistance: number; // default: 5
  dotSize: number | (() => number); // default: () => (this.minWidth + this.maxWidth) / 2
  penColor: string; // default: 'black'
  throttle: number; // default: 16
  backgroundColor?: string; // default: 'rgba(0,0,0,0)'

  onEnd: () => void;
  onBegin: () => void;
}

export interface SignatureBoardRef {
  /** 清空 */
  clear: () => void;
  /** 撤销 */
  undo: () => void;
  /** 获取签名图片的base64字符串 */
  getImageData: () => string;
}

export default interface PropsType {
  width?: number;
  height?: number;
  signatureProps?: SignatureProps;
}
