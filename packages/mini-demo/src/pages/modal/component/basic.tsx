import React, { useReducer } from 'react';
import { Modal, List, Button, Panel } from 'zarm/mini';
import { View } from '@tarojs/components';

/* order: 1 */

const initState = {
  normal: {
    visible: false,
  },
  hasFooter: {
    visible: false,
  },
  closable: {
    visible: false,
  },
  onlyBody: {
    visible: false,
  },
  animation: {
    visible: false,
    animationType: 'fade',
  },
  customContainer: {
    visible: false,
  },
  overlength: {
    visible: false,
  },
};

const reducer = (state, action) => {
  const { type, key, animationType } = action;

  switch (type) {
    case 'visible':
      return {
        ...state,
        [key]: {
          ...state[key],
          visible: !state[key].visible,
        },
      };

    case 'animation':
      return {
        ...state,
        [key]: {
          ...state[key],
          animationType,
        },
      };

    default:
  }
};

const Demo = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const toggle = (key) => dispatch({ type: 'visible', key });

  return (
    <Panel title="基础用法">
      <List>
        <List.Item
          title="普通"
          suffix={
            <Button size="xs" onClick={() => toggle('normal')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="自定义底部"
          suffix={
            <Button size="xs" onClick={() => toggle('hasFooter')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="遮罩层可关闭"
          suffix={
            <Button size="xs" onClick={() => toggle('closable')}>
              开启
            </Button>
          }
        />
        <List.Item
          title="无头部，无底部"
          suffix={
            <Button size="xs" onClick={() => toggle('onlyBody')}>
              开启
            </Button>
          }
        />
        {/* <List.Item
          title="动画效果"
          suffix={
            <Button size="xs" onClick={() => toggle('animation')}>
              开启
            </Button>
          }
        > */}
          {/* <Select
            value={state.animation.animationType}
            dataSource={[
              { value: 'fade', label: '淡出淡入效果' },
              { value: 'zoom', label: '缩放效果' },
              { value: 'rotate', label: '旋转效果' },
              { value: 'door', label: '开关门效果' },
              { value: 'flip', label: '翻转效果' },
              { value: 'move-up', label: '向上移入效果' },
              { value: 'move-down', label: '向下移入效果' },
              { value: 'move-left', label: '向左移入效果' },
              { value: 'move-right', label: '向右移入效果' },
              { value: 'slide-up', label: '向上滑入效果' },
              { value: 'slide-down', label: '向下滑入效果' },
              { value: 'slide-left', label: '向左滑入效果' },
              { value: 'slide-right', label: '向右滑入效果' },
            ]}
            itemRender={(data) => data && `${data.label}（${data.value}）`}
            displayRender={(selected) => selected.map((item) => item && item.label)}
            onConfirm={(selected) => {
              dispatch({
                type: 'animation',
                key: 'animation',
                animationType: selected[0],
              });
            }}
          />
        </List.Item> */}
        {/* <List.Item
          suffix={
            <Button size="xs" onClick={() => toggle('customContainer')}>
              开启
            </Button>
          }
        >
          挂载到指定 DOM 节点
        </List.Item> */}
        <List.Item
          suffix={
            <Button size="xs" onClick={() => toggle('overlength')}>
              开启
            </Button>
          }
        >
          超长内容
        </List.Item>
      </List>

      <Modal visible={state.normal.visible} title="标题" closable onClose={() => toggle('normal')}>
        模态框内容
      </Modal>

      <Modal
        title="标题"
        visible={state.hasFooter.visible}
        footer={
          <Button block shape="rect" theme="primary" onClick={() => toggle('hasFooter')}>
            确定
          </Button>
        }
      >
        模态框内容
      </Modal>

      <Modal
        visible={state.closable.visible}
        title="标题"
        maskClosable
        onClose={() => toggle('closable')}
      >
        点击遮罩层关闭
      </Modal>

      <Modal visible={state.onlyBody.visible} maskClosable onClose={() => toggle('onlyBody')}>
        无头部，无底部
      </Modal>

      <Modal
        visible={state.animation.visible}
        animationType={state.animation.animationType}
        maskClosable
        onClose={() => toggle('animation')}
      >
        <View style={{ height: 100 }}>
          当前使用的动画类型animationType：{state.animation.animationType}
        </View>
      </Modal>

      {/* <Modal
        visible={state.customContainer.visible}
        maskClosable
        onClose={() => toggle('customContainer')}
        mountContainer={() => myRef.current}
      >
        挂载到指定dom节点
      </Modal> */}

      <Modal
        visible={state.overlength.visible}
        title="标题"
        closable
        onClose={() => toggle('overlength')}
        maskClosable
      >
        {Array.from(Array(100).fill(0)).map((_, index) => (
          <View key={index}>
            模态框内容
          </View>
        ))}
      </Modal>
    </Panel>
  );
};

export default Demo;