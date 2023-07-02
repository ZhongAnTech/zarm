import { useOutlet } from 'dumi';
import * as React from 'react';

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  return <>{outlet}</>;
};

export default GlobalLayout;
