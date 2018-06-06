import React, { Component } from 'react';
import { Panel, FilePicker, Icon, Toast, Badge, Cell } from 'zarm';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/FilePickerPage.scss';

const MAX_FILES_COUNT = 5;

function onBeforeSelect() {
  alert('执行 onBeforeSelect 方法');
}

class FilePickerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiFiles: [],
      files: [],
      filesWithToast: [],
      allTypeFiles: {},
      toast: {
        visible: false,
        onMaskClick: () => {
          const { toast } = this.state;
          toast.visible = false;
          this.setState({ toast });
        },
      },
    };
  }

  onSelectMulti = (files) => {
    console.log(files);
    let { multiFiles } = this.state;
    const { toast } = this.state;

    multiFiles = multiFiles.concat(files);

    if (multiFiles.length > MAX_FILES_COUNT) {
      toast.visible = true;
      toast.children = '最多只能选择5张图片';
      this.setState({
        toast,
      });
      return;
    }

    this.setState({
      multiFiles,
    });
  }

  onSelect = (file) => {
    console.log(file);
    const { files } = this.state;
    files.push(file);

    this.setState({
      files,
    });
  }

  remove(fileskey, index) {
    const files = this.state[fileskey];
    const { toast } = this.state;

    files.splice(index, 1);

    toast.visible = true;
    toast.children = '删除成功';
    this.setState({
      toast,
    });

    this.setState({
      [fileskey]: files,
      toast,
    });
  }

  imgRender(files) {
    return this.state[files].map((item, index) => {
      return (
        <Badge sup className="filepicker-item" shape="circle" text={<Icon type="wrong" />} key={+index} onClick={() => this.remove(files, +index)}>
          <div className="filepicker-item-img"><a href={item.thumbnail} target="_blank" rel="noopener noreferrer"><img src={item.thumbnail} alt="" /></a></div>
        </Badge>
      );
    });
  }

  fileRender(files) {
    return this.state[files].map((item, index) => {
      return (
        <Cell key={+index} description={<Icon type="wrong" theme="error" onClick={() => this.remove(files, +index)} />}>{item.fileName}</Cell>
      );
    });
  }

  render() {
    const {
      toast,
      multiFiles,
    } = this.state;

    return (
      <Container className="filepicker-page">
        <Header title="文件选择器 FilePicker" />

        <main>
          <Panel>
            <Panel.Header title="点击一次选择单个附件" />
            <Panel.Body>
              {this.fileRender('files')}
              <div className="filepicker-wrapper">
                <FilePicker
                  className="filepicker-btn"
                  onChange={this.onSelect}
                >
                  <Icon type="add" />
                </FilePicker>
              </div>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="点击一次选择多张图片" />
            <Panel.Body>
              <div className="filepicker-wrapper">
                {this.imgRender('multiFiles')}
                {
                  (multiFiles.length < MAX_FILES_COUNT) && (
                    <FilePicker
                      multiple
                      className="filepicker-btn"
                      accept="image/*"
                      onBeforeSelect={onBeforeSelect}
                      onChange={this.onSelectMulti}
                    >
                      <Icon type="add" />
                    </FilePicker>
                  )
                }
              </div>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="禁用状态" />
            <Panel.Body>
              <div className="filepicker-wrapper">
                <FilePicker className="filepicker-btn" disabled>
                  <Icon type="add" />
                </FilePicker>
              </div>
            </Panel.Body>
          </Panel>

          <Toast {...toast} />
        </main>
        <Footer />
      </Container>
    );
  }
}

export default FilePickerPage;
