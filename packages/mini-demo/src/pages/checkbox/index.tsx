
import * as React from 'react';
import Basic from './component/basic';
import Buttton from './component/buttton';
import Controlled from './component/controlled';
import CustomIcon from './component/custom-icon';
import Custom from './component/custom';
import List from './component/list';

import './index.scss';

export default () => {
  return (
    <>
      <Basic />
      <Buttton />
      <Controlled />
      <List />
      <CustomIcon />
      <Custom />
    </>
  )
}