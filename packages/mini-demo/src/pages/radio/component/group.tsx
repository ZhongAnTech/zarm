import * as React from 'react';
import { List, Panel, Radio } from 'zarm/mini';

const Demo = () => {
  const [value, setValue] = React.useState([]);

  const onChange = (val) => {
    console.log('onChange', val);
    setValue(val);
  };

  return (
    <Panel title="组合使用">
      <List>
        <List.Item>
          <Radio.Group value={value} onChange={onChange}>
            <Radio value="0">选项一</Radio>
            <Radio value="1">选项二</Radio>
            <Radio value="2">选项三</Radio>
          </Radio.Group>
        </List.Item>
      </List>
    </Panel>
  );
};

export default Demo;
