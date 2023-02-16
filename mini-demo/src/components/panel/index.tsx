import { View } from '@tarojs/components';
import React from 'react';

import './index.scss';

function Panel(props: { title: string | React.ReactNode; children: React.ReactNode; className: string }) {
  const { className = '', title, children } = props;
  return (
    <View className={`panel ${className}`}>
      <View className='panel-title'>{title}</View>
      <View className='panel-content'>
        {children}
      </View>
    </View>
  )
}

export default Panel;