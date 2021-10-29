import React, { useRef, useCallback, useEffect, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import cn from 'classnames';
import Button from '../button';
import { DEL_ICON, UNDO_ICON } from './icons';

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

export interface SignatureBoardProps {
  onFinish: (...args: any[]) => void;
  tips?: string;
  width?: number;
  height?: number;
  confirmTitle?: string;
  resignTitle?: string;
  confirmButton?: React.ReactElement;
  className?: string;
  signatureProps?: SignatureProps;
  getSignatureRef?: (ref: any) => void;
  hiddenUndoButton?: boolean; // 隐藏回退按钮
}

const InnerWidth = window.innerWidth;

export default function SignatureBoard(props: SignatureBoardProps) {
  const { tipText, confirmText, undoText, rewriteText } = (props as any).locale;

  const {
    onFinish,
    tips = tipText,
    width = InnerWidth,
    height = 200,
    className,
    signatureProps = {},
    confirmTitle = confirmText,
    resignTitle = rewriteText,
    confirmButton,
    getSignatureRef,
    hiddenUndoButton,
  } = props;
  const signatureRef = useRef<any>();
  const [drawData, setDrawData] = useState<any[]>([]);

  useEffect(() => {
    getSignatureRef && getSignatureRef(signatureRef);
  }, []);

  // 清除
  const handleClear = useCallback(() => {
    signatureRef.current.clear();
    setDrawData([]);
  }, [signatureRef]);

  const handleUndo = useCallback(() => {
    drawData.pop();
    signatureRef.current.fromData(drawData);
    setDrawData([...drawData]);
  }, [drawData]);

  // 获取图片base64字符串
  const getImageUrl = useCallback(() => {
    return signatureRef.current.toDataURL();
  }, []);

  // 确认签名
  const onConfirm = useCallback(() => {
    const base64Data = getImageUrl();
    onFinish && onFinish(base64Data);
  }, [onFinish, getImageUrl]);

  const handleSave = useCallback(() => {
    setDrawData(signatureRef.current.toData());
  }, []);

  const prefixCls = 'za-signature';

  return (
    <div className={cn(prefixCls, className)}>
      <div className={`${prefixCls}__container`}>
        <div className={`${prefixCls}__tip`}>{tips}</div>
        <SignatureCanvas
          penColor="black"
          canvasProps={{
            width,
            height,
            onMouseUp: handleSave,
            onTouchEnd: handleSave,
          }}
          ref={signatureRef}
          {...signatureProps}
        />
        <div className={`${prefixCls}__btns`}>
          <Button
            size="sm"
            onClick={handleClear}
            icon={<img src={DEL_ICON} style={{ width: 18 }} alt="重写" />}
          >
            {resignTitle}
          </Button>
          {!hiddenUndoButton && (
            <Button
              size="sm"
              onClick={handleUndo}
              icon={<img src={UNDO_ICON} style={{ width: 18 }} alt="撤销" />}
            >
              {undoText}
            </Button>
          )}
        </div>
      </div>
      {confirmButton || (
        <Button theme="primary" block onClick={onConfirm} disabled={drawData.length === 0}>
          {confirmTitle}
        </Button>
      )}
    </div>
  );
}
