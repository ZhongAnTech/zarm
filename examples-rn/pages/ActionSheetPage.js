import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ActionSheet } from '../../components/index.native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  mb: {
    marginBottom: 10,
  },
  mr: {
    marginRight: 10,
  },
  inline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default class Page extends PureComponent {
  state = {
    visibleSimple: false,
    visibleWithCancel: false,
    visibleShapeRadius: false,
    actions: [
      { text: '操作一', onClick() { alert('choose 操作一'); } },
      { text: '操作二', onClick() { alert('choose 操作二'); }, theme: 'primary' },
      { text: '操作三', onClick() { alert('choose 操作三'); }, theme: 'danger' },
    ],
  };

  onOpen = (type) => {
    this.setState({ [type]: true });
  };

  onClose = (type) => {
    // alert(123);
    this.setState({ [type]: false });
  };

  render() {
    const {
      visibleSimple,
      visibleWithCancel,
      visibleShapeRadius,
      actions,
    } = this.state;

    return (
      <View style={styles.container}>
        <Button style={styles.mb} theme="primary" onClick={() => this.onOpen('visibleSimple')}>普通</Button>
        <Button style={styles.mb} theme="primary" onClick={() => this.onOpen('visibleWithCancel')}>带取消操作</Button>
        <Button style={styles.mb} theme="primary" onClick={() => this.onOpen('visibleShapeRadius')}>圆角、留边</Button>

        <ActionSheet
          visible={visibleSimple}
          actions={actions}
          onMaskClick={() => this.onClose('visibleSimple')}
        />

        <ActionSheet
          visible={visibleWithCancel}
          actions={actions}
          onMaskClick={() => this.onClose('visibleWithCancel')}
          onCancel={() => this.onClose('visibleWithCancel')}
          cancelText="取消"
        />

        <ActionSheet
          visible={visibleShapeRadius}
          actions={actions}
          onMaskClick={() => this.onClose('visibleShapeRadius')}
          onCancel={() => this.onClose('visibleShapeRadius')}
          cancelText="取消"
          spacing
        />
      </View>
    );
  }
}
