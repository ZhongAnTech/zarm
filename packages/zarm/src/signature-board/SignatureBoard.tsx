import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import cn from 'classnames';
import SignaturePad from './signature-pad';
import BaseProps from './interface';
import { ConfigContext } from '../n-config-provider';

export interface SignatureBoardProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}

const InnerWidth = window.innerWidth;

function SignatureBoard(props: SignatureBoardProps, ref) {
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-signature`;

  const { width = InnerWidth, height = 200, className, signatureProps = {} } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePad = useRef<SignaturePad>();
  const [drawData, setDrawData] = useState<any[]>([]);

  useEffect(() => {
    signaturePad.current = new SignaturePad(canvasRef.current as HTMLCanvasElement, signatureProps);
    signaturePad.current.on();
    return () => signaturePad.current?.off();
  }, []);

  useEffect(() => {
    Object.assign(signaturePad.current, signatureProps);
  }, [signatureProps]);

  // clear
  const handleClear = useCallback(() => {
    signaturePad.current?.clear();
    setDrawData([]);
  }, [signaturePad]);

  // Undo
  const handleUndo = useCallback(() => {
    drawData.pop();
    signaturePad.current?.fromData(drawData);
    setDrawData([...drawData]);
  }, [drawData]);

  // 获取图片base64字符串
  const getImageData = useCallback(() => {
    return signaturePad.current?.toDataURL();
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      clear: handleClear,
      undo: handleUndo,
      getImageData,
    }),
    [getImageData, handleClear, handleUndo],
  );

  const handleSave = useCallback(() => {
    setDrawData(signaturePad.current?.toData() || []);
  }, []);

  return (
    <div className={cn(prefixCls, className)}>
      <canvas
        ref={canvasRef}
        {...signatureProps}
        width={width}
        height={height}
        onMouseUp={handleSave}
        onTouchEnd={handleSave}
        className={`${prefixCls}__canvas`}
      />
    </div>
  );
}

export default forwardRef(SignatureBoard);
