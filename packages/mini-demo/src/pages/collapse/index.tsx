
import * as React from 'react';
import Basic from './component/basic';
import Defaultactive from './component/defaultactive';
import Disable from './component/disable';

import './index.scss';

export default () => {
  return (
    <>
      <Basic />
      <Defaultactive />
      <Disable />
    </>
  )
}