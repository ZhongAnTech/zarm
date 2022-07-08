import { useEffect, useRef, useState } from 'react';

interface UseImageProps {
  src?: string;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const IMAGE_STATUS = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
};

export const useImage = ({ src, onLoad, onError }: UseImageProps) => {
  const [status, setStatus] = useState(IMAGE_STATUS.LOADING);
  const ref: any = useRef();

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    onLoad && onLoad(event);
    setStatus(IMAGE_STATUS.LOADED);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    onError && onError(event);
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
