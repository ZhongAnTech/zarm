import React from 'react';
import { View } from '@tarojs/components';
import { List, Panel } from 'zarm/mini';

// import { SuccessCircle, CloseCircle } from '@zarm-design/icons';

import './index.scss'

const img = 'https://static.zhongan.com/website/health/zarm/images/icons/state.png';

function ListDemo() {
  return (
   <View className='button-demo'>
     <Panel
       title='基本用法'
     >
      <List>
        <List.Item title="Item 1" />
        <List.Item title="Item 2" />
        <List.Item title="Item 3" />
      </List>
     </Panel>
     <Panel
       title='可点击'
     >
       <List>
        <List.Item hasArrow title="Item 1" onClick={() => {}} />
        <List.Item hasArrow title="Item 2" onClick={() => {}} />
        <List.Item hasArrow title="Item 3" onClick={() => {}} />
      </List>
     </Panel>
     <Panel
       title='带尾部信息'
     >
       <>
       <List>
        <List.Item hasArrow title="Item 1" suffix="more" onClick={() => {}} />
        <List.Item
          hasArrow
          title="Item 2"
          // suffix={<Badge shape="circle" text={3} />}
          onClick={() => {}}
        />
        {/* <List.Item
          title="Item 3"
          suffix={
            <Icon type="add" theme="primary" onClick={() => window.alert('You clicked the icon')} />
          }
        /> */}
        {/* <List.Item title="Item 4" suffix={<Switch />} /> */}
      </List>
       </>
     </Panel>
     <Panel
       title='按带描述信息'
     >
       <List>
        <List.Item title="React" description="A JavaScript library for building user interfaces" />
        <List.Item
          hasArrow
          title="Zarm"
          description="Pursue the ultimate user experience and build a component library with warmth"
          onClick={() => {}}
        />
      </List>
     </Panel>
     <Panel
       title='带图标的 '
     >
       <List>
          {/* <List.Item
            hasArrow
            prefix={<Icon type="broadcast" theme="primary" style={{ fontSize: 24 }} />}
            title="Vue"
            onClick={() => {}}
          /> */}
          <List.Item
            hasArrow
            prefix={<img alt="" src={img} style={{ width: 28, height: 28 }} />}
            title="React"
            description="A JavaScript library for building user interfaces"
            onClick={() => {}}
          />
          <List.Item
            hasArrow
            prefix={<img alt="" src={img} style={{ width: 48, height: 48 }} />}
            title="Zarm"
            description="Pursue the ultimate user experience and build a component library with warmth"
            suffix="more"
            onClick={() => {}}
          />
        </List>

     </Panel>
     <Panel title="无边框">
      <List bordered={false}>
        <List.Item hasArrow title="Item 1" onClick={() => {}} />
        <List.Item hasArrow title="Item 2" onClick={() => {}} />
        <List.Item hasArrow title="Item 3" onClick={() => {}} />
      </List>
     </Panel>
     <Panel
       title='结构说明'
     >
       <List>
        <List.Item
          hasArrow
          prefix="prefix"
          title="title"
          description="description"
          suffix="suffix"
          onClick={() => {}}
        >
          children
        </List.Item>
      </List>
     </Panel>
     {/* <Panel
       title='加载状态'
     >
       <Button loading>loading</Button>
       <Button loading theme='primary'>
         loading
       </Button>
       <Button loading disabled theme='primary'>
         disabled
       </Button>
     </Panel> */}
   </View>
  )
 }

 export default ListDemo;