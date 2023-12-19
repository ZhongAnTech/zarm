import React from 'react';
import { List, Loading } from 'zarm/mini';

const Demo =() => {
  return (
    <List>
      <List.Item title="普通" suffix={<Loading />} />
      <List.Item title="大号" suffix={<Loading size="lg" />} />
  </List>
  );
}

export default Demo;