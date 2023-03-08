import { useEffect, useState } from 'react';
import Events from '../utils/events';

export interface UseOrientationProps {
  angle: number;
  type: string;
}

const defaultProps: UseOrientationProps = {
  angle: 0,
  type: 'portrait-primary',
};

const useOrientation = (initialState: UseOrientationProps = defaultProps) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const { screen } = window;
    let mounted = true;

    const onChange = () => {
      if (mounted) {
        const { orientation } = screen;
        if (orientation) {
          const { angle, type } = orientation;
          setState({ angle, type });
        } else if (window.orientation !== undefined) {
          setState({
            angle: typeof window.orientation === 'number' ? window.orientation : 0,
            type: '',
          });
        } else {
          setState(initialState);
        }
      }
    };

    Events.on(window, 'orientationchange', onChange);
    onChange();

    return () => {
      mounted = false;
      Events.off(window, 'orientationchange', onChange);
    };
  }, []);

  return state;
};

export default useOrientation;
