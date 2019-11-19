import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { FilePicker } from '../../components/index.native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingTop: 15,
    marginTop: 20,
  },
  pickerItem: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    marginRight: 15,
    width: 74,
    height: 74,
  },
  avatar: {
    width: 72,
    height: 72,
  },
  pickerBtn: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 74,
    height: 74,
  },
  pickerBtnText: {
    color: '#ddd',
  },
});

export default class FilePickerPage extends React.Component {
  state = {
    files: [],
    multiFiles: [],
  };

  onSelect = (file) => {
    console.log('file === ', file);

    const {
      files,
    } = this.state;

    files.push(file);

    this.setState({
      files,
    });
  };

  onSelectMulti = (files) => {
    console.log('multiFiles === ', files);

    let { multiFiles } = this.state;

    multiFiles = multiFiles.concat(files);

    this.setState({
      multiFiles,
    });
  };

  renderImgs = (files) => {
    return this.state[files].map(({ thumbnail }, index) => {
      return (
        <View
          key={+index}
          style={[
            styles.avatar,
            styles.pickerItem,
            { marginBottom: 20 },
          ]}
        >
          <Image
            style={styles.avatar}
            source={{ uri: thumbnail }}
          />
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pickerWrapper}>
          {this.renderImgs('files')}

          <FilePicker onChange={this.onSelect}>
            <View style={[styles.avatar, styles.pickerBtn]}>
              <Text style={styles.pickerBtnText}>点击单选</Text>
            </View>
          </FilePicker>
        </View>

        <View style={styles.pickerWrapper}>
          {this.renderImgs('multiFiles')}

          <FilePicker multiple onChange={this.onSelectMulti}>
            <View style={[styles.avatar, styles.pickerBtn]}>
              <Text style={styles.pickerBtnText}>点击多选</Text>
            </View>
          </FilePicker>
        </View>
      </View>
    );
  }
}
