# Picker 选择器



## 基本用法
```jsx
import { useEffect, useRef, useReducer } from 'react';
import { Cell, Button, Picker, Toast } from 'zarm';

const SINGLE_DATA = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
  { value: '3', label: '选项三' },
  { value: '4', label: '选项四' },
  { value: '5', label: '选项五' },
];

// 普通多列数据
const MULTI_DATA = [
  [
    { value: '1', label: '选项一' },
    { value: '2', label: '选项二' },
  ],
  [
    { value: '3', label: '选项A' },
    { value: '4', label: '选项B' },
  ],
];

// 级联数据
const CASCADE_DATA = [
  {
    value: '1',
    label: '北京市',
    children: [
      { value: '11', label: '海淀区' },
      { value: '12', label: '西城区' },
    ],
  },
  {
    value: '2',
    label: '上海市',
    children: [
      { value: '21', label: '杨浦区' },
      { value: '22', label: '静安区' },
    ],
  },
];

// 自定义
const DIY_DATA = [
  {
    code: '1',
    name: '北京市',
    children: [
      { code: '11', name: '海淀区' },
      { code: '12', name: '西城区' },
    ],
  },
  {
    code: '2',
    name: '上海市',
    children: [
      { code: '21', name: '黄埔区' },
      { code: '22', name: '虹口区' },
    ],
  },
];

const initState = {
  single: {
    visible: false,
    value: '',
    dataSource: SINGLE_DATA,
  },
  multi: {
    visible: false,
    value: [],
    dataSource: MULTI_DATA,
  },
  cascade: {
    visible: false,
    value: [],
    dataSource: CASCADE_DATA,
  },
  diy: {
    visible: false,
    value: [],
    dataSource: [],
  },
  specDOM: {
    visible: false,
    value: '',
    dataSource: SINGLE_DATA,
  },
};

const reducer = (state, action) => {
  const { type, key, visible, value, valueMember, dataSource } = action;

  switch (type) {
    case 'visible':
      return {
        ...state,
        [key]: {
          ...state[key],
          visible: !state[key].visible,
        }
      };
    
    case 'value':
      return {
        ...state,
        [key]: {
          ...state[key],
          value,
        }
      };

    case 'valueMember':
      return {
        ...state,
        [key]: {
          ...state[key],
          valueMember,
        }
      };
    
    case 'dataSource':
      return {
        ...state,
        [key]: {
          ...state[key],
          dataSource,
        }
      };
  }
};

const Demo = () => {
  const myRef = useRef();
  const [state, dispatch] = useReducer(reducer, initState);

  const setVisible = (key) => {
    dispatch({ type: 'visible', key });
  };

  const setValue = (key, value) => {
    dispatch({ type: 'value', key, value });
  };

  const setValueMember = (key, value) => {
    dispatch({ type: 'valueMember', key, valueMember: value });
  };

  const setDataSource = (key, value) => {
    dispatch({ type: 'dataSource', key, dataSource: value });
  };

  useEffect(() => {
    // 异步加载数据源测试
    setTimeout(() => {
      setValue('diy', ['1', '12']);
      setDataSource('diy', DIY_DATA);
      setValueMember('diy', 'code');
    }, 0);
  }, []);

  return (
    <>
      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('single')}>选择</Button>
        }
      >
        单列
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('multi')}>选择</Button>
        }
      >
        多列
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('cascade')}>选择</Button>
        }
      >
        级联
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('diy')}>选择</Button>
        }
      >
        自定义
      </Cell>

      <Cell
        description={
          <Button size="xs" onClick={() => setVisible('specDOM')}>选择</Button>
        }
      >
        挂载到指定dom节点
      </Cell>

      <Picker
        visible={state.single.visible}
        value={state.single.value}
        dataSource={state.single.dataSource}
        onOk={(selected) => {
          console.log('Single Picker onOk: ', selected);
          Toast.show(JSON.stringify(selected));
          setValue('single', selected.map(item => item.value));
          setVisible('single');
        }}
        onCancel={() => setVisible('single')}
      />

      <Picker
        visible={state.multi.visible}
        value={state.multi.value}
        dataSource={state.multi.dataSource}
        onOk={(selected) => {
          console.log('Multi Picker onOk: ', selected);
          Toast.show(JSON.stringify(selected));
          setValue('multi', selected.map(item => item.value));
          setVisible('multi');
        }}
        onCancel={() => setVisible('multi')}
      />

      <Picker
        visible={state.cascade.visible}
        value={state.cascade.value}
        dataSource={state.cascade.dataSource}
        onOk={(selected) => {
          console.log('Cascade Picker onOk: ', selected);
          Toast.show(JSON.stringify(selected));
          setValue('cascade', selected.map(item => item.value));
          setVisible('cascade');
        }}
        onCancel={() => setVisible('cascade')}
      />

      <Picker
        visible={state.diy.visible}
        title="custom title"
        cancelText="Cancel"
        okText="Ok"
        dataSource={state.diy.dataSource}
        value={state.diy.value}
        valueMember={state.diy.valueMember}
        itemRender={data => data.name}
        onOk={(selected) => {
          console.log('DIY Picker onOk: ', selected);
          Toast.show(JSON.stringify(selected));
          setValue('diy', selected.map(item => item.code));
          setVisible('diy');
        }}
        onCancel={() => setVisible('diy')}
      />

      <Picker
        visible={state.specDOM.visible}
        value={state.specDOM.value}
        dataSource={state.specDOM.dataSource}
        onOk={(selected) => {
          console.log('Picker onOk: ', selected);
          Toast.show(JSON.stringify(selected));
          setValue('specDOM', selected.map(item => item.value));
          setVisible('specDOM');
        }}
        onCancel={() => setVisible('specDOM')}
        mountContainer={() => myRef.current}
      />

      <div
        id="test-div"
        style={{ position: 'relative', zIndex: 1 }}
        ref={myRef} 
      />
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```



## Select 表单选择器
```jsx
import { Select, Cell, Icon } from 'zarm';

// 级联数据
const CASCADE_DATA = [
  {
    value: '1',
    label: '北京市',
    children: [
      { value: '11', label: '海淀区' },
      { value: '12', label: '西城区' },
    ],
  },
  {
    value: '2',
    label: '上海市',
    children: [
      { value: '21', label: '杨浦区' },
      { value: '22', label: '静安区' },
    ],
  },
];

class Demo extends React.Component {
  state = {
    value: [],
    dataSource: [],
  };

  componentDidMount() {
    // 异步加载数据源测试
    setTimeout(() => {
      this.setState({
        dataSource: CASCADE_DATA,
        wheelDefaultValue: ['1', '12'],
      });
    }, 0);
  }

  render() {
    const { value, wheelDefaultValue, dataSource } = this.state;
    return (
      <Cell title="城市">
        <Select
          value={value}
          wheelDefaultValue={wheelDefaultValue}
          dataSource={dataSource}
          onOk={(selected) => {
            console.log('Select onOk: ', selected);
            this.setState({
              value: selected.map(item => item.value),
            });
          }}
        />
      </Cell>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## PickerView 平铺选择器
```jsx
import { PickerView } from 'zarm';

// 级联数据
const CASCADE_DATA = [];

class Demo extends React.Component {
  state = {
    value: [],
    dataSource: CASCADE_DATA,
  };

