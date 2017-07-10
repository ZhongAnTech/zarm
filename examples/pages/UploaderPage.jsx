import React, { Component } from 'react';
import Header from '../components/Header';
import { Button, Panel, Uploader, Cell, Icon } from '../../components';

import '../styles/pages/UploaderPage.scss';

const getFileProperties = (data) => {
  const properties = [];

  Object.keys(data).forEach((key) => {
    properties.push(
      <div className="file-wrapper" key={key}>
        {`${key}: ${data[key]}`}
      </div>
    );
  });

  return properties;
};

class UploaderPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      multiFiles: [],
      files: [],
      filesWithToast: [],
      allTypeFiles: {},
    };

    this.handleStartMulti = this.handleStartMulti.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStartWithToast = this.handleStartWithToast.bind(this);
    this.handleAllTypeFiles = this.handleAllTypeFiles.bind(this);
  }

  handleStartMulti(files) {
    let { multiFiles } = this.state;

    multiFiles = multiFiles.concat(files);

    this.setState({
      multiFiles,
    });
  }

  handleStart(file) {
    console.log(file);
    const { files } = this.state;

    files.push(file);

    this.setState({
      files,
    });
  }

  handleStartWithToast(file) {
    const { filesWithToast } = this.state;

    filesWithToast.push(file);

    this.setState({
      filesWithToast,
    });
  }

  handleAllTypeFiles(file) {
    console.log(file);
    this.setState({
      allTypeFiles: file,
    });
  }

  handleBeforeSelect() {
    alert('执行 onBeforeSelect 方法');
  }

  render() {
    const {
      files,
      multiFiles,
      filesWithToast,
      allTypeFiles,
    } = this.state;

    return (
      <div className="uploader-page">
        <Header title="上传图片 Uploader" />

        <main>
          <Panel>
            <Panel.Header>
              <Panel.Title>选择文件</Panel.Title>
            </Panel.Header>

            <Panel.Body>
              <Cell>
                {
                  getFileProperties(allTypeFiles)
                }

                <Uploader onChange={this.handleAllTypeFiles}>
                  <Button bordered shape="radius">点击上传文件获取文件信息</Button>
                </Uploader>
              </Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>点击一次选择一张</Panel.Title>
            </Panel.Header>

            <Panel.Body>
              <Cell>
                {
                  files.map((item, index) => {
                    return (
                      <div className="pic-wrapper" key={+index}>
                        <img src={item.thumbnail} alt="" />
                      </div>
                    );
                  })
                }

                <Uploader
                  onChange={this.handleStart}
                  accept="image/*">
                  <span className="uploader-btn">
                    <Icon type="add" />
                  </span>
                </Uploader>
              </Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>点击一次选择多张</Panel.Title>
            </Panel.Header>

            <Panel.Body>
              <Cell>
                {
                  multiFiles.map((item, index) => {
                    return (
                      <div className="pic-wrapper" key={+index}>
                        <img src={item.thumbnail} alt="" />
                      </div>
                    );
                  })
                }

                <Uploader
                  onChange={this.handleStartMulti}
                  accept="image/*"
                  multiple>
                  <span className="uploader-btn">
                    <Icon type="add" />
                  </span>
                </Uploader>
              </Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>点击选择图片之前有提示</Panel.Title>
            </Panel.Header>

            <Panel.Body>
              <Cell>
                {
                  filesWithToast.map((item, index) => {
                    return (
                      <div className="pic-wrapper" key={+index}>
                        <img src={item.thumbnail} alt="" />
                      </div>
                    );
                  })
                }

                <Uploader
                  onChange={this.handleStartWithToast}
                  onBeforeSelect={this.handleBeforeSelect}
                  accept="image/*">
                  <span className="uploader-btn">
                    <Icon type="add" />
                  </span>
                </Uploader>
              </Cell>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header>
              <Panel.Title>点击毫无反应</Panel.Title>
            </Panel.Header>

            <Panel.Body>
              <Cell>
                <Uploader disabled>
                  <span className="uploader-btn">
                    <Icon type="add" />
                  </span>
                </Uploader>
              </Cell>
            </Panel.Body>
          </Panel>
        </main>
      </div>
    );
  }
}

export default UploaderPage;
