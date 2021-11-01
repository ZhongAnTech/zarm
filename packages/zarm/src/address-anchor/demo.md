# AddressAnchor 通讯录锚点

## 基本用法

```jsx
import { AddressAnchor } from 'zarm';
const data = [
  {
    id: 5300,
    customerName: '阿达',
    customerPinyin: 'a da',
    telNo: '16622222222',
  },
  {
    id: 5301,
    customerName: '白天',
    customerPinyin: 'bai tian',
    telNo: '16622223333',
  },
  {
    id: 5302,
    customerName: '曹操',
    customerPinyin: 'cao cao',
    telNo: '16622224444',
  },
  {
    id: 5303,
    customerName: '曹真',
    customerPinyin: 'cao zhen',
    telNo: '16622222222',
  },
  {
    id: 5304,
    customerName: '高宁威',
    customerPinyin: 'gao ning wei',
    telNo: '16622222222',
  },
  {
    id: 5305,
    customerName: '高大',
    customerPinyin: 'gao da',
    telNo: '16622222222',
  },
  {
    id: 5306,
    customerName: '韩非子',
    customerPinyin: 'han fei zi',
    telNo: '16622222222',
  },
  {
    id: 5307,
    customerName: '涵涵',
    customerPinyin: 'han han',
    telNo: '16622222222',
  },
  {
    id: 5308,
    customerName: '康佳',
    customerPinyin: 'kang jia',
    telNo: '16612345678',
  },
  {
    id: 5309,
    customerName: '刘亮',
    customerPinyin: 'liu liang',
    telNo: '16622222222',
  },
  {
    id: 5310,
    customerName: '潘东',
    customerPinyin: 'pan dong',
    telNo: '16622222222',
  },
  {
    id: 5311,
    customerName: '前卫',
    customerPinyin: 'qian wei',
    telNo: '16622222222',
  },
  {
    id: 5312,
    customerName: '桑桑',
    customerPinyin: 'sang sang',
    telNo: '16622222222',
  },
  {
    id: 5313,
    customerName: '张三',
    customerPinyin: 'zhang san',
    telNo: '16622222222',
  },
];
function Item(props) {
  const { item } = props;
  return (
    <div style={{ padding: '5px 15px' }}>
      {item.customerName} - {item.telNo}
    </div>
  );
}
const Demo = () => {
  return (
    <div
      style={{
        height: '500px',
        width: '100%',
      }}
    >
      <AddressAnchor
        key="id"
        value={data}
        initialKey="customerPinyin"
        ItemComponent={Item}
      ></AddressAnchor>
    </div>
  );
};
ReactDOM.render(<Demo />, mountNode);
```

## API

| 属性          | 类型          | 默认值       | 说明                                              |
| :------------ | :------------ | :----------- | :------------------------------------------------ |
| value         | Array<object> | []           | 要渲染的数组列表                                  |
| initialKey    | string        | 'initialKey' | 渲染数据拼音对应的 key 值                         |
| key           | string        | -            | 标识数据唯一性的 key 值                           |
| ItemComponent | React.FC<any> | -            | 渲染列表每一项的自定义组件，item 数据会被传递过去 |
