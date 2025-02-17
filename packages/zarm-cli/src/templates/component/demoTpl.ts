export default (compName) => `# ${compName} 组件名

## 基本用法
\`\`\`jsx
import { ${compName} } from 'zarm';

ReactDOM.render(
  <>
    <${compName} />
  </>
, mountNode);
\`\`\`

## 用法二
\`\`\`jsx
import { useState } from 'react';
import { ${compName} } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState();

  return <${compName} />;
};

ReactDOM.render(<Demo />, mountNode);
\`\`\`

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |

## CSS 变量

| 属性 | 默认值 | 说明 |
| :--- | :--- | :--- |
`;
