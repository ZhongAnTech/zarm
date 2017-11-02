import React, { Component } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Panel, Uploader, Icon, Toast, Badge } from '../../components';
import '../styles/pages/UploaderPage.scss';

const MAX_FILES_COUNT = 5;

function onBeforeSelect() {
  alert('执行 onBeforeSelect 方法');
}

class UploaderPage extends Component {

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
          const toast = this.state.toast;
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
    toast.children = '图片删除成功';
    this.setState({
      toast,
    });

    this.setState({
      [fileskey]: files,
      toast,
    });
  }

  fileRender(files) {
    return this.state[files].map((item, index) => {
      return (
        <Badge sup className="uploader-item" shape="circle" text={<Icon type="wrong" />} key={+index} onClick={() => this.remove(files, +index)}>
          <div className="uploader-item-img"><a href={item.thumbnail} target="_blank"><img src={item.thumbnail} alt="" /></a></div>
        </Badge>
      );
    });
  }

  render() {
    const {
      toast,
      multiFiles,
    } = this.state;

    return (
      <Container className="uploader-page">
        <Header title="上传组件 Uploader" />

        <main>
          <Panel>
            <Panel.Header title="点击一次选择单张" />
            <Panel.Body>
              <div className="uploader-wrapper">
                {this.fileRender('files')}
                <Uploader
                  className="uploader-btn"
                  accept="image/*"
                  onChange={this.onSelect}>
                  <Icon type="add" />
                </Uploader>
              </div>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="点击一次选择多张" />
            <Panel.Body>
              <div className="uploader-wrapper">
                {this.fileRender('multiFiles')}
                {
                  (multiFiles.length < MAX_FILES_COUNT) && (
                    <Uploader
                      multiple
                      className="uploader-btn"
                      accept="image/*"
                      onBeforeSelect={onBeforeSelect}
                      onChange={this.onSelectMulti}>
                      <Icon type="add" />
                    </Uploader>
                  )
                }
              </div>
            </Panel.Body>
          </Panel>

          <Panel>
            <Panel.Header title="禁用状态" />
            <Panel.Body>
              <div className="uploader-wrapper">
                <Uploader className="uploader-btn" disabled>
                  <Icon type="add" />
                </Uploader>
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

export default UploaderPage;
