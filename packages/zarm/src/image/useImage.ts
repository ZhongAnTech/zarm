import { useEffect, useRef, useState } from 'react';

interface UseImageProps {
  src?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const IMAGE_STATUS = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
};

export const useImage = ({ src, onLoad, onError }: UseImageProps) => {
  const [status, setStatus] = useState(src ? IMAGE_STATUS.LOADING : IMAGE_STATUS.PENDING);
  const ref: any = useRef();

  const handleLoad = () => {
    onLoad && onLoad();
    setStatus(IMAGE_STATUS.LOADED);
  };

  const handleError = () => {
    onError && onError();
    setStatus(IMAGE_STATUS.FAILED);
  };

  const destroyLoader = () => {
    if (ref.current) {
      ref.current.onload = null;
      ref.current.onerror = null;
      ref.current = null;
    }
  };

  const createLoader = () => {
    destroyLoader();

    ref.current = new Image();
    ref.current.onload = handleLoad;
    ref.current.onerror = handleError;
    ref.current.src = src;
  };

  useEffect(() => {
    createLoader();
  }, []);

  return status;
};

export default useImage;
