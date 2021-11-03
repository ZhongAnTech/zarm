/**
 * 设置选择前的方法，获取选择文件的相关信息。
 *
 * multiple: 默认为 false，设置为 true 之后一次可以选择多张，onChange 事件调用之后返回一个数组，
 *           不设置或者设置为 false，onChange 事件调用之后返回一个对象
 * disabled: 传递之后不可以点击上传，整个选择组件会设置为半透明状态，透明度为 0.5
 * maximum: 允许选择几张图片，默认为 5
 * accept: 设置选择的文件类型，默认为图片，参数有 'images/* | Photos | Videos | All'
 * onChange: () => { file, fileType, fileSize, fileName, thumbnail }
 * onBeforeSelect: () => boolean，返回 false 的时候阻止后续的选择事件
 */
import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal } from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

import NavBar from '../nav-bar/index.native';

import type { BaseFilePickerProps } from './interface';
import filePickerStyle from './style/index.native';

export interface FilePickerProps extends BaseFilePickerProps {
  styles?: typeof filePickerStyle;
  maximum?: number;
}

const filePickerStyles = StyleSheet.create<any>(filePickerStyle);

const cameraRollOptions = {
  scrollRenderAheadDistance: 500,
  initialListSize: 1,
  pageSize: 3,
  removeClippedSubviews: false,
  groupTypes: 'All',
  batchSize: 1000,
  maximum: 5,
  imagesPerRow: 5,
  imageMargin: 5,
};

export default class FilePicker extends PureComponent<FilePickerProps, any> {
  static defaultProps = {
    accept: 'images/*',
    disabled: false,
    multiple: false,
    styles: filePickerStyles,
    onBeforeSelect: () => true,
  };

  state = {
    isShowRoll: false,
    imageList: [],
    selectedImages: [],
  };

  getFileInfo = (file) => {
    const fileType = file && file.filename.substr(file.filename.lastIndexOf('.') + 1);
    const thumbnail = file && file.uri;

    return {
      ...file,
      fileType,
      thumbnail,
    };
  };

  handleShowCameraRoll = () => {
    const { disabled, onBeforeSelect } = this.props;

    if (onBeforeSelect!() === false || disabled) {
      return;
    }

    this.setState(({ isShowRoll }) => ({
      isShowRoll: !isShowRoll,
      selectedImages: [],
      imageList: [],
    }));
  };

  getSelectedImages = (images) => {
    const { multiple, onChange } = this.props;

    if (!images.length) {
      return;
    }

    if (multiple) {
      const data = images.map((item) => this.getFileInfo(item));

      this.setState({
        imageList: data,
        selectedImages: images,
      });
    } else {
      const data = this.getFileInfo(images[0]);

      typeof onChange === 'function' && onChange(data);

      this.handleShowCameraRoll();
    }

    // this.setState({
    //   num: images.length,
    // });
  };

  handleConfirm = () => {
    const { onChange } = this.props;

    typeof onChange === 'function' && onChange(this.state.imageList);
    this.handleShowCameraRoll();
  };

  render() {
    const {
      disabled,
      styles,
      // multiple,
      children,
      accept,
      maximum,
    } = this.props;

    const { isShowRoll, selectedImages } = this.state;

    const assetType = accept!.indexOf('image') > -1 ? 'Photos' : accept;

    const content = disabled ? (
      <View>{children}</View>
    ) : (
      <TouchableOpacity onPress={this.handleShowCameraRoll}>{children}</TouchableOpacity>
    );

    const cameraRollPicker = (
      <Modal
        visible={isShowRoll}
        animationType="slide"
        transparent={false}
        onRequestClose={() => {}}
      >
        <View style={{ flex: 1 }}>
          <NavBar />

          <CameraRollPicker
            {...cameraRollOptions}
            assetType={assetType}
            maximum={maximum}
            selected={selectedImages}
            callback={this.getSelectedImages}
          />
        </View>
      </Modal>
    );

    return (
      <View style={disabled && styles!.disabledWrapper}>
        {content}

        {cameraRollPicker}
      </View>
    );
  }
}
