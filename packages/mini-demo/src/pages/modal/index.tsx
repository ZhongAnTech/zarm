
import * as React from 'react';
import Alert from './component/alert';
import Basic from './component/basic';
import Button from './component/button';
import Confrim from './component/confrim';

import './index.scss';

export default () => {
  return (
    <>
      <Basic />
      <Button />
      <Alert />
      <Confrim />
    </>
  )
}