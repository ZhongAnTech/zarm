import * as React from 'react';
import Basic from './component/basic';
import Disable from './component/disable';
import Scrollable from './component/scrollable';
import Swipeable from './component/swipeable';
import Vertical from './component/vertical';
import VerticalScrollable from './component/vertical-scrollable';
import './index.scss';

export default () => {
  return (
    <>
      <Basic />
      <Disable />
      <Scrollable />
      <Swipeable />
      <VerticalScrollable />
      <Vertical />
    </>
  );
};