  componentDidMount() {
    
    setTimeout(() => {
      this.setState({
        value: ['1', '12'],
        dataSource: [
        {
          name: '北京市',
          code: '110000',
          children: [
            {
              name: '北京市',
              code: '110100',
              children: [
                {
                  name: '东城区',
                  code: '110101',
                  children: [],
                },
                {
                  name: '西城区',
                  code: '110102',
                  children: [],
                },
                {
                  name: '朝阳区',
                  code: '110105',
                  children: [],
                },
                {
                  name: '丰台区',
                  code: '110106',
                  children: [],
                },
                {
                  name: '石景山区',
                  code: '110107',
                  children: [],
                },
                {
                  name: '海淀区',
                  code: '110108',
                  children: [],
                },
                {
                  name: '门头沟区',
                  code: '110109',
                  children: [],
                },
                {
                  name: '房山区',
                  code: '110111',
                  children: [],
                },
                {
                  name: '通州区',
                  code: '110112',
                  children: [],
                },
                {
                  name: '顺义区',
                  code: '110113',
                  children: [],
                },
                {
                  name: '昌平区',
                  code: '110114',
                  children: [],
                },
                {
                  name: '大兴区',
                  code: '110115',
                  children: [],
                },
                {
                  name: '怀柔区',
                  code: '110116',
                  children: [],
                },
                {
                  name: '平谷区',
                  code: '110117',
                  children: [],
                },
                {
                  name: '密云区',
                  code: '110118',
                  children: [],
                },
                {
                  name: '延庆区',
                  code: '110119',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: '天津市',
          code: '120000',
          children: [
            {
              name: '天津市',
              code: '120100',
              children: [
                {
                  name: '和平区',
                  code: '120101',
                  children: [],
                },
                {
                  name: '河东区',
                  code: '120102',
                  children: [],
                },
                {
                  name: '河西区',
                  code: '120103',
                  children: [],
                },
                {
                  name: '南开区',
                  code: '120104',
                  children: [],
                },
                {
                  name: '河北区',
                  code: '120105',
                  children: [],
                },
                {
                  name: '红桥区',
                  code: '120106',
                  children: [],
                },
                {
                  name: '东丽区',
                  code: '120110',
                  children: [],
                },
                {
                  name: '西青区',
                  code: '120111',
                  children: [],
                },
                {
                  name: '津南区',
                  code: '120112',
                  children: [],
                },
                {
                  name: '北辰区',
                  code: '120113',
                  children: [],
                },
                {
                  name: '武清区',
                  code: '120114',
                  children: [],
                },
                {
                  name: '宝坻区',
                  code: '120115',
                  children: [],
                },
                {
                  name: '滨海新区',
                  code: '120116',
                  children: [],
                },
                {
                  name: '宁河区',
                  code: '120117',
                  children: [],
                },
                {
                  name: '静海区',
                  code: '120118',
                  children: [],
                },
                {
                  name: '蓟州区',
                  code: '120119',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: '河北省',
          code: '130000',
          children: [
            {
              name: '石家庄市',
              code: '130100',
              children: [
                {
                  name: '长安区',
                  code: '130102',
                  children: [],
                },
                {
                  name: '桥西区',
                  code: '130104',
                  children: [],
                },
                {
                  name: '新华区',
                  code: '130105',
                  children: [],
                },
                {
                  name: '井陉矿区',
                  code: '130107',
                  children: [],
                },
                {
                  name: '裕华区',
                  code: '130108',
                  children: [],
                },
                {
                  name: '藁城区',
                  code: '130109',
                  children: [],
                },
                {
                  name: '鹿泉区',
                  code: '130110',
                  children: [],
                },
                {
                  name: '栾城区',
                  code: '130111',
                  children: [],
                },
                {
                  name: '井陉县',
                  code: '130121',
                  children: [],
                },
                {
                  name: '正定县',
                  code: '130123',
                  children: [],
                },
                {
                  name: '行唐县',
                  code: '130125',
                  children: [],
                },
                {
                  name: '灵寿县',
                  code: '130126',
                  children: [],
                },
                {
                  name: '高邑县',
                  code: '130127',
                  children: [],
                },
                {
                  name: '深泽县',
                  code: '130128',
                  children: [],
                },
                {
                  name: '赞皇县',
                  code: '130129',
                  children: [],
                },
                {
                  name: '无极县',
                  code: '130130',
                  children: [],
                },
                {
                  name: '平山县',
                  code: '130131',
                  children: [],
                },
                {
                  name: '元氏县',
                  code: '130132',
                  children: [],
                },
                {
                  name: '赵县',
                  code: '130133',
                  children: [],
                },
                {
                  name: '辛集市',
                  code: '130181',
                  children: [],
                },
                {
                  name: '晋州市',
                  code: '130183',
                  children: [],
                },
                {
                  name: '新乐市',
                  code: '130184',
                  children: [],
                },
              ],
            },
            {
              name: '唐山市',
              code: '130200',
              children: [
                {
                  name: '路南区',
                  code: '130202',
                  children: [],
                },
                {
                  name: '路北区',
                  code: '130203',
                  children: [],
                },
                {
                  name: '古冶区',
                  code: '130204',
                  children: [],
                },
                {
                  name: '开平区',
                  code: '130205',
                  children: [],
                },
                {
                  name: '丰南区',
                  code: '130207',
                  children: [],
                },
                {
                  name: '丰润区',
                  code: '130208',
                  children: [],
                },
                {
                  name: '曹妃甸区',
                  code: '130209',
                  children: [],
                },
                {
                  name: '滦南县',
                  code: '130224',
                  children: [],
                },
                {
                  name: '乐亭县',
                  code: '130225',
                  children: [],
                },
                {
                  name: '迁西县',
                  code: '130227',
                  children: [],
                },
                {
                  name: '玉田县',
                  code: '130229',
                  children: [],
                },
                {
                  name: '遵化市',
                  code: '130281',
                  children: [],
                },
                {
                  name: '迁安市',
                  code: '130283',
                  children: [],
                },
                {
                  name: '滦州市',
                  code: '130284',
                  children: [],
                },
              ],
            },
            {
              name: '秦皇岛市',
              code: '130300',
              children: [
                {
                  name: '海港区',
                  code: '130302',
                  children: [],
                },
                {
                  name: '山海关区',
                  code: '130303',
                  children: [],
                },
                {
                  name: '北戴河区',
                  code: '130304',
                  children: [],
                },
                {
                  name: '抚宁区',
                  code: '130306',
                  children: [],
                },
                {
                  name: '青龙满族自治县',
                  code: '130321',
                  children: [],
                },
                {
                  name: '昌黎县',
                  code: '130322',
                  children: [],
                },
                {
                  name: '卢龙县',
                  code: '130324',
                  children: [],
                },
              ],
            },
            {
              name: '邯郸市',
              code: '130400',
              children: [
                {
                  name: '邯山区',
                  code: '130402',
                  children: [],
                },
                {
                  name: '丛台区',
                  code: '130403',
                  children: [],
                },
                {
                  name: '复兴区',
                  code: '130404',
                  children: [],
                },
                {
                  name: '峰峰矿区',
                  code: '130406',
                  children: [],
                },
                {
                  name: '肥乡区',
                  code: '130407',
                  children: [],
                },
                {
                  name: '永年区',
                  code: '130408',
                  children: [],
                },
                {
                  name: '临漳县',
                  code: '130423',
                  children: [],
                },
                {
                  name: '成安县',
                  code: '130424',
                  children: [],
                },
                {
                  name: '大名县',
                  code: '130425',
                  children: [],
                },
                {
                  name: '涉县',
                  code: '130426',
                  children: [],
                },
                {
                  name: '磁县',
                  code: '130427',
                  children: [],
                },
                {
                  name: '邱县',
                  code: '130430',
                  children: [],
                },
                {
                  name: '鸡泽县',
                  code: '130431',
                  children: [],
                },
                {
                  name: '广平县',
                  code: '130432',
                  children: [],
                },
                {
                  name: '馆陶县',
                  code: '130433',
                  children: [],
                },
                {
                  name: '魏县',
                  code: '130434',
                  children: [],
                },
                {
                  name: '曲周县',
                  code: '130435',
                  children: [],
                },
                {
                  name: '武安市',
                  code: '130481',
                  children: [],
                },
              ],
            },
            {
              name: '邢台市',
              code: '130500',
              children: [
                {
                  name: '桥东区',
                  code: '130502',
                  children: [],
                },
                {
                  name: '桥西区',
                  code: '130503',
                  children: [],
                },
                {
                  name: '邢台县',
                  code: '130521',
                  children: [],
                },
                {
                  name: '临城县',
                  code: '130522',
                  children: [],
                },
                {
                  name: '内丘县',
                  code: '130523',
                  children: [],
                },
                {
                  name: '柏乡县',
                  code: '130524',
                  children: [],
                },
                {
                  name: '隆尧县',
                  code: '130525',
                  children: [],
                },
                {
                  name: '任县',
                  code: '130526',
                  children: [],
                },
                {
                  name: '南和县',
                  code: '130527',
                  children: [],
                },
                {
                  name: '宁晋县',
                  code: '130528',
                  children: [],
                },
                {
                  name: '巨鹿县',
                  code: '130529',
                  children: [],
                },
                {
                  name: '新河县',
                  code: '130530',
                  children: [],
                },
                {
                  name: '广宗县',
                  code: '130531',
                  children: [],
                },
                {
                  name: '平乡县',
                  code: '130532',
                  children: [],
                },
                {
                  name: '威县',
                  code: '130533',
                  children: [],
                },
                {
                  name: '清河县',
                  code: '130534',
                  children: [],
                },
                {
                  name: '临西县',
                  code: '130535',
                  children: [],
                },
                {
                  name: '南宫市',
                  code: '130581',
                  children: [],
                },
                {
                  name: '沙河市',
                  code: '130582',
                  children: [],
                },
              ],
            },
            {
              name: '保定市',
              code: '130600',
              children: [
                {
                  name: '竞秀区',
                  code: '130602',
                  children: [],
                },
                {
                  name: '莲池区',
                  code: '130606',
                  children: [],
                },
                {
                  name: '满城区',
                  code: '130607',
                  children: [],
                },
                {
                  name: '清苑区',
                  code: '130608',
                  children: [],
                },
                {
                  name: '徐水区',
                  code: '130609',
                  children: [],
                },
                {
                  name: '涞水县',
                  code: '130623',
                  children: [],
                },
                {
                  name: '阜平县',
                  code: '130624',
                  children: [],
                },
                {
                  name: '定兴县',
                  code: '130626',
                  children: [],
                },
                {
                  name: '唐县',
                  code: '130627',
                  children: [],
                },
                {
                  name: '高阳县',
                  code: '130628',
                  children: [],
                },
                {
                  name: '容城县',
                  code: '130629',
                  children: [],
                },
                {
                  name: '涞源县',
                  code: '130630',
                  children: [],
                },
                {
                  name: '望都县',
                  code: '130631',
                  children: [],
                },
                {
                  name: '安新县',
                  code: '130632',
                  children: [],
                },
                {
                  name: '易县',
                  code: '130633',
                  children: [],
                },
                {
                  name: '曲阳县',
                  code: '130634',
                  children: [],
                },
                {
                  name: '蠡县',
                  code: '130635',
                  children: [],
                },
                {
                  name: '顺平县',
                  code: '130636',
                  children: [],
                },
                {
                  name: '博野县',
                  code: '130637',
                  children: [],
                },
                {
                  name: '雄县',
                  code: '130638',
                  children: [],
                },
                {
                  name: '涿州市',
                  code: '130681',
                  children: [],
                },
                {
                  name: '定州市',
                  code: '130682',
                  children: [],
                },
                {
                  name: '安国市',
                  code: '130683',
                  children: [],
                },
                {
                  name: '高碑店市',
                  code: '130684',
                  children: [],
                },
              ],
            },
            {
              name: '张家口市',
              code: '130700',
              children: [
                {
                  name: '桥东区',
                  code: '130702',
                  children: [],
                },
                {
                  name: '桥西区',
                  code: '130703',
                  children: [],
                },
                {
                  name: '宣化区',
                  code: '130705',
                  children: [],
                },
                {
                  name: '下花园区',
                  code: '130706',
                  children: [],
                },
                {
                  name: '万全区',
                  code: '130708',
                  children: [],
                },
                {
                  name: '崇礼区',
                  code: '130709',
                  children: [],
                },
                {
                  name: '张北县',
                  code: '130722',
                  children: [],
                },
                {
                  name: '康保县',
                  code: '130723',
                  children: [],
                },
                {
                  name: '沽源县',
                  code: '130724',
                  children: [],
                },
                {
                  name: '尚义县',
                  code: '130725',
                  children: [],
                },
                {
                  name: '蔚县',
                  code: '130726',
                  children: [],
                },
                {
                  name: '阳原县',
                  code: '130727',
                  children: [],
                },
                {
                  name: '怀安县',
                  code: '130728',
                  children: [],
                },
                {
                  name: '怀来县',
                  code: '130730',
                  children: [],
                },
                {
                  name: '涿鹿县',
                  code: '130731',
                  children: [],
                },
                {
                  name: '赤城县',
                  code: '130732',
                  children: [],
                },
              ],
            },
            {
              name: '承德市',
              code: '130800',
              children: [
                {
                  name: '双桥区',
                  code: '130802',
                  children: [],
                },
                {
                  name: '双滦区',
                  code: '130803',
                  children: [],
                },
                {
                  name: '鹰手营子矿区',
                  code: '130804',
                  children: [],
                },
                {
                  name: '承德县',
                  code: '130821',
                  children: [],
                },
                {
                  name: '兴隆县',
                  code: '130822',
                  children: [],
                },
                {
                  name: '滦平县',
                  code: '130824',
                  children: [],
                },
                {
                  name: '隆化县',
                  code: '130825',
                  children: [],
                },
                {
                  name: '丰宁满族自治县',
                  code: '130826',
                  children: [],
                },
                {
                  name: '宽城满族自治县',
                  code: '130827',
                  children: [],
                },
                {
                  name: '围场满族蒙古族自治县',
                  code: '130828',
                  children: [],
                },
                {
                  name: '平泉市',
                  code: '130881',
                  children: [],
                },
              ],
            },
            {
              name: '沧州市',
              code: '130900',
              children: [
                {
                  name: '新华区',
                  code: '130902',
                  children: [],
                },
                {
                  name: '运河区',
                  code: '130903',
                  children: [],
                },
                {
                  name: '沧县',
                  code: '130921',
                  children: [],
                },
                {
                  name: '青县',
                  code: '130922',
                  children: [],
                },
                {
                  name: '东光县',
                  code: '130923',
                  children: [],
                },
                {
                  name: '海兴县',
                  code: '130924',
                  children: [],
                },
                {
                  name: '盐山县',
                  code: '130925',
                  children: [],
                },
                {
                  name: '肃宁县',
                  code: '130926',
                  children: [],
                },
                {
                  name: '南皮县',
                  code: '130927',
                  children: [],
                },
                {
                  name: '吴桥县',
                  code: '130928',
                  children: [],
                },
                {
                  name: '献县',
                  code: '130929',
                  children: [],
                },
                {
                  name: '孟村回族自治县',
                  code: '130930',
                  children: [],
                },
                {
                  name: '泊头市',
                  code: '130981',
                  children: [],
                },
                {
                  name: '任丘市',
                  code: '130982',
                  children: [],
                },
                {
                  name: '黄骅市',
                  code: '130983',
                  children: [],
                },
                {
                  name: '河间市',
                  code: '130984',
                  children: [],
                },
              ],
            },
            {
              name: '廊坊市',
              code: '131000',
              children: [
                {
                  name: '安次区',
                  code: '131002',
                  children: [],
                },
                {
                  name: '广阳区',
                  code: '131003',
                  children: [],
                },
                {
                  name: '固安县',
                  code: '131022',
                  children: [],
                },
                {
                  name: '永清县',
                  code: '131023',
                  children: [],
                },
                {
                  name: '香河县',
                  code: '131024',
                  children: [],
                },
                {
                  name: '大城县',
                  code: '131025',
                  children: [],
                },
                {
                  name: '文安县',
                  code: '131026',
                  children: [],
                },
                {
                  name: '大厂回族自治县',
                  code: '131028',
                  children: [],
                },
                {
                  name: '霸州市',
                  code: '131081',
                  children: [],
                },
                {
                  name: '三河市',
                  code: '131082',
                  children: [],
                },
              ],
            },
            {
              name: '衡水市',
              code: '131100',
              children: [
                {
                  name: '桃城区',
                  code: '131102',
                  children: [],
                },
                {
                  name: '冀州区',
                  code: '131103',
                  children: [],
                },
                {
                  name: '枣强县',
                  code: '131121',
                  children: [],
                },
                {
                  name: '武邑县',
                  code: '131122',
                  children: [],
                },
                {
                  name: '武强县',
                  code: '131123',
                  children: [],
                },
                {
                  name: '饶阳县',
                  code: '131124',
                  children: [],
                },
                {
                  name: '安平县',
                  code: '131125',
                  children: [],
                },
                {
                  name: '故城县',
                  code: '131126',
                  children: [],
                },
                {
                  name: '景县',
                  code: '131127',
                  children: [],
                },
                {
                  name: '阜城县',
                  code: '131128',
                  children: [],
                },
                {
                  name: '深州市',
                  code: '131182',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: '山西省',
          code: '140000',
          children: [
            {
              name: '太原市',
              code: '140100',
              children: [
                {
                  name: '小店区',
                  code: '140105',
                  children: [],
                },
                {
                  name: '迎泽区',
                  code: '140106',
                  children: [],
                },
                {
                  name: '杏花岭区',
                  code: '140107',
                  children: [],
                },
                {
                  name: '尖草坪区',
                  code: '140108',
                  children: [],
                },
                {
                  name: '万柏林区',
                  code: '140109',
                  children: [],
                },
                {
                  name: '晋源区',
                  code: '140110',
                  children: [],
                },
                {
                  name: '清徐县',
                  code: '140121',
                  children: [],
                },
                {
                  name: '阳曲县',
                  code: '140122',
                  children: [],
                },
                {
                  name: '娄烦县',
                  code: '140123',
                  children: [],
                },
                {
                  name: '古交市',
                  code: '140181',
                  children: [],
                },
              ],
            },
            {
              name: '大同市',
              code: '140200',
              children: [
                {
                  name: '新荣区',
                  code: '140212',
                  children: [],
                },
                {
                  name: '平城区',
                  code: '140213',
                  children: [],
                },
                {
                  name: '云冈区',
                  code: '140214',
                  children: [],
                },
                {
                  name: '云州区',
                  code: '140215',
                  children: [],
                },
                {
                  name: '阳高县',
                  code: '140221',
                  children: [],
                },
                {
                  name: '天镇县',
                  code: '140222',
                  children: [],
                },
                {
                  name: '广灵县',
                  code: '140223',
                  children: [],
                },
                {
                  name: '灵丘县',
                  code: '140224',
                  children: [],
                },
                {
                  name: '浑源县',
                  code: '140225',
                  children: [],
                },
                {
                  name: '左云县',
                  code: '140226',
                  children: [],
                },
              ],
            },
            {
              name: '阳泉市',
              code: '140300',
              children: [
                {
                  name: '城区',
                  code: '140302',
                  children: [],
                },
                {
                  name: '矿区',
                  code: '140303',
                  children: [],
                },
                {
                  name: '郊区',
                  code: '140311',
                  children: [],
                },
                {
                  name: '平定县',
                  code: '140321',
                  children: [],
                },
                {
                  name: '盂县',
                  code: '140322',
                  children: [],
                },
              ],
            },
            {
              name: '长治市',
              code: '140400',
              children: [
                {
                  name: '潞州区',
                  code: '140403',
                  children: [],
                },
                {
                  name: '上党区',
                  code: '140404',
                  children: [],
                },
                {
                  name: '屯留区',
                  code: '140405',
                  children: [],
                },
                {
                  name: '潞城区',
                  code: '140406',
                  children: [],
                },
                {
                  name: '襄垣县',
                  code: '140423',
                  children: [],
                },
                {
                  name: '平顺县',
                  code: '140425',
                  children: [],
                },
                {
                  name: '黎城县',
                  code: '140426',
                  children: [],
                },
                {
                  name: '壶关县',
                  code: '140427',
                  children: [],
                },
                {
                  name: '长子县',
                  code: '140428',
                  children: [],
                },
                {
                  name: '武乡县',
                  code: '140429',
                  children: [],
                },
                {
                  name: '沁县',
                  code: '140430',
                  children: [],
                },
                {
                  name: '沁源县',
                  code: '140431',
                  children: [],
                },
              ],
            },
            {
              name: '晋城市',
              code: '140500',
              children: [
                {
                  name: '城区',
                  code: '140502',
                  children: [],
                },
                {
                  name: '沁水县',
                  code: '140521',
                  children: [],
                },
                {
                  name: '阳城县',
                  code: '140522',
                  children: [],
                },
                {
                  name: '陵川县',
                  code: '140524',
                  children: [],
                },
                {
                  name: '泽州县',
                  code: '140525',
                  children: [],
                },
                {
                  name: '高平市',
                  code: '140581',
                  children: [],
                },
              ],
            },
            {
              name: '朔州市',
              code: '140600',
              children: [
                {
                  name: '朔城区',
                  code: '140602',
                  children: [],
                },
                {
                  name: '平鲁区',
                  code: '140603',
                  children: [],
                },
                {
                  name: '山阴县',
                  code: '140621',
                  children: [],
                },
                {
                  name: '应县',
                  code: '140622',
                  children: [],
                },
                {
                  name: '右玉县',
                  code: '140623',
                  children: [],
                },
                {
                  name: '怀仁市',
                  code: '140681',
                  children: [],
                },
              ],
            },
            {
              name: '晋中市',
              code: '140700',
              children: [
                {
                  name: '榆次区',
                  code: '140702',
                  children: [],
                },
                {
                  name: '榆社县',
                  code: '140721',
                  children: [],
                },
                {
                  name: '左权县',
                  code: '140722',
                  children: [],
                },
                {
                  name: '和顺县',
                  code: '140723',
                  children: [],
                },
                {
                  name: '昔阳县',
                  code: '140724',
                  children: [],
                },
                {
                  name: '寿阳县',
                  code: '140725',
                  children: [],
                },
                {
                  name: '太谷县',
                  code: '140726',
                  children: [],
                },
                {
                  name: '祁县',
                  code: '140727',
                  children: [],
                },
                {
                  name: '平遥县',
                  code: '140728',
                  children: [],
                },
                {
                  name: '灵石县',
                  code: '140729',
                  children: [],
                },
                {
                  name: '介休市',
                  code: '140781',
                  children: [],
                },
              ],
            },
            {
              name: '运城市',
              code: '140800',
              children: [
                {
                  name: '盐湖区',
                  code: '140802',
                  children: [],
                },
                {
                  name: '临猗县',
                  code: '140821',
                  children: [],
                },
                {
                  name: '万荣县',
                  code: '140822',
                  children: [],
                },
                {
                  name: '闻喜县',
                  code: '140823',
                  children: [],
                },
                {
                  name: '稷山县',
                  code: '140824',
                  children: [],
                },
                {
                  name: '新绛县',
                  code: '140825',
                  children: [],
                },
                {
                  name: '绛县',
                  code: '140826',
                  children: [],
                },
                {
                  name: '垣曲县',
                  code: '140827',
                  children: [],
                },
                {
                  name: '夏县',
                  code: '140828',
                  children: [],
                },
                {
                  name: '平陆县',
                  code: '140829',
                  children: [],
                },
                {
                  name: '芮城县',
                  code: '140830',
                  children: [],
                },
                {
                  name: '永济市',
                  code: '140881',
                  children: [],
                },
                {
                  name: '河津市',
                  code: '140882',
                  children: [],
                },
              ],
            },
            {
              name: '忻州市',
              code: '140900',
              children: [
                {
                  name: '忻府区',
                  code: '140902',
                  children: [],
                },
                {
                  name: '定襄县',
                  code: '140921',
                  children: [],
                },
                {
                  name: '五台县',
                  code: '140922',
                  children: [],
                },
                {
                  name: '代县',
                  code: '140923',
                  children: [],
                },
                {
                  name: '繁峙县',
                  code: '140924',
                  children: [],
                },
                {
                  name: '宁武县',
                  code: '140925',
                  children: [],
                },
                {
                  name: '静乐县',
                  code: '140926',
                  children: [],
                },
                {
                  name: '神池县',
                  code: '140927',
                  children: [],
                },
                {
                  name: '五寨县',
                  code: '140928',
                  children: [],
                },
                {
                  name: '岢岚县',
                  code: '140929',
                  children: [],
                },
                {
                  name: '河曲县',
                  code: '140930',
                  children: [],
                },
                {
                  name: '保德县',
                  code: '140931',
                  children: [],
                },
                {
                  name: '偏关县',
                  code: '140932',
                  children: [],
                },
                {
                  name: '原平市',
                  code: '140981',
                  children: [],
                },
              ],
            },
            {
              name: '临汾市',
              code: '141000',
              children: [
                {
                  name: '尧都区',
                  code: '141002',
                  children: [],
                },
                {
                  name: '曲沃县',
                  code: '141021',
                  children: [],
                },
                {
                  name: '翼城县',
                  code: '141022',
                  children: [],
                },
                {
                  name: '襄汾县',
                  code: '141023',
                  children: [],
                },
                {
                  name: '洪洞县',
                  code: '141024',
                  children: [],
                },
                {
                  name: '古县',
                  code: '141025',
                  children: [],
                },
                {
                  name: '安泽县',
                  code: '141026',
                  children: [],
                },
                {
                  name: '浮山县',
                  code: '141027',
                  children: [],
                },
                {
                  name: '吉县',
                  code: '141028',
                  children: [],
                },
                {
                  name: '乡宁县',
                  code: '141029',
                  children: [],
                },
                {
                  name: '大宁县',
                  code: '141030',
                  children: [],
                },
                {
                  name: '隰县',
                  code: '141031',
                  children: [],
                },
                {
                  name: '永和县',
                  code: '141032',
                  children: [],
                },
                {
                  name: '蒲县',
                  code: '141033',
                  children: [],
                },
                {
                  name: '汾西县',
                  code: '141034',
                  children: [],
                },
                {
                  name: '侯马市',
                  code: '141081',
                  children: [],
                },
                {
                  name: '霍州市',
                  code: '141082',
                  children: [],
                },
              ],
            },
            {
              name: '吕梁市',
              code: '141100',
              children: [
                {
                  name: '离石区',
                  code: '141102',
                  children: [],
                },
                {
                  name: '文水县',
                  code: '141121',
                  children: [],
                },
                {
                  name: '交城县',
                  code: '141122',
                  children: [],
                },
                {
                  name: '兴县',
                  code: '141123',
                  children: [],
                },
                {
                  name: '临县',
                  code: '141124',
                  children: [],
                },
                {
                  name: '柳林县',
                  code: '141125',
                  children: [],
                },
                {
                  name: '石楼县',
                  code: '141126',
                  children: [],
                },
                {
                  name: '岚县',
                  code: '141127',
                  children: [],
                },
                {
                  name: '方山县',
                  code: '141128',
                  children: [],
                },
                {
                  name: '中阳县',
                  code: '141129',
                  children: [],
                },
                {
                  name: '交口县',
                  code: '141130',
                  children: [],
                },
                {
                  name: '孝义市',
                  code: '141181',
                  children: [],
                },
                {
                  name: '汾阳市',
                  code: '141182',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: '内蒙古自治区',
          code: '150000',
          children: [
            {
              name: '呼和浩特市',
              code: '150100',
              children: [
                {
                  name: '新城区',
                  code: '150102',
                  children: [],
                },
                {
                  name: '回民区',
                  code: '150103',
                  children: [],
                },
                {
                  name: '玉泉区',
                  code: '150104',
                  children: [],
                },
                {
                  name: '赛罕区',
                  code: '150105',
                  children: [],
                },
                {
                  name: '土默特左旗',
                  code: '150121',
                  children: [],
                },
                {
                  name: '托克托县',
                  code: '150122',
                  children: [],
                },
                {
                  name: '和林格尔县',
                  code: '150123',
                  children: [],
                },
                {
                  name: '清水河县',
                  code: '150124',
                  children: [],
                },
                {
                  name: '武川县',
                  code: '150125',
                  children: [],
                },
              ],
            },
            {
              name: '包头市',
              code: '150200',
              children: [
                {
                  name: '东河区',
                  code: '150202',
                  children: [],
                },
                {
                  name: '昆都仑区',
                  code: '150203',
                  children: [],
                },
                {
                  name: '青山区',
                  code: '150204',
                  children: [],
                },
                {
                  name: '石拐区',
                  code: '150205',
                  children: [],
                },
                {
                  name: '白云鄂博矿区',
                  code: '150206',
                  children: [],
                },
                {
                  name: '九原区',
                  code: '150207',
                  children: [],
                },
                {
                  name: '土默特右旗',
                  code: '150221',
                  children: [],
                },
                {
                  name: '固阳县',
                  code: '150222',
                  children: [],
                },
                {
                  name: '达尔罕茂明安联合旗',
                  code: '150223',
                  children: [],
                },
              ],
            },
            {
              name: '乌海市',
              code: '150300',
              children: [
                {
                  name: '海勃湾区',
                  code: '150302',
                  children: [],
                },
                {
                  name: '海南区',
                  code: '150303',
                  children: [],
                },
                {
                  name: '乌达区',
                  code: '150304',
                  children: [],
                },
              ],
            },
            {
              name: '赤峰市',
              code: '150400',
              children: [
                {
                  name: '红山区',
                  code: '150402',
                  children: [],
                },
                {
                  name: '元宝山区',
                  code: '150403',
                  children: [],
                },
                {
                  name: '松山区',
                  code: '150404',
                  children: [],
                },
                {
                  name: '阿鲁科尔沁旗',
                  code: '150421',
                  children: [],
                },
                {
                  name: '巴林左旗',
                  code: '150422',
                  children: [],
                },
                {
                  name: '巴林右旗',
                  code: '150423',
                  children: [],
                },
                {
                  name: '林西县',
                  code: '150424',
                  children: [],
                },
                {
                  name: '克什克腾旗',
                  code: '150425',
                  children: [],
                },
                {
                  name: '翁牛特旗',
                  code: '150426',
                  children: [],
                },
                {
                  name: '喀喇沁旗',
                  code: '150428',
                  children: [],
                },
                {
                  name: '宁城县',
                  code: '150429',
                  children: [],
                },
                {
                  name: '敖汉旗',
                  code: '150430',
                  children: [],
                },
              ],
            },
            {
              name: '通辽市',
              code: '150500',
              children: [
                {
                  name: '科尔沁区',
                  code: '150502',
                  children: [],
                },
                {
                  name: '科尔沁左翼中旗',
                  code: '150521',
                  children: [],
                },
                {
                  name: '科尔沁左翼后旗',
                  code: '150522',
                  children: [],
                },
                {
                  name: '开鲁县',
                  code: '150523',
                  children: [],
                },
                {
                  name: '库伦旗',
                  code: '150524',
                  children: [],
                },
                {
                  name: '奈曼旗',
                  code: '150525',
                  children: [],
                },
                {
                  name: '扎鲁特旗',
                  code: '150526',
                  children: [],
                },
                {
                  name: '霍林郭勒市',
                  code: '150581',
                  children: [],
                },
              ],
            },
            {
              name: '鄂尔多斯市',
              code: '150600',
              children: [
                {
                  name: '东胜区',
                  code: '150602',
                  children: [],
                },
                {
                  name: '康巴什区',
                  code: '150603',
                  children: [],
                },
                {
                  name: '达拉特旗',
                  code: '150621',
                  children: [],
                },
                {
                  name: '准格尔旗',
                  code: '150622',
                  children: [],
                },
                {
                  name: '鄂托克前旗',
                  code: '150623',
                  children: [],
                },
                {
                  name: '鄂托克旗',
                  code: '150624',
                  children: [],
                },
                {
                  name: '杭锦旗',
                  code: '150625',
                  children: [],
                },
                {
                  name: '乌审旗',
                  code: '150626',
                  children: [],
                },
                {
                  name: '伊金霍洛旗',
                  code: '150627',
                  children: [],
                },
              ],
            },
            {
              name: '呼伦贝尔市',
              code: '150700',
              children: [
                {
                  name: '海拉尔区',
                  code: '150702',
                  children: [],
                },
                {
                  name: '扎赉诺尔区',
                  code: '150703',
                  children: [],
                },
                {
                  name: '阿荣旗',
                  code: '150721',
                  children: [],
                },
                {
                  name: '莫力达瓦达斡尔族自治旗',
                  code: '150722',
                  children: [],
                },
                {
                  name: '鄂伦春自治旗',
                  code: '150723',
                  children: [],
                },
                {
                  name: '鄂温克族自治旗',
                  code: '150724',
                  children: [],
                },
                {
                  name: '陈巴尔虎旗',
                  code: '150725',
                  children: [],
                },
                {
                  name: '新巴尔虎左旗',
                  code: '150726',
                  children: [],
                },
                {
                  name: '新巴尔虎右旗',
                  code: '150727',
                  children: [],
                },
                {
                  name: '满洲里市',
                  code: '150781',
                  children: [],
                },
                {
                  name: '牙克石市',
                  code: '150782',
                  children: [],
                },
                {
                  name: '扎兰屯市',
                  code: '150783',
                  children: [],
                },
                {
                  name: '额尔古纳市',
                  code: '150784',
                  children: [],
                },
                {
                  name: '根河市',
                  code: '150785',
                  children: [],
                },
              ],
            },
            {
              name: '巴彦淖尔市',
              code: '150800',
              children: [
                {
                  name: '临河区',
                  code: '150802',
                  children: [],
                },
                {
                  name: '五原县',
                  code: '150821',
                  children: [],
                },
                {
                  name: '磴口县',
                  code: '150822',
                  children: [],
                },
                {
                  name: '乌拉特前旗',
                  code: '150823',
                  children: [],
                },
                {
                  name: '乌拉特中旗',
                  code: '150824',
                  children: [],
                },
                {
                  name: '乌拉特后旗',
                  code: '150825',
                  children: [],
                },
                {
                  name: '杭锦后旗',
                  code: '150826',
                  children: [],
                },
              ],
            },
            {
              name: '乌兰察布市',
              code: '150900',
              children: [
                {
                  name: '集宁区',
                  code: '150902',
                  children: [],
                },
                {
                  name: '卓资县',
                  code: '150921',
                  children: [],
                },
                {
                  name: '化德县',
                  code: '150922',
                  children: [],
                },
                {
                  name: '商都县',
                  code: '150923',
                  children: [],
                },
                {
                  name: '兴和县',
                  code: '150924',
                  children: [],
                },
                {
                  name: '凉城县',
                  code: '150925',
                  children: [],
                },
                {
                  name: '察哈尔右翼前旗',
                  code: '150926',
                  children: [],
                },
                {
                  name: '察哈尔右翼中旗',
                  code: '150927',
                  children: [],
                },
                {
                  name: '察哈尔右翼后旗',
                  code: '150928',
                  children: [],
                },
                {
                  name: '四子王旗',
                  code: '150929',
                  children: [],
                },
                {
                  name: '丰镇市',
                  code: '150981',
                  children: [],
                },
              ],
            },
            {
              name: '兴安盟',
              code: '152200',
              children: [
                {
                  name: '乌兰浩特市',
                  code: '152201',
                  children: [],
                },
                {
                  name: '阿尔山市',
                  code: '152202',
                  children: [],
                },
                {
                  name: '科尔沁右翼前旗',
                  code: '152221',
                  children: [],
                },
                {
                  name: '科尔沁右翼中旗',
                  code: '152222',
                  children: [],
                },
                {
                  name: '扎赉特旗',
                  code: '152223',
                  children: [],
                },
                {
                  name: '突泉县',
                  code: '152224',
                  children: [],
                },
              ],
            },
            {
              name: '锡林郭勒盟',
              code: '152500',
              children: [
                {
                  name: '二连浩特市',
                  code: '152501',
                  children: [],
                },
                {
                  name: '锡林浩特市',
                  code: '152502',
                  children: [],
                },
                {
                  name: '阿巴嘎旗',
                  code: '152522',
                  children: [],
                },
                {
                  name: '苏尼特左旗',
                  code: '152523',
                  children: [],
                },
                {
                  name: '苏尼特右旗',
                  code: '152524',
                  children: [],
                },
                {
                  name: '东乌珠穆沁旗',
                  code: '152525',
                  children: [],
                },
                {
                  name: '西乌珠穆沁旗',
                  code: '152526',
                  children: [],
                },
                {
                  name: '太仆寺旗',
                  code: '152527',
                  children: [],
                },
                {
                  name: '镶黄旗',
                  code: '152528',
                  children: [],
                },
                {
                  name: '正镶白旗',
                  code: '152529',
                  children: [],
                },
                {
                  name: '正蓝旗',
                  code: '152530',
                  children: [],
                },
                {
                  name: '多伦县',
                  code: '152531',
                  children: [],
                },
              ],
            },
            {
              name: '阿拉善盟',
              code: '152900',
              children: [
                {
                  name: '阿拉善左旗',
                  code: '152921',
                  children: [],
                },
                {
                  name: '阿拉善右旗',
                  code: '152922',
                  children: [],
                },
                {
                  name: '额济纳旗',
                  code: '152923',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: '辽宁省',
          code: '210000',
          children: [
            {
              name: '沈阳市',
              code: '210100',
              children: [
                {
                  name: '和平区',
                  code: '210102',
                  children: [],
                },
                {
                  name: '沈河区',
                  code: '210103',
                  children: [],
                },
                {
                  name: '大东区',
                  code: '210104',
                  children: [],
                },
                {
                  name: '皇姑区',
                  code: '210105',
                  children: [],
                },
                {
                  name: '铁西区',
                  code: '210106',
                  children: [],
                },
                {
                  name: '苏家屯区',
                  code: '210111',
                  children: [],
                },
                {
                  name: '浑南区',
                  code: '210112',
                  children: [],
                },
                {
                  name: '沈北新区',
                  code: '210113',
                  children: [],
                },
                {
                  name: '于洪区',
                  code: '210114',
                  children: [],
                },
                {
                  name: '辽中区',
                  code: '210115',
                  children: [],
                },
                {
                  name: '康平县',
                  code: '210123',
                  children: [],
                },
                {
                  name: '法库县',
                  code: '210124',
                  children: [],
                },
                {
                  name: '新民市',
                  code: '210181',
                  children: [],
                },
              ],
            },
            {
              name: '大连市',
              code: '210200',
              children: [
                {
                  name: '中山区',
                  code: '210202',
                  children: [],
                },
                {
                  name: '西岗区',
                  code: '210203',
                  children: [],
                },
                {
                  name: '沙河口区',
                  code: '210204',
                  children: [],
                },
                {
                  name: '甘井子区',
                  code: '210211',
                  children: [],
                },
                {
                  name: '旅顺口区',
                  code: '210212',
                  children: [],
                },
                {
                  name: '金州区',
                  code: '210213',
                  children: [],
                },
                {
                  name: '普兰店区',
                  code: '210214',
                  children: [],
                },
                {
                  name: '长海县',
                  code: '210224',
                  children: [],
                },
                {
                  name: '瓦房店市',
                  code: '210281',
                  children: [],
                },
                {
                  name: '庄河市',
                  code: '210283',
                  children: [],
                },
              ],
            },
            {
              name: '鞍山市',
              code: '210300',
              children: [
                {
                  name: '铁东区',
                  code: '210302',
                  children: [],
                },
                {
                  name: '铁西区',
                  code: '210303',
                  children: [],
                },
                {
                  name: '立山区',
                  code: '210304',
                  children: [],
                },
                {
                  name: '千山区',
                  code: '210311',
                  children: [],
                },
                {
                  name: '台安县',
                  code: '210321',
                  children: [],
                },
                {
                  name: '岫岩满族自治县',
                  code: '210323',
                  children: [],
                },
                {
                  name: '海城市',
                  code: '210381',
                  children: [],
                },
              ],
            },
            {
              name: '抚顺市',
              code: '210400',
              children: [
                {
                  name: '新抚区',
                  code: '210402',
                  children: [],
                },
                {
                  name: '东洲区',
                  code: '210403',
                  children: [],
                },
                {
                  name: '望花区',
                  code: '210404',
                  children: [],
                },
                {
                  name: '顺城区',
                  code: '210411',
                  children: [],
                },
                {
                  name: '抚顺县',
                  code: '210421',
                  children: [],
                },
                {
                  name: '新宾满族自治县',
                  code: '210422',
                  children: [],
                },
                {
                  name: '清原满族自治县',
                  code: '210423',
                  children: [],
                },
              ],
            },
            {
              name: '本溪市',
              code: '210500',
              children: [
                {
                  name: '平山区',
                  code: '210502',
                  children: [],
                },
                {
                  name: '溪湖区',
                  code: '210503',
                  children: [],
                },
                {
                  name: '明山区',
                  code: '210504',
                  children: [],
                },
                {
                  name: '南芬区',
                  code: '210505',
                  children: [],
                },
                {
                  name: '本溪满族自治县',
                  code: '210521',
                  children: [],
                },
                {
                  name: '桓仁满族自治县',
                  code: '210522',
                  children: [],
                },
              ],
            },
            {
              name: '丹东市',
              code: '210600',
              children: [
                {
                  name: '元宝区',
                  code: '210602',
                  children: [],
                },
                {
                  name: '振兴区',
                  code: '210603',
                  children: [],
                },
                {
                  name: '振安区',
                  code: '210604',
                  children: [],
                },
                {
                  name: '宽甸满族自治县',
                  code: '210624',
                  children: [],
                },
                {
                  name: '东港市',
                  code: '210681',
                  children: [],
                },
                {
                  name: '凤城市',
                  code: '210682',
                  children: [],
                },
              ],
            },
            {
              name: '锦州市',
              code: '210700',
              children: [
                {
                  name: '古塔区',
                  code: '210702',
                  children: [],
                },
                {
                  name: '凌河区',
                  code: '210703',
                  children: [],
                },
                {
                  name: '太和区',
                  code: '210711',
                  children: [],
                },
                {
                  name: '黑山县',
                  code: '210726',
                  children: [],
                },
                {
                  name: '义县',
                  code: '210727',
                  children: [],
                },
                {
                  name: '凌海市',
                  code: '210781',
                  children: [],
                },
                {
                  name: '北镇市',
                  code: '210782',
                  children: [],
                },
              ],
            },
            {
              name: '营口市',
              code: '210800',
              children: [
                {
                  name: '站前区',
                  code: '210802',
                  children: [],
                },
                {
                  name: '西市区',
                  code: '210803',
                  children: [],
                },
                {
                  name: '鲅鱼圈区',
                  code: '210804',
                  children: [],
                },
                {
                  name: '老边区',
                  code: '210811',
                  children: [],
                },
                {
                  name: '盖州市',
                  code: '210881',
                  children: [],
                },
                {
                  name: '大石桥市',
                  code: '210882',
                  children: [],
                },
              ],
            },
            {
              name: '阜新市',
              code: '210900',
              children: [
                {
                  name: '海州区',
                  code: '210902',
                  children: [],
                },
                {
                  name: '新邱区',
                  code: '210903',
                  children: [],
                },
                {
                  name: '太平区',
                  code: '210904',
                  children: [],
                },
                {
                  name: '清河门区',
                  code: '210905',
                  children: [],
                },
                {
                  name: '细河区',
                  code: '210911',
                  children: [],
                },
                {
                  name: '阜新蒙古族自治县',
                  code: '210921',
                  children: [],
                },
                {
                  name: '彰武县',
                  code: '210922',
                  children: [],
                },
              ],
            },
            {
              name: '辽阳市',
              code: '211000',
              children: [
                {
                  name: '白塔区',
                  code: '211002',
                  children: [],
                },
                {
                  name: '文圣区',
                  code: '211003',
                  children: [],
                },
                {
                  name: '宏伟区',
                  code: '211004',
                  children: [],
                },
                {
                  name: '弓长岭区',
                  code: '211005',
                  children: [],
                },
                {
                  name: '太子河区',
                  code: '211011',
                  children: [],
                },
                {
                  name: '辽阳县',
                  code: '211021',
                  children: [],
                },
                {
                  name: '灯塔市',
                  code: '211081',
                  children: [],
                },
              ],
            },
            {
              name: '盘锦市',
              code: '211100',
              children: [
                {
                  name: '双台子区',
                  code: '211102',
                  children: [],
                },
                {
                  name: '兴隆台区',
                  code: '211103',
                  children: [],
                },
                {
                  name: '大洼区',
                  code: '211104',
                  children: [],
                },
                {
                  name: '盘山县',
                  code: '211122',
                  children: [],
                },
              ],
            },
            {
              name: '铁岭市',
              code: '211200',
              children: [
                {
                  name: '银州区',
                  code: '211202',
                  children: [],
                },
                {
                  name: '清河区',
                  code: '211204',
                  children: [],
                },
                {
                  name: '铁岭县',
                  code: '211221',
                  children: [],
                },
                {
                  name: '西丰县',
                  code: '211223',
                  children: [],
                },
                {
                  name: '昌图县',
                  code: '211224',
                  children: [],
                },
                {
                  name: '调兵山市',
                  code: '211281',
                  children: [],
                },
                {
                  name: '开原市',
                  code: '211282',
                  children: [],
                },
              ],
            },
            {
              name: '朝阳市',
              code: '211300',
              children: [
                {
                  name: '双塔区',
                  code: '211302',
                  children: [],
                },
                {
                  name: '龙城区',
                  code: '211303',
                  children: [],
                },
                {
                  name: '朝阳县',
                  code: '211321',
                  children: [],
                },
                {
                  name: '建平县',
                  code: '211322',
                  children: [],
                },
                {
                  name: '喀喇沁左翼蒙古族自治县',
                  code: '211324',
                  children: [],
                },
                {
                  name: '北票市',
                  code: '211381',
                  children: [],
                },
                {
                  name: '凌源市',
                  code: '211382',
                  children: [],
                },
              ],
            },
            {
              name: '葫芦岛市',
              code: '211400',
              children: [
                {
                  name: '连山区',
                  code: '211402',
                  children: [],
                },
                {
                  name: '龙港区',
                  code: '211403',
                  children: [],
                },
                {
                  name: '南票区',
                  code: '211404',
                  children: [],
                },
                {
                  name: '绥中县',
                  code: '211421',
                  children: [],
                },
                {
                  name: '建昌县',
                  code: '211422',
                  children: [],
                },
                {
                  name: '兴城市',
                  code: '211481',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: '吉林省',
          code: '220000',
          children: [
            {
              name: '长春市',
              code: '220100',
              children: [
                {
                  name: '南关区',
                  code: '220102',
                  children: [],
                },
                {
                  name: '宽城区',
                  code: '220103',
                  children: [],
                },
                {
                  name: '朝阳区',
                  code: '220104',
                  children: [],
                },
                {
                  name: '二道区',
                  code: '220105',
                  children: [],
                },
                {
                  name: '绿园区',
                  code: '220106',
                  children: [],
                },
                {
                  name: '双阳区',
                  code: '220112',
                  children: [],
                },
                {
                  name: '九台区',
                  code: '220113',
                  children: [],
                },
                {
                  name: '农安县',
                  code: '220122',
                  children: [],
                },
                {
                  name: '榆树市',
                  code: '220182',
                  children: [],
                },
                {
                  name: '德惠市',
                  code: '220183',
                  children: [],
                },
              ],
            },
            {
              name: '吉林市',
              code: '220200',
              children: [
                {
                  name: '昌邑区',
                  code: '220202',
                  children: [],
                },
                {
                  name: '龙潭区',
                  code: '220203',
                  children: [],
                },
                {
                  name: '船营区',
                  code: '220204',
                  children: [],
                },
                {
                  name: '丰满区',
                  code: '220211',
                  children: [],
                },
                {
                  name: '永吉县',
                  code: '220221',
                  children: [],
                },
                {
                  name: '蛟河市',
                  code: '220281',
                  children: [],
                },
                {
                  name: '桦甸市',
                  code: '220282',
                  children: [],
                },
                {
                  name: '舒兰市',
                  code: '220283',
                  children: [],
                },
                {
                  name: '磐石市',
                  code: '220284',
                  children: [],
                },
              ],
            },
            {
              name: '四平市',
              code: '220300',
              children: [
                {
                  name: '铁西区',
                  code: '220302',
                  children: [],
                },
                {
                  name: '铁东区',
                  code: '220303',
                  children: [],
                },
                {
                  name: '梨树县',
                  code: '220322',
                  children: [],
                },
                {
                  name: '伊通满族自治县',
                  code: '220323',
                  children: [],
                },
                {
                  name: '公主岭市',
                  code: '220381',
                  children: [],
                },
                {
                  name: '双辽市',
                  code: '220382',
                  children: [],
                },
              ],
            },
            {
              name: '辽源市',
              code: '220400',
              children: [
                {
                  name: '龙山区',
                  code: '220402',
                  children: [],
                },
                {
                  name: '西安区',
                  code: '220403',
                  children: [],
                },
                {
                  name: '东丰县',
                  code: '220421',
                  children: [],
                },
                {
                  name: '东辽县',
                  code: '220422',
                  children: [],
                },
              ],
            },
            {
              name: '通化市',
              code: '220500',
              children: [
                {
                  name: '东昌区',
                  code: '220502',
                  children: [],
                },
                {
                  name: '二道江区',
                  code: '220503',
                  children: [],
                },
                {
                  name: '通化县',
                  code: '220521',
                  children: [],
                },
                {
                  name: '辉南县',
                  code: '220523',
                  children: [],
                },
                {
                  name: '柳河县',
                  code: '220524',
                  children: [],
                },
                {
                  name: '梅河口市',
                  code: '220581',
                  children: [],
                },
                {
                  name: '集安市',
                  code: '220582',
                  children: [],
                },
              ],
            },
            {
              name: '白山市',
              code: '220600',
              children: [
                {
                  name: '浑江区',
                  code: '220602',
                  children: [],
                },
                {
                  name: '江源区',
                  code: '220605',
                  children: [],
                },
                {
                  name: '抚松县',
                  code: '220621',
                  children: [],
                },
                {
                  name: '靖宇县',
                  code: '220622',
                  children: [],
                },
                {
                  name: '长白朝鲜族自治县',
                  code: '220623',
                  children: [],
                },
                {
                  name: '临江市',
                  code: '220681',
                  children: [],
                },
              ],
            },
            {
              name: '松原市',
              code: '220700',
              children: [
                {
                  name: '宁江区',
                  code: '220702',
                  children: [],
                },
                {
                  name: '前郭尔罗斯蒙古族自治县',
                  code: '220721',
                  children: [],
                },
                {
                  name: '长岭县',
                  code: '220722',
                  children: [],
                },
                {
                  name: '乾安县',
                  code: '220723',
                  children: [],
                },
                {
                  name: '扶余市',
                  code: '220781',
                  children: [],
                },
              ],
            },
            {
              name: '白城市',
              code: '220800',
              children: [
                {
                  name: '洮北区',
                  code: '220802',
                  children: [],
                },
                {
                  name: '镇赉县',
                  code: '220821',
                  children: [],
                },
                {
                  name: '通榆县',
                  code: '220822',
                  children: [],
                },
                {
                  name: '洮南市',
                  code: '220881',
                  children: [],
                },
                {
                  name: '大安市',
                  code: '220882',
                  children: [],
                },
              ],
            },
            {
              name: '延边朝鲜族自治州',
              code: '222400',
              children: [
                {
                  name: '延吉市',
                  code: '222401',
                  children: [],
                },
                {
                  name: '图们市',
                  code: '222402',
                  children: [],
                },
                {
                  name: '敦化市',
                  code: '222403',
                  children: [],
                },
                {
                  name: '珲春市',
                  code: '222404',
                  children: [],
                },
                {
                  name: '龙井市',
                  code: '222405',
                  children: [],
                },
                {
                  name: '和龙市',
                  code: '222406',
                  children: [],
                },
                {
                  name: '汪清县',
                  code: '222424',
                  children: [],
                },
                {
                  name: '安图县',
                  code: '222426',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: '黑龙江省',
          code: '230000',
          children: [
            {
              name: '哈尔滨市',
              code: '230100',
              children: [
                {
                  name: '道里区',
                  code: '230102',
                  children: [],
                },
                {
                  name: '南岗区',
                  code: '230103',
                  children: [],
                },
                {
                  name: '道外区',
                  code: '230104',
                  children: [],
                },
                {
                  name: '平房区',
                  code: '230108',
                  children: [],
                },
                {
                  name: '松北区',
                  code: '230109',
                  children: [],
                },
                {
                  name: '香坊区',
                  code: '230110',
                  children: [],
                },
                {
                  name: '呼兰区',
                  code: '230111',
                  children: [],
                },
                {
                  name: '阿城区',
                  code: '230112',
                  children: [],
                },
                {
                  name: '双城区',
                  code: '230113',
                  children: [],
                },
                {
                  name: '依兰县',
                  code: '230123',
                  children: [],
                },
                {
                  name: '方正县',
                  code: '230124',
                  children: [],
                },
                {
                  name: '宾县',
                  code: '230125',
                  children: [],
                },
                {
                  name: '巴彦县',
                  code: '230126',
                  children: [],
                },
                {
                  name: '木兰县',
                  code: '230127',
                  children: [],
                },
                {
                  name: '通河县',
                  code: '230128',
                  children: [],
                },
                {
                  name: '延寿县',
                  code: '230129',
                  children: [],
                },
                {
                  name: '尚志市',
                  code: '230183',
                  children: [],
                },
                {
                  name: '五常市',
                  code: '230184',
                  children: [],
                },
              ],
            },
            {
              name: '齐齐哈尔市',
              code: '230200',
              children: [
                {
                  name: '龙沙区',
                  code: '230202',
                  children: [],
                },
                {
                  name: '建华区',
                  code: '230203',
                  children: [],
                },
                {
                  name: '铁锋区',
                  code: '230204',
                  children: [],
                },
                {
                  name: '昂昂溪区',
                  code: '230205',
                  children: [],
                },
                {
                  name: '富拉尔基区',
                  code: '230206',
                  children: [],
                },
                {
                  name: '碾子山区',
                  code: '230207',
                  children: [],
                },
                {
                  name: '梅里斯达斡尔族区',
                  code: '230208',
                  children: [],
                },
                {
                  name: '龙江县',
                  code: '230221',
                  children: [],
                },
                {
                  name: '依安县',
                  code: '230223',
                  children: [],
                },
                {
                  name: '泰来县',
                  code: '230224',
                  children: [],
                },
                {
                  name: '甘南县',
                  code: '230225',
                  children: [],
                },
                {
                  name: '富裕县',
                  code: '230227',
                  children: [],
                },
                {
                  name: '克山县',
                  code: '230229',
                  children: [],
                },
                {
                  name: '克东县',
                  code: '230230',
                  children: [],
                },
                {
                  name: '拜泉县',
                  code: '230231',
                  children: [],
                },
                {
                  name: '讷河市',
                  code: '230281',
                  children: [],
                },
              ],
            },
            {
              name: '鸡西市',
              code: '230300',
              children: [
                {
                  name: '鸡冠区',
                  code: '230302',
                  children: [],
                },
                {
                  name: '恒山区',
                  code: '230303',
                  children: [],
                },
                {
                  name: '滴道区',
                  code: '230304',
                  children: [],
                },
                {
                  name: '梨树区',
                  code: '230305',
                  children: [],
                },
                {
                  name: '城子河区',
                  code: '230306',
                  children: [],
                },
                {
                  name: '麻山区',
                  code: '230307',
                  children: [],
                },
                {
                  name: '鸡东县',
                  code: '230321',
                  children: [],
                },
                {
                  name: '虎林市',
                  code: '230381',
                  children: [],
                },
                {
                  name: '密山市',
                  code: '230382',
                  children: [],
                },
              ],
            },
            {
              name: '鹤岗市',
              code: '230400',
              children: [
                {
                  name: '向阳区',
                  code: '230402',
                  children: [],
                },
                {
                  name: '工农区',
                  code: '230403',
                  children: [],
                },
                {
                  name: '南山区',
                  code: '230404',
                  children: [],
                },
                {
                  name: '兴安区',
                  code: '230405',
                  children: [],
                },
                {
                  name: '东山区',
                  code: '230406',
                  children: [],
                },
                {
                  name: '兴山区',
                  code: '230407',
                  children: [],
                },
                {
                  name: '萝北县',
                  code: '230421',
                  children: [],
                },
                {
                  name: '绥滨县',
                  code: '230422',
                  children: [],
                },
              ],
            },
            {
              name: '双鸭山市',
              code: '230500',
              children: [
                {
                  name: '尖山区',
                  code: '230502',
                  children: [],
                },
                {
                  name: '岭东区',
                  code: '230503',
                  children: [],
                },
                {
                  name: '四方台区',
                  code: '230505',
                  children: [],
                },
                {
                  name: '宝山区',
                  code: '230506',
                  children: [],
                },
                {
                  name: '集贤县',
                  code: '230521',
                  children: [],
                },
                {
                  name: '友谊县',
                  code: '230522',
                  children: [],
                },
                {
                  name: '宝清县',
                  code: '230523',
                  children: [],
                },
                {
                  name: '饶河县',
                  code: '230524',
                  children: [],
                },
              ],
            },
            {
              name: '大庆市',
              code: '230600',
              children: [
                {
                  name: '萨尔图区',
                  code: '230602',
                  children: [],
                },
                {
                  name: '龙凤区',
                  code: '230603',
                  children: [],
                },
                {
                  name: '让胡路区',
                  code: '230604',
                  children: [],
                },
                {
                  name: '红岗区',
                  code: '230605',
                  children: [],
                },
                {
                  name: '大同区',
                  code: '230606',
                  children: [],
                },
                {
                  name: '肇州县',
                  code: '230621',
                  children: [],
                },
                {
                  name: '肇源县',
                  code: '230622',
                  children: [],
                },
                {
                  name: '林甸县',
                  code: '230623',
                  children: [],
                },
                {
                  name: '杜尔伯特蒙古族自治县',
                  code: '230624',
                  children: [],
                },
              ],
            },
            {
              name: '伊春市',
              code: '230700',
              children: [
                {
                  name: '伊美区',
                  code: '230717',
                  children: [],
                },
                {
                  name: '乌翠区',
                  code: '230718',
                  children: [],
                },
                {
                  name: '友好区',
                  code: '230719',
                  children: [],
                },
                {
                  name: '嘉荫县',
                  code: '230722',
                  children: [],
                },
                {
                  name: '汤旺县',
                  code: '230723',
                  children: [],
                },
                {
                  name: '丰林县',
                  code: '230724',
                  children: [],
                },
                {
                  name: '大箐山县',
                  code: '230725',
                  children: [],
                },
                {
                  name: '南岔县',
                  code: '230726',
                  children: [],
                },
                {
                  name: '金林区',
                  code: '230751',
                  children: [],
                },
                {
                  name: '铁力市',
                  code: '230781',
                  children: [],
                },
              ],
            },
            {
              name: '佳木斯市',
              code: '230800',
              children: [
                {
                  name: '向阳区',
                  code: '230803',
                  children: [],
                },
                {
                  name: '前进区',
                  code: '230804',
                  children: [],
                },
                {
                  name: '东风区',
                  code: '230805',
                  children: [],
                },
                {
                  name: '郊区',
                  code: '230811',
                  children: [],
                },
                {
                  name: '桦南县',
                  code: '230822',
                  children: [],
                },
                {
                  name: '桦川县',
                  code: '230826',
                  children: [],
                },
                {
                  name: '汤原县',
                  code: '230828',
                  children: [],
                },
                {
                  name: '同江市',
                  code: '230881',
                  children: [],
                },
                {
                  name: '富锦市',
                  code: '230882',
                  children: [],
                },
                {
                  name: '抚远市',
                  code: '230883',
                  children: [],
                },
              ],
            },
            {
              name: '七台河市',
              code: '230900',
              children: [
                {
                  name: '新兴区',
                  code: '230902',
                  children: [],
                },
                {
                  name: '桃山区',
                  code: '230903',
                  children: [],
                },
                {
                  name: '茄子河区',
                  code: '230904',
                  children: [],
                },
                {
                  name: '勃利县',
                  code: '230921',
                  children: [],
                },
              ],
            },
            {
              name: '牡丹江市',
              code: '231000',
              children: [
                {
                  name: '东安区',
                  code: '231002',
                  children: [],
                },
                {
                  name: '阳明区',
                  code: '231003',
                  children: [],
                },
                {
                  name: '爱民区',
                  code: '231004',
                  children: [],
                },
                {
                  name: '西安区',
                  code: '231005',
                  children: [],
                },
                {
                  name: '林口县',
                  code: '231025',
                  children: [],
                },
                {
                  name: '绥芬河市',
                  code: '231081',
                  children: [],
                },
                {
                  name: '海林市',
                  code: '231083',
                  children: [],
                },
                {
                  name: '宁安市',
                  code: '231084',
                  children: [],
                },
                {
                  name: '穆棱市',
                  code: '231085',
                  children: [],
                },
                {
                  name: '东宁市',
                  code: '231086',
                  children: [],
                },
              ],
            },
            {
              name: '黑河市',
              code: '231100',
              children: [
                {
                  name: '爱辉区',
                  code: '231102',
                  children: [],
                },
                {
                  name: '嫩江县',
                  code: '231121',
                  children: [],
                },
                {
                  name: '逊克县',
                  code: '231123',
                  children: [],
                },
                {
                  name: '孙吴县',
                  code: '231124',
                  children: [],
                },
                {
                  name: '北安市',
                  code: '231181',
                  children: [],
                },
                {
                  name: '五大连池市',
                  code: '231182',
                  children: [],
                },
              ],
            },
            {
              name: '绥化市',
              code: '231200',
              children: [
                {
                  name: '北林区',
                  code: '231202',
                  children: [],
                },
                {
                  name: '望奎县',
                  code: '231221',
                  children: [],
                },
                {
                  name: '兰西县',
                  code: '231222',
                  children: [],
                },
                {
                  name: '青冈县',
                  code: '231223',
                  children: [],
                },
                {
                  name: '庆安县',
                  code: '231224',
                  children: [],
                },
                {
                  name: '明水县',
                  code: '231225',
                  children: [],
                },
                {
                  name: '绥棱县',
                  code: '231226',
                  children: [],
                },
                {
                  name: '安达市',
                  code: '231281',
                  children: [],
                },
                {
                  name: '肇东市',
                  code: '231282',
                  children: [],
                },
                {
                  name: '海伦市',
                  code: '231283',
                  children: [],
                },
              ],
            },
            {
              name: '大兴安岭地区',
              code: '232700',
              children: [
                {
                  name: '漠河市',
                  code: '232701',
                  children: [],
                },
                {
                  name: '呼玛县',
                  code: '232721',
                  children: [],
                },
                {
                  name: '塔河县',
                  code: '232722',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: '上海市',
          code: '310000',
          children: [
            {
              name: '上海市',
              code: '310100',
              children: [
                {
                  name: '黄浦区',
                  code: '310101',
                  children: [],
                },
                {
                  name: '徐汇区',
                  code: '310104',
                  children: [],
                },
                {
                  name: '长宁区',
                  code: '310105',
                  children: [],
                },
                {
                  name: '静安区',
                  code: '310106',
                  children: [],
                },
                {
                  name: '普陀区',
                  code: '310107',
                  children: [],
                },
                {
                  name: '虹口区',
                  code: '310109',
                  children: [],
                },
                {
                  name: '杨浦区',
                  code: '310110',
                  children: [],
                },
                {
                  name: '闵行区',
                  code: '310112',
                  children: [],
                },
                {
                  name: '宝山区',
                  code: '310113',
                  children: [],
                },
                {
                  name: '嘉定区',
                  code: '310114',
                  children: [],
                },
                {
                  name: '浦东新区',
                  code: '310115',
                  children: [],
                },
                {
                  name: '金山区',
                  code: '310116',
                  children: [],
                },
                {
                  name: '松江区',
                  code: '310117',
                  children: [],
                },
                {
                  name: '青浦区',
                  code: '310118',
                  children: [],
                },
                {
                  name: '奉贤区',
                  code: '310120',
                  children: [],
                },
                {
                  name: '崇明区',
                  code: '310151',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: '江苏省',
          code: '320000',
          children: [
            {
              name: '南京市',
              code: '320100',
              children: [
                {
                  name: '玄武区',
                  code: '320102',
                  children: [],
                },
                {
                  name: '秦淮区',
                  code: '320104',
                  children: [],
                },
                {
                  name: '建邺区',
                  code: '320105',
                  children: [],
                },
                {
                  name: '鼓楼区',
                  code: '320106',
                  children: [],
                },
                {
                  name: '浦口区',
                  code: '320111',
                  children: [],
                },
                {
                  name: '栖霞区',
                  code: '320113',
                  children: [],
                },
                {
                  name: '雨花台区',
                  code: '320114',
                  children: [],
                },
                {
                  name: '江宁区',
                  code: '320115',
                  children: [],
                },
                {
                  name: '六合区',
                  code: '320116',
                  children: [],
                },
                {
                  name: '溧水区',
                  code: '320117',
                  children: [],
                },
                {
                  name: '高淳区',
                  code: '320118',
                  children: [],
                },
              ],
            },
            {
              name: '无锡市',
              code: '320200',
              children: [
                {
                  name: '锡山区',
                  code: '320205',
                  children: [],
                },
                {
                  name: '惠山区',
                  code: '320206',
                  children: [],
                },
                {
                  name: '滨湖区',
                  code: '320211',
                  children: [],
                },
                {
                  name: '梁溪区',
                  code: '320213',
                  children: [],
                },
                {
                  name: '新吴区',
                  code: '320214',
                  children: [],
                },
                {
                  name: '江阴市',
                  code: '320281',
                  children: [],
                },
                {
                  name: '宜兴市',
                  code: '320282',
                  children: [],
                },
              ],
            },
            {
              name: '徐州市',
              code: '320300',
              children: [
                {
                  name: '鼓楼区',
                  code: '320302',
                  children: [],
                },
                {
                  name: '云龙区',
                  code: '320303',
                  children: [],
                },
                {
                  name: '贾汪区',
                  code: '320305',
                  children: [],
                },
                {
                  name: '泉山区',
                  code: '320311',
                  children: [],
                },
                {
                  name: '铜山区',
                  code: '320312',
                  children: [],
                },
                {
                  name: '丰县',
                  code: '320321',
                  children: [],
                },
                {
                  name: '沛县',
                  code: '320322',
                  children: [],
                },
                {
                  name: '睢宁县',
                  code: '320324',
                  children: [],
                },
                {
                  name: '新沂市',
                  code: '320381',
                  children: [],
                },
                {
                  name: '邳州市',
                  code: '320382',
                  children: [],
                },
              ],
            },
            {
              name: '常州市',
              code: '320400',
              children: [
                {
                  name: '天宁区',
                  code: '320402',
                  children: [],
                },
                {
                  name: '钟楼区',
                  code: '320404',
                  children: [],
                },
                {
                  name: '新北区',
                  code: '320411',
                  children: [],
                },
                {
                  name: '武进区',
                  code: '320412',
                  children: [],
                },
                {
                  name: '金坛区',
                  code: '320413',
                  children: [],
                },
                {
                  name: '溧阳市',
                  code: '320481',
                  children: [],
                },
              ],
            },
            {
              name: '苏州市',
              code: '320500',
              children: [
                {
                  name: '虎丘区',
                  code: '320505',
                  children: [],
                },
                {
                  name: '吴中区',
                  code: '320506',
                  children: [],
                },
                {
                  name: '相城区',
                  code: '320507',
                  children: [],
                },
                {
                  name: '姑苏区',
                  code: '320508',
                  children: [],
                },
                {
                  name: '吴江区',
                  code: '320509',
                  children: [],
                },
                {
                  name: '常熟市',
                  code: '320581',
                  children: [],
                },
                {
                  name: '张家港市',
                  code: '320582',
                  children: [],
                },
                {
                  name: '昆山市',
                  code: '320583',
                  children: [],
                },
                {
                  name: '太仓市',
                  code: '320585',
                  children: [],
                },
              ],
            },
            {
              name: '南通市',
              code: '320600',
              children: [
                {
                  name: '崇川区',
                  code: '320602',
                  children: [],
                },
                {
                  name: '港闸区',
                  code: '320611',
                  children: [],
                },
                {
                  name: '通州区',
                  code: '320612',
                  children: [],
                },
                {
                  name: '如东县',
                  code: '320623',
                  children: [],
                },
                {
                  name: '启东市',
                  code: '320681',
                  children: [],
                },
                {
                  name: '如皋市',
                  code: '320682',
                  children: [],
                },
                {
                  name: '海门市',
                  code: '320684',
                  children: [],
                },
                {
                  name: '海安市',
                  code: '320685',
                  children: [],
                },
              ],
            },
            {
              name: '连云港市',
              code: '320700',
              children: [
                {
                  name: '连云区',
                  code: '320703',
                  children: [],
                },
                {
                  name: '海州区',
                  code: '320706',
                  children: [],
                },
                {
                  name: '赣榆区',
                  code: '320707',
                  children: [],
                },
                {
                  name: '东海县',
                  code: '320722',
                  children: [],
                },
                {
                  name: '灌云县',
                  code: '320723',
                  children: [],
                },
                {
                  name: '灌南县',
                  code: '320724',
                  children: [],
                },
              ],
            },
            {
              name: '淮安市',
              code: '320800',
              children: [
                {
                  name: '淮安区',
                  code: '320803',
                  children: [],
                },
                {
                  name: '淮阴区',
                  code: '320804',
                  children: [],
                },
                {
                  name: '清江浦区',
                  code: '320812',
                  children: [],
                },
                {
                  name: '洪泽区',
                  code: '320813',
                  children: [],
                },
                {
                  name: '涟水县',
                  code: '320826',
                  children: [],
                },
                {
                  name: '盱眙县',
                  code: '320830',
                  children: [],
                },
                {
                  name: '金湖县',
                  code: '320831',
                  children: [],
                },
              ],
            },
            {
              name: '盐城市',
              code: '320900',
              children: [
                {
                  name: '亭湖区',
                  code: '320902',
                  children: [],
                },
                {
                  name: '盐都区',
                  code: '320903',
                  children: [],
                },
                {
                  name: '大丰区',
                  code: '320904',
                  children: [],
                },
                {
                  name: '响水县',
                  code: '320921',
                  children: [],
                },
                {
                  name: '滨海县',
                  code: '320922',
                  children: [],
                },
                {
                  name: '阜宁县',
                  code: '320923',
                  children: [],
                },
                {
                  name: '射阳县',
                  code: '320924',
                  children: [],
                },
                {
                  name: '建湖县',
                  code: '320925',
                  children: [],
                },
                {
                  name: '东台市',
                  code: '320981',
                  children: [],
                },
              ],
            },
            {
              name: '扬州市',
              code: '321000',
              children: [
                {
                  name: '广陵区',
                  code: '321002',
                  children: [],
                },
                {
                  name: '邗江区',
                  code: '321003',
                  children: [],
                },
                {
                  name: '江都区',
                  code: '321012',
                  children: [],
                },
                {
                  name: '宝应县',
                  code: '321023',
                  children: [],
                },
                {
                  name: '仪征市',
                  code: '321081',
                  children: [],
                },
                {
                  name: '高邮市',
                  code: '321084',
                  children: [],
                },
              ],
            },
            {
              name: '镇江市',
              code: '321100',
              children: [
                {
                  name: '京口区',
                  code: '321102',
                  children: [],
                },
                {
                  name: '润州区',
                  code: '321111',
                  children: [],
                },
                {
                  name: '丹徒区',
                  code: '321112',
                  children: [],
                },
                {
                  name: '丹阳市',
                  code: '321181',
                  children: [],
                },
                {
                  name: '扬中市',
                  code: '321182',
                  children: [],
                },
                {
                  name: '句容市',
                  code: '321183',
                  children: [],
                },
              ],
            },
            {
              name: '泰州市',
              code: '321200',
              children: [
                {
                  name: '海陵区',
                  code: '321202',
                  children: [],
                },
                {
                  name: '高港区',
                  code: '321203',
                  children: [],
                },
                {
                  name: '姜堰区',
                  code: '321204',
                  children: [],
                },
                {
                  name: '兴化市',
                  code: '321281',
                  children: [],
                },
                {
                  name: '靖江市',
                  code: '321282',
                  children: [],
                },
                {
                  name: '泰兴市',
                  code: '321283',
                  children: [],
                },
              ],
            },
            {
              name: '宿迁市',
              code: '321300',
              children: [
                {
                  name: '宿城区',
                  code: '321302',
                  children: [],
                },
                {
                  name: '宿豫区',
                  code: '321311',
                  children: [],
                },
                {
                  name: '沭阳县',
                  code: '321322',
                  children: [],
                },
                {
                  name: '泗阳县',
                  code: '321323',
                  children: [],
                },
                {
                  name: '泗洪县',
                  code: '321324',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: '浙江省',
          code: '330000',
          children: [
            {
              name: '杭州市',
              code: '330100',
              children: [
                {
                  name: '上城区',
                  code: '330102',
                  children: [],
                },
                {
                  name: '下城区',
                  code: '330103',
                  children: [],
                },
                {
                  name: '江干区',
                  code: '330104',
                  children: [],
                },
                {
                  name: '拱墅区',
                  code: '330105',
                  children: [],
                },
                {
                  name: '西湖区',
                  code: '330106',
                  children: [],
                },
                {
                  name: '滨江区',
                  code: '330108',
                  children: [],
                },
                {
                  name: '萧山区',
                  code: '330109',
                  children: [],
                },
                {
                  name: '余杭区',
                  code: '330110',
                  children: [],
                },
                {
                  name: '富阳区',
                  code: '330111',
                  children: [],
                },
                {
                  name: '临安区',
                  code: '330112',
                  children: [],
                },
                {
                  name: '桐庐县',
                  code: '330122',
                  children: [],
                },
                {
                  name: '淳安县',
                  code: '330127',
                  children: [],
                },
                {
                  name: '建德市',
                  code: '330182',
                  children: [],
                },
              ],
            },
            {
              name: '宁波市',
              code: '330200',
              children: [
                {
                  name: '海曙区',
                  code: '330203',
                  children: [],
                },
                {
                  name: '江北区',
                  code: '330205',
                  children: [],
                },
                {
                  name: '北仑区',
                  code: '330206',
                  children: [],
                },
                {
                  name: '镇海区',
                  code: '330211',
                  children: [],
                },
                {
                  name: '鄞州区',
                  code: '330212',
                  children: [],
                },
                {
                  name: '奉化区',
                  code: '330213',
                  children: [],
                },
                {
                  name: '象山县',
                  code: '330225',
                  children: [],
                },
                {
                  name: '宁海县',
                  code: '330226',
                  children: [],
                },
                {
                  name: '余姚市',
                  code: '330281',
                  children: [],
                },
                {
                  name: '慈溪市',
                  code: '330282',
                  children: [],
                },
              ],
            },
            {
              name: '温州市',
              code: '330300',
              children: [
                {
                  name: '鹿城区',
                  code: '330302',
                  children: [],
                },
                {
                  name: '龙湾区',
                  code: '330303',
                  children: [],
                },
                {
                  name: '瓯海区',
                  code: '330304',
                  children: [],
                },
                {
                  name: '洞头区',
                  code: '330305',
                  children: [],
                },
                {
                  name: '永嘉县',
                  code: '330324',
                  children: [],
                },
                {
                  name: '平阳县',
                  code: '330326',
                  children: [],
                },
                {
                  name: '苍南县',
                  code: '330327',
                  children: [],
                },
                {
                  name: '文成县',
                  code: '330328',
                  children: [],
                },
                {
                  name: '泰顺县',
                  code: '330329',
                  children: [],
                },
                {
                  name: '瑞安市',
                  code: '330381',
                  children: [],
                },
                {
                  name: '乐清市',
                  code: '330382',
                  children: [],
                },
                {
                  name: '龙港市',
                  code: '330383',
                  children: [],
                },
              ],
            },
            {
              name: '嘉兴市',
              code: '330400',
              children: [
                {
                  name: '南湖区',
                  code: '330402',
                  children: [],
                },
                {
                  name: '秀洲区',
                  code: '330411',
                  children: [],
                },
                {
                  name: '嘉善县',
                  code: '330421',
                  children: [],
                },
                {
                  name: '海盐县',
                  code: '330424',
                  children: [],
                },
                {
                  name: '海宁市',
                  code: '330481',
                  children: [],
                },
                {
                  name: '平湖市',
                  code: '330482',
                  children: [],
                },
                {
                  name: '桐乡市',
                  code: '330483',
                  children: [],
                },
              ],
            },
            {
              name: '湖州市',
              code: '330500',
              children: [
                {
                  name: '吴兴区',
                  code: '330502',
                  children: [],
                },
                {
                  name: '南浔区',
                  code: '330503',
                  children: [],
                },
                {
                  name: '德清县',
                  code: '330521',
                  children: [],
                },
                {
                  name: '长兴县',
                  code: '330522',
                  children: [],
                },
                {
                  name: '安吉县',
                  code: '330523',
                  children: [],
                },
              ],
            },
            {
              name: '绍兴市',
              code: '330600',
              children: [
                {
                  name: '越城区',
                  code: '330602',
                  children: [],
                },
                {
                  name: '柯桥区',
                  code: '330603',
                  children: [],
                },
                {
                  name: '上虞区',
                  code: '330604',
                  children: [],
                },
                {
                  name: '新昌县',
                  code: '330624',
                  children: [],
                },
                {
                  name: '诸暨市',
                  code: '330681',
                  children: [],
                },
                {
                  name: '嵊州市',
                  code: '330683',
                  children: [],
                },
              ],
            },
            {
              name: '金华市',
              code: '330700',
              children: [
                {
                  name: '婺城区',
                  code: '330702',
                  children: [],
                },
                {
                  name: '金东区',
                  code: '330703',
                  children: [],
                },
                {
                  name: '武义县',
                  code: '330723',
                  children: [],
                },
                {
                  name: '浦江县',
                  code: '330726',
                  children: [],
                },
                {
                  name: '磐安县',
                  code: '330727',
                  children: [],
                },
                {
                  name: '兰溪市',
                  code: '330781',
                  children: [],
                },
                {
                  name: '义乌市',
                  code: '330782',
                  children: [],
                },
                {
                  name: '东阳市',
                  code: '330783',
                  children: [],
                },
                {
                  name: '永康市',
                  code: '330784',
                  children: [],
                },
              ],
            },
            {
              name: '衢州市',
              code: '330800',
              children: [
                {
                  name: '柯城区',
                  code: '330802',
                  children: [],
                },
                {
                  name: '衢江区',
                  code: '330803',
                  children: [],
                },
                {
                  name: '常山县',
                  code: '330822',
                  children: [],
                },
                {
                  name: '开化县',
                  code: '330824',
                  children: [],
                },
                {
                  name: '龙游县',
                  code: '330825',
                  children: [],
                },
                {
                  name: '江山市',
                  code: '330881',
                  children: [],
                },
              ],
            },
            {
              name: '舟山市',
              code: '330900',
              children: [
                {
                  name: '定海区',
                  code: '330902',
                  children: [],
                },
                {
                  name: '普陀区',
                  code: '330903',
                  children: [],
                },
                {
                  name: '岱山县',
                  code: '330921',
                  children: [],
                },
                {
                  name: '嵊泗县',
                  code: '330922',
                  children: [],
                },
              ],
            },
            {
              name: '台州市',
              code: '331000',
              children: [
                {
                  name: '椒江区',
                  code: '331002',
                  children: [],
                },
                {
                  name: '黄岩区',
                  code: '331003',
                  children: [],
                },
                {
                  name: '路桥区',
                  code: '331004',
                  children: [],
                },
                {
                  name: '三门县',
                  code: '331022',
                  children: [],
                },
                {
                  name: '天台县',
                  code: '331023',
                  children: [],
                },
                {
                  name: '仙居县',
                  code: '331024',
                  children: [],
                },
                {
                  name: '温岭市',
                  code: '331081',
                  children: [],
                },
                {
                  name: '临海市',
                  code: '331082',
                  children: [],
                },
                {
                  name: '玉环市',
                  code: '331083',
                  children: [],
                },
              ],
            },
            {
              name: '丽水市',
              code: '331100',
              children: [
                {
                  name: '莲都区',
                  code: '331102',
                  children: [],
                },
                {
                  name: '青田县',
                  code: '331121',
                  children: [],
                },
                {
                  name: '缙云县',
                  code: '331122',
                  children: [],
                },
                {
                  name: '遂昌县',
                  code: '331123',
                  children: [],
                },
                {
                  name: '松阳县',
                  code: '331124',
                  children: [],
                },
                {
                  name: '云和县',
                  code: '331125',
                  children: [],
                },
                {
                  name: '庆元县',
                  code: '331126',
                  children: [],
                },
                {
                  name: '景宁畲族自治县',
                  code: '331127',
                  children: [],
                },
                {
                  name: '龙泉市',
                  code: '331181',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: '安徽省',
          code: '340000',
          children: [
            {
              name: '合肥市',
              code: '340100',
              children: [
                {
                  name: '瑶海区',
                  code: '340102',
                  children: [],
                },
                {
                  name: '庐阳区',
                  code: '340103',
                  children: [],
                },
                {
                  name: '蜀山区',
                  code: '340104',
                  children: [],
                },
                {
                  name: '包河区',
                  code: '340111',
                  children: [],
                },
                {
                  name: '长丰县',
                  code: '340121',
                  children: [],
                },
                {
                  name: '肥东县',
                  code: '340122',
                  children: [],
                },
                {
                  name: '肥西县',
                  code: '340123',
                  children: [],
                },
                {
                  name: '庐江县',
                  code: '340124',
                  children: [],
                },
                {
                  name: '巢湖市',
                  code: '340181',
                  children: [],
                },
              ],
            },
            {
              name: '芜湖市',
              code: '340200',
              children: [
                {
                  name: '镜湖区',
                  code: '340202',
                  children: [],
                },
                {
                  name: '弋江区',
                  code: '340203',
                  children: [],
                },
                {
                  name: '鸠江区',
                  code: '340207',
                  children: [],
                },
                {
                  name: '三山区',
                  code: '340208',
                  children: [],
                },
                {
                  name: '芜湖县',
                  code: '340221',
                  children: [],
                },
                {
                  name: '繁昌县',
                  code: '340222',
                  children: [],
                },
                {
                  name: '南陵县',
                  code: '340223',
                  children: [],
                },
                {
                  name: '无为县',
                  code: '340225',
                  children: [],
                },
              ],
            },
            {
              name: '蚌埠市',
              code: '340300',
              children: [
                {
                  name: '龙子湖区',
                  code: '340302',
                  children: [],
                },
                {
                  name: '蚌山区',
                  code: '340303',
                  children: [],
                },
                {
                  name: '禹会区',
                  code: '340304',
                  children: [],
                },
                {
                  name: '淮上区',
                  code: '340311',
                  children: [],
                },
                {
                  name: '怀远县',
                  code: '340321',
                  children: [],
                },
                {
                  name: '五河县',
                  code: '340322',
                  children: [],
                },
                {
                  name: '固镇县',
                  code: '340323',
                  children: [],
                },
              ],
            },
            {
              name: '淮南市',
              code: '340400',
              children: [
                {
                  name: '大通区',
                  code: '340402',
                  children: [],
                },
                {
                  name: '田家庵区',
                  code: '340403',
                  children: [],
                },
                {
                  name: '谢家集区',
                  code: '340404',
                  children: [],
                },
                {
                  name: '八公山区',
                  code: '340405',
                  children: [],
                },
                {
                  name: '潘集区',
                  code: '340406',
                  children: [],
                },
                {
                  name: '凤台县',
                  code: '340421',
                  children: [],
                },
                {
                  name: '寿县',
                  code: '340422',
                  children: [],
                },
              ],
            },
            {
              name: '马鞍山市',
              code: '340500',
              children: [
                {
                  name: '花山区',
                  code: '340503',
                  children: [],
                },
                {
                  name: '雨山区',
                  code: '340504',
                  children: [],
                },
                {
                  name: '博望区',
                  code: '340506',
                  children: [],
                },
                {
                  name: '当涂县',
                  code: '340521',
                  children: [],
                },
                {
                  name: '含山县',
                  code: '340522',
                  children: [],
                },
                {
                  name: '和县',
                  code: '340523',
                  children: [],
                },
              ],
            },
            {
              name: '淮北市',
              code: '340600',
              children: [
                {
                  name: '杜集区',
                  code: '340602',
                  children: [],
                },
                {
                  name: '相山区',
                  code: '340603',
                  children: [],
                },
                {
                  name: '烈山区',
                  code: '340604',
                  children: [],
                },
                {
                  name: '濉溪县',
                  code: '340621',
                  children: [],
                },
              ],
            },
            {
              name: '铜陵市',
              code: '340700',
              children: [
                {
                  name: '铜官区',
                  code: '340705',
                  children: [],
                },
                {
                  name: '义安区',
                  code: '340706',
                  children: [],
                },
                {
                  name: '郊区',
                  code: '340711',
                  children: [],
                },
                {
                  name: '枞阳县',
                  code: '340722',
                  children: [],
                },
              ],
            },
            {
              name: '安庆市',
              code: '340800',
              children: [
                {
                  name: '迎江区',
                  code: '340802',
                  children: [],
                },
                {
                  name: '大观区',
                  code: '340803',
                  children: [],
                },
                {
                  name: '宜秀区',
                  code: '340811',
                  children: [],
                },
                {
                  name: '怀宁县',
                  code: '340822',
                  children: [],
                },
                {
                  name: '太湖县',
                  code: '340825',
                  children: [],
                },
                {
                  name: '宿松县',
                  code: '340826',
                  children: [],
                },
                {
                  name: '望江县',
                  code: '340827',
                  children: [],
                },
                {
                  name: '岳西县',
                  code: '340828',
                  children: [],
                },
                {
                  name: '桐城市',
                  code: '340881',
                  children: [],
                },
                {
                  name: '潜山市',
                  code: '340882',
                  children: [],
                },
              ],
            },
            {
              name: '黄山市',
              code: '341000',
              children: [
                {
                  name: '屯溪区',
                  code: '341002',
                  children: [],
                },
                {
                  name: '黄山区',
                  code: '341003',
                  children: [],
                },
                {
                  name: '徽州区',
                  code: '341004',
                  children: [],
                },
                {
                  name: '歙县',
                  code: '341021',
                  children: [],
                },
                {
                  name: '休宁县',
                  code: '341022',
                  children: [],
                },
                {
                  name: '黟县',
                  code: '341023',
                  children: [],
                },
                {
                  name: '祁门县',
                  code: '341024',
                  children: [],
                },
              ],
            },
            {
              name: '滁州市',
              code: '341100',
              children: [
                {
                  name: '琅琊区',
                  code: '341102',
                  children: [],
                },
                {
                  name: '南谯区',
                  code: '341103',
                  children: [],
                },
                {
                  name: '来安县',
                  code: '341122',
                  children: [],
                },
                {
                  name: '全椒县',
                  code: '341124',
                  children: [],
                },
                {
                  name: '定远县',
                  code: '341125',
                  children: [],
                },
                {
                  name: '凤阳县',
                  code: '341126',
                  children: [],
                },
                {
                  name: '天长市',
                  code: '341181',
                  children: [],
                },
                {
                  name: '明光市',
                  code: '341182',
                  children: [],
                },
              ],
            },
            {
              name: '阜阳市',
              code: '341200',
              children: [
                {
                  name: '颍州区',
                  code: '341202',
                  children: [],
                },
                {
                  name: '颍东区',
                  code: '341203',
                  children: [],
                },
                {
                  name: '颍泉区',
                  code: '341204',
                  children: [],
                },
                {
                  name: '临泉县',
                  code: '341221',
                  children: [],
                },
                {
                  name: '太和县',
                  code: '341222',
                  children: [],
                },
                {
                  name: '阜南县',
                  code: '341225',
                  children: [],
                },
                {
                  name: '颍上县',
                  code: '341226',
                  children: [],
                },
                {
                  name: '界首市',
                  code: '341282',
                  children: [],
                },
              ],
            },
            {
              name: '宿州市',
              code: '341300',
              children: [
                {
                  name: '埇桥区',
                  code: '341302',
                  children: [],
                },
                {
                  name: '砀山县',
                  code: '341321',
                  children: [],
                },
                {
                  name: '萧县',
                  code: '341322',
                  children: [],
                },
                {
                  name: '灵璧县',
                  code: '341323',
                  children: [],
                },
                {
                  name: '泗县',
                  code: '341324',
                  children: [],
                },
              ],
            },
            {
              name: '六安市',
              code: '341500',
              children: [
                {
                  name: '金安区',
                  code: '341502',
                  children: [],
                },
                {
                  name: '裕安区',
                  code: '341503',
                  children: [],
                },
                {
                  name: '叶集区',
                  code: '341504',
                  children: [],
                },
                {
                  name: '霍邱县',
                  code: '341522',
                  children: [],
                },
                {
                  name: '舒城县',
                  code: '341523',
                  children: [],
                },
                {
                  name: '金寨县',
                  code: '341524',
                  children: [],
                },
                {
                  name: '霍山县',
                  code: '341525',
                  children: [],
                },
              ],
            },
            {
              name: '亳州市',
              code: '341600',
              children: [
                {
                  name: '谯城区',
                  code: '341602',
                  children: [],
                },
                {
                  name: '涡阳县',
                  code: '341621',
                  children: [],
                },
                {
                  name: '蒙城县',
                  code: '341622',
                  children: [],
                },
                {
                  name: '利辛县',
                  code: '341623',
                  children: [],
                },
              ],
            },
            {
              name: '池州市',
              code: '341700',
              children: [
                {
                  name: '贵池区',
                  code: '341702',
                  children: [],
                },
                {
                  name: '东至县',
                  code: '341721',
                  children: [],
                },
                {
                  name: '石台县',
                  code: '341722',
                  children: [],
                },
                {
                  name: '青阳县',
                  code: '341723',
                  children: [],
                },
              ],
            },
            {
              name: '宣城市',
              code: '341800',
              children: [
                {
                  name: '宣州区',
                  code: '341802',
                  children: [],
                },
                {
                  name: '郎溪县',
                  code: '341821',
                  children: [],
                },
                {
                  name: '泾县',
                  code: '341823',
                  children: [],
                },
                {
                  name: '绩溪县',
                  code: '341824',
                  children: [],
                },
                {
                  name: '旌德县',
                  code: '341825',
                  children: [],
                },
                {
                  name: '宁国市',
                  code: '341881',
                  children: [],
                },
                {
                  name: '广德市',
                  code: '341882',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: '福建省',
          code: '350000',
          children: [
            {
              name: '福州市',
              code: '350100',
              children: [
                {
                  name: '鼓楼区',
                  code: '350102',
                  children: [],
                },
                {
                  name: '台江区',
                  code: '350103',
                  children: [],
                },
                {
                  name: '仓山区',
                  code: '350104',
                  children: [],
                },
                {
                  name: '马尾区',
                  code: '350105',
                  children: [],
                },
                {
                  name: '晋安区',
                  code: '350111',
                  children: [],
                },
                {
                  name: '长乐区',
                  code: '350112',
                  children: [],
                },
                {
                  name: '闽侯县',
                  code: '350121',
                  children: [],
                },
                {
                  name: '连江县',
                  code: '350122',
                  children: [],
                },
                {
                  name: '罗源县',
                  code: '350123',
                  children: [],
                },
                {
                  name: '闽清县',
                  code: '350124',
                  children: [],
                },
                {
                  name: '永泰县',
                  code: '350125',
                  children: [],
                },
                {
                  name: '平潭县',
                  code: '350128',
                  children: [],
                },
                {
                  name: '福清市',
                  code: '350181',
                  children: [],
                },
              ],
            },
            {
              name: '厦门市',
              code: '350200',
              children: [
                {
                  name: '思明区',
                  code: '350203',
                  children: [],
                },
                {
                  name: '海沧区',
                  code: '350205',
                  children: [],
                },
                {
                  name: '湖里区',
                  code: '350206',
                  children: [],
                },
                {
                  name: '集美区',
                  code: '350211',
                  children: [],
                },
                {
                  name: '同安区',
                  code: '350212',
                  children: [],
                },
                {
                  name: '翔安区',
                  code: '350213',
                  children: [],
                },
              ],
            },
            {
              name: '莆田市',
              code: '350300',
              children: [
                {
                  name: '城厢区',
                  code: '350302',
                  children: [],
                },
                {
                  name: '涵江区',
                  code: '350303',
                  children: [],
                },
                {
                  name: '荔城区',
                  code: '350304',
                  children: [],
                },
                {
                  name: '秀屿区',
                  code: '350305',
                  children: [],
                },
                {
                  name: '仙游县',
                  code: '350322',
                  children: [],
                },
              ],
            },
            {
              name: '三明市',
              code: '350400',
              children: [
                {
                  name: '梅列区',
                  code: '350402',
                  children: [],
                },
                {
                  name: '三元区',
                  code: '350403',
                  children: [],
                },
                {
                  name: '明溪县',
                  code: '350421',
                  children: [],
                },
                {
                  name: '清流县',
                  code: '350423',
                  children: [],
                },
                {
                  name: '宁化县',
                  code: '350424',
                  children: [],
                },
                {
                  name: '大田县',
                  code: '350425',
                  children: [],
                },
                {
                  name: '尤溪县',
                  code: '350426',
                  children: [],
                },
                {
                  name: '沙县',
                  code: '350427',
                  children: [],
                },
                {
                  name: '将乐县',
                  code: '350428',
                  children: [],
                },
                {
                  name: '泰宁县',
                  code: '350429',
                  children: [],
                },
                {
                  name: '建宁县',
                  code: '350430',
                  children: [],
                },
                {
                  name: '永安市',
                  code: '350481',
                  children: [],
                },
              ],
            },
            {
              name: '泉州市',
              code: '350500',
              children: [
                {
                  name: '鲤城区',
                  code: '350502',
                  children: [],
                },
                {
                  name: '丰泽区',
                  code: '350503',
                  children: [],
                },
                {
                  name: '洛江区',
                  code: '350504',
                  children: [],
                },
                {
                  name: '泉港区',
                  code: '350505',
                  children: [],
                },
                {
                  name: '惠安县',
                  code: '350521',
                  children: [],
                },
                {
                  name: '安溪县',
                  code: '350524',
                  children: [],
                },
                {
                  name: '永春县',
                  code: '350525',
                  children: [],
                },
                {
                  name: '德化县',
                  code: '350526',
                  children: [],
                },
                {
                  name: '金门县',
                  code: '350527',
                  children: [],
                },
                {
                  name: '石狮市',
                  code: '350581',
                  children: [],
                },
                {
                  name: '晋江市',
                  code: '350582',
                  children: [],
                },
                {
                  name: '南安市',
                  code: '350583',
                  children: [],
                },
              ],
            },
            {
              name: '漳州市',
              code: '350600',
              children: [
                {
                  name: '芗城区',
                  code: '350602',
                  children: [],
                },
                {
                  name: '龙文区',
                  code: '350603',
                  children: [],
                },
                {
                  name: '云霄县',
                  code: '350622',
                  children: [],
                },
                {
                  name: '漳浦县',
                  code: '350623',
                  children: [],
                },
                {
                  name: '诏安县',
                  code: '350624',
                  children: [],
                },
                {
                  name: '长泰县',
                  code: '350625',
                  children: [],
                },
                {
                  name: '东山县',
                  code: '350626',
                  children: [],
                },
                {
                  name: '南靖县',
                  code: '350627',
                  children: [],
                },
                {
                  name: '平和县',
                  code: '350628',
                  children: [],
                },
                {
                  name: '华安县',
                  code: '350629',
                  children: [],
                },
                {
                  name: '龙海市',
                  code: '350681',
                  children: [],
                },
              ],
            },
            {
              name: '南平市',
              code: '350700',
              children: [
                {
                  name: '延平区',
                  code: '350702',
                  children: [],
                },
                {
                  name: '建阳区',
                  code: '350703',
                  children: [],
                },
                {
                  name: '顺昌县',
                  code: '350721',
                  children: [],
                },
                {
                  name: '浦城县',
                  code: '350722',
                  children: [],
                },
                {
                  name: '光泽县',
                  code: '350723',
                  children: [],
                },
                {
                  name: '松溪县',
                  code: '350724',
                  children: [],
                },
                {
                  name: '政和县',
                  code: '350725',
                  children: [],
                },
                {
                  name: '邵武市',
                  code: '350781',
                  children: [],
                },
                {
                  name: '武夷山市',
                  code: '350782',
                  children: [],
                },
                {
                  name: '建瓯市',
                  code: '350783',
                  children: [],
                },
              ],
            },
            {
              name: '龙岩市',
              code: '350800',
              children: [
                {
                  name: '新罗区',
                  code: '350802',
                  children: [],
                },
                {
                  name: '永定区',
                  code: '350803',
                  children: [],
                },
                {
                  name: '长汀县',
                  code: '350821',
                  children: [],
                },
                {
                  name: '上杭县',
                  code: '350823',
                  children: [],
                },
                {
                  name: '武平县',
                  code: '350824',
                  children: [],
                },
                {
                  name: '连城县',
                  code: '350825',
                  children: [],
                },
                {
                  name: '漳平市',
                  code: '350881',
                  children: [],
                },
              ],
            },
            {
              name: '宁德市',
              code: '350900',
              children: [
                {
                  name: '蕉城区',
                  code: '350902',
                  children: [],
                },
                {
                  name: '霞浦县',
                  code: '350921',
                  children: [],
                },
                {
                  name: '古田县',
                  code: '350922',
                  children: [],
                },
                {
                  name: '屏南县',
                  code: '350923',
                  children: [],
                },
                {
                  name: '寿宁县',
                  code: '350924',
                  children: [],
                },
                {
                  name: '周宁县',
                  code: '350925',
                  children: [],
                },
                {
                  name: '柘荣县',
                  code: '350926',
                  children: [],
                },
                {
                  name: '福安市',
                  code: '350981',
                  children: [],
                },
                {
                  name: '福鼎市',
                  code: '350982',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
        valueMember: 'code'
      })
    }, 0)
  }

  render() {
    return (
      <PickerView
        value={this.state.value}
        valueMember="code"
        itemRender={(item) => item.name}
        dataSource={this.state.dataSource}
        onChange={selected => {
          this.setState({
            value: selected.map(item => item.code),
          });
          console.log('PickerView onChange: ', selected);
        }}
      />
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```



## API

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| dataSource | DataSource<T = { label: string; value: string \| number \| boolean }> = Array<T & { children?: DataSource<T> }> | [] | 数据源 |
| value | string \| number \| boolean \| Array<string &#124; number &#124; boolean> | - | 值 |
| defaultValue | string \| number \| boolean \| Array<string &#124; number &#124; boolean> | - | 初始值 |
| wheelDefaultValue | string \| number \| boolean \| Array<string &#124; number &#124; boolean> | - | 滚轮初始停留的位置 |
| valueMember | string | 'value' | 值字段对应的key 
| itemRender | (data?: { [key: string]: string &#124; number &#124; boolean }) => string | (data) => data.label | 单个选项的展示 |
| disabled | boolean | false | 是否禁用 |
| cols | number | Infinity | 级联选择器的级数 |
| onChange | (selected?: Array<{ [key: string]: string &#124; number &#124; boolean }>) => void | - | 值变化时触发的回调函数 |

### 仅 Picker & Select 支持的属性
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title | string | '请选择' | 选择器标题 |
| okText | string | '确定' | 确定栏文字 |
| cancelText | string | '取消' | 取消栏文字 |
| maskClosable | boolean | true | 是否点击遮罩层时关闭，需要和onCancel一起使用 |
| destroy | boolean | false | 弹层关闭后是否移除节点 |
| onOk | (selected?: Array<{ [key: string]: string &#124; number &#124; boolean }>) => void | - | 点击确定时触发的回调函数 |
| onCancel | () => void | - | 点击取消时触发的回调函数 |
| mountContainer | HTMLElement &#124; () => HTMLElement | document.body | 指定 Picker 挂载的 HTML 节点 |


### 仅 Picker 支持的属性
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| visible | boolean | false | 是否展示 |

### 仅 Select 支持的属性
| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| placeholder | string | '请选择' | 输入提示信息 |
| hasArrow | boolean | true | 是否显示箭头 |
| displayRender | (selected?: Array<{ [key: string]: string &#124; number &#124; boolean }>) => string | selected => selected.map(item => item.label) | 所选值的展示 |
