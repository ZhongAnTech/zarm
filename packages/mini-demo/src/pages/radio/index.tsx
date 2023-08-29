import * as React from 'react';
import Basic from './component/basic';
import Button from './component/button';
import Group from './component/group';
import List from './component/list';
import './index.scss';

export default () => {
  return (
    <>
      <Basic />
      <Group />
      <List />
      <Button />
    </>
  );
};
