import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro';
import siteMap from '../../site';
import Panel from '../../components/panel';

import './index.scss'


function Index () {
  const renderDemo = () => {
    const keys = Object.keys(siteMap);
    return keys.map((key) => {
      return  (<Panel title={`${siteMap[key].title} (${siteMap[key].components.length})`} key={key}>
        <View>
          {
            siteMap[key].components.map((c) => {
              return (<View className='list-item' key={c.key} onClick={() => Taro.navigateTo({ url: c.page })}> <View className="list-item__content">{c.key}<Text className='zh'>{c.name}</Text></View></View>)
            })
          }
        </View>
      </Panel>)
    })
  }
  return (
    <View className='page'>
      <View className='brand'>
        <View className='brand-title'>Zarm</View>
        <View className='brand-description'>众安小程序组件库</View>
      </View>
      <View className='main'>
       {
         renderDemo()
       }
      </View>
    </View>
  )
}

export default Index;
