import * as React from 'react';
import classnames from 'classnames';
import { useSafeState } from '../utils/hooks';
import ActivityIndicator from '../activity-indicator';

interface ModalButtonProps {
  className?: string;
  loadingClassName?: string;
  onClick?: () => void;
}

const ModalButton: React.FC<ModalButtonProps> = ({
  className,
  loadingClassName,
  children,
  onClick,
}) => {
  const [loading, setLoading] = useSafeState(false);

  return (
    <button
      type="button"
      className={classnames(className, { [`${loadingClassName}`]: loading })}
      onClick={async () => {
        setLoading(true);
        try {
          await onClick?.();
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading ? <ActivityIndicator /> : children}
    </button>
  );
};

export default ModalButton;
