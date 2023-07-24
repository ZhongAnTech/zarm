import * as React from 'react';
import Basic from './component/basic';
import DefaultActive from './component/default-active';
import Disable from './component/disable';
import './index.scss';

export default () => {
  return (
    <>
      <Basic />
      <DefaultActive />
      <Disable />
    </>
  );
};
