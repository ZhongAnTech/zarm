
import * as React from 'react';
import AutoHeight from './component/auto-height';
import Basic from './component/basic';
import Clearable from './component/clearable';
import Disabled from './component/disabled';
import Native from './component/native';
import Readonly from './component/readonly';
import ShowLength from './component/show-length';
import Vertical from './component/vertical';

import './index.scss';

export default () => {
  return (
    <>
      <Basic />
      <Clearable />
      <Native />
      <Readonly />
      <Disabled />
      <AutoHeight />
      <ShowLength />
      <Vertical />
    </>
  )
}