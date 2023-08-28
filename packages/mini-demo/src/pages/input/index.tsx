
import * as React from 'react';
import Basic from './component/basic';
import Clearable from './component/clearable';
import Disable from './component/disable';
import Readonly from './component/readonly';
import ShowLength from './component/show-length';
import Vertical from './component/vertical';

import './index.scss';

export default () => {
  return (
    <>
      <Basic />
      <Clearable />
      <Disable />
      <Readonly />
      <ShowLength />
      <Vertical />
    </>
  )
}