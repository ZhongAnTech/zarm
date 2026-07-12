export default (compName) => `# ${compName} 组件名

## 基本用法
\`\`\`jsx
import { createRoot } from 'react-dom/client';
import { ${compName} } from 'zarm';

createRoot(mountNode).render(
  <>
    <${compName} />
  </>
);
\`\`\`

## 用法二
\`\`\`jsx
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ${compName} } from 'zarm';

const Demo = () => {
  const [value, setValue] = useState();

  return <${compName} />;
};

createRoot(mountNode).render(<Demo />);
\`\`\`

## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |

## CSS 变量

| 属性 | 默认值 | 说明 |
| :--- | :--- | :--- |
`;
