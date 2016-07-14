
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import {
  Button,
  Form,
  Icon,
  Mask,
  Modal,
  Alert,
  Confirm,
  Toast,
  Loading,
  Swipe,
  Cell,
  Picker,
  Selector,
  Switch
} from '../../components';

import '../../styles/index.scss';
import '../styles/pages/Page1.scss';


const addressData = [
  { 
    value: 'bj',
    name : '北京',
    children: [
      {
        value: 'bjs',
        name: '北京市',
        children: [
          {
            value: 'hdq',
            name: '海淀区',
          },
          {
            value: 'xcq',
            name: '西城区',
          },
          {
            value: 'cwq',
            name: '崇文区',
          },
          {
            value: 'dcq',
            name: '东城区',
          },
          {
            value: 'cyq',
            name: '朝阳区',
          }
        ]
      }
    ]
  },
  { 
    value: 'fj',
    name : '福建省',
    children: [
      {
        value: 'sms',
        name: '三明市',
        children: [
          {
            value: 'sx',
            name: '沙县',
          },
          {
            value: 'nh',
            name: '宁化县',
          },
          {
            value: 'tn',
            name: '泰宁县',
          }
        ]
      },
      {
        value: 'fzs',
        name: '福州市',
        children: [
          {
            value: 'fdx',
            name: '福鼎县',
          },
          {
            value: 'clx',
            name: '长乐县',
          }
        ]
      }
    ]
  }
];

class Page1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal     : false,
      confirm   : false,
      alert     : false,
      mask      : false,
      toast     : false,
      loading   : false,
      selector  : false,

      province     : 'fj',
      city         : 'sms',
      country      : 'tn',
      provinceData : addressData,
      cityData     : addressData[0].children,
      countryData  : addressData[0].children[0].children,
    };
  }

  _onClickOpen(key) {
    this.setState({
      [`${ key }`]: true
    });
  }

  _onClickClose(key) {
    this.setState({
      [`${ key }`]: false
    });
  }

  render() {

    return (
      <div>
        <Swipe>
          <div className="ui-swipe-item">
            <div className="ui-swipe-pic">
              <a href="http://www.baidu.com">
                <img src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E4%BD%B3%E4%B9%90%E9%94%AD.png" />
              </a>
            </div>
            <div className="ui-swipe-info">
              <div className="ui-swipe-title">百度</div>
            </div>
          </div>
          <div className="ui-swipe-item">
            <div className="ui-swipe-pic">
              <a href="http://www.taobao.com">
                <img src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E8%96%AF%E7%89%87-0.png" />
              </a>
            </div>
            <div className="ui-swipe-info">
              <div className="ui-swipe-title">淘宝</div>
            </div>
          </div>
          <div className="ui-swipe-item">
            <div className="ui-swipe-pic">
              <a href="http://www.qq.com">
                <img src="http://map.baidu.com/fwmap/upload/h5v1.2-%E9%A6%96%E9%A1%B5banner-%E9%BB%84%E6%B2%B9%E8%96%AF%E7%89%87-0.png" />
              </a>
            </div>
            <div className="ui-swipe-info">
              <div className="ui-swipe-title">腾讯</div>
            </div>
          </div>
        </Swipe>

        <Form>
          <Form.Item
            label="icon图标" 
            labelCol="col-sm-2"
            controlCol="col-sm-10">
            111
          </Form.Item>
        </Form>
        
        <Form type="horizontal">
          <Form.Item
            label="icon图标" 
            labelCol="col-sm-2"
            controlCol="col-sm-10">
            <Icon type="check" theme="success" style={{fontSize: 30}} />
            <Icon type="check-round" theme="success" style={{fontSize: 30}} />
            <Icon type="check-round-fill" theme="success" style={{fontSize: 30}} />
            <Icon type="close" theme="error" style={{fontSize: 30}} />
            <Icon type="close-round" theme="error" style={{fontSize: 30}} />
            <Icon type="close-round-fill" theme="error" style={{fontSize: 30}} />
            <Icon type="info-round" theme="info" style={{fontSize: 30}} />
            <Icon type="info-round-fill" theme="info" style={{fontSize: 30}} />
            <Icon type="question-round" style={{fontSize: 30}} />
            <Icon type="question-round-fill" style={{fontSize: 30}} />
            <Icon type="warning-round" theme="warning" style={{fontSize: 30}} />
            <Icon type="warning-round-fill" theme="warning" style={{fontSize: 30}} />
            <Icon type="arrow-left" style={{fontSize: 30}} />
            <Icon type="arrow-right" style={{fontSize: 30}} />
            <Icon type="arrow-top" style={{fontSize: 30}} />
            <Icon type="arrow-bottom" style={{fontSize: 30}} />
            <Icon type="add" style={{fontSize: 30}} />
            <Icon type="minus" style={{fontSize: 30}} />
            <Icon type="date" style={{fontSize: 30}} />
            <Icon type="loading" style={{fontSize: 30}} />
          </Form.Item>

          <Form.Item
            label="图标按钮"
            labelCol="col-sm-2"
            controlCol="col-sm-10">
            <Button size="xl" circle><Icon type="check" /></Button>
            <Button size="lg" circle><Icon type="check" /></Button>
            <Button circle><Icon type="check" /></Button>
            <Button size="sm" circle><Icon type="check" /></Button>
            <Button size="xs" circle><Icon type="check" /></Button>
          </Form.Item>

          <Form.Item
            label="文字按钮"
            labelCol="col-sm-2"
            controlCol="col-sm-10">
            <Button size="xl">特大号按钮</Button>
            <Button size="lg" theme="info">大号按钮</Button>
            <Button theme="success">普通按钮</Button>
            <Button size="sm" theme="warning">小号按钮</Button>
            <Button size="xs" theme="error">特小号按钮</Button>
            <Button>直角按钮</Button>
            <Button radius>圆角按钮</Button>
            <Button round>椭圆角按钮</Button>
            <Button bordered theme="info">边框按钮</Button>
            <Button><Icon type="check" loading /> 带图标的按钮</Button>
            <Button disabled>禁用状态</Button>
            <Button disabled loading>加载中的按钮</Button>
            <Button active>激活状态</Button>
          </Form.Item>

        </Form>

        <Switch onChange={(data) => {
          console.log(data)
        }}></Switch>

        <p className="buttons">
          <Button size="xl" onClick={() => this._onClickOpen('mask')}>遮罩层</Button>
          <Button size="lg" onClick={() => this._onClickOpen('modal')}>弹出框</Button>
          <Button theme="warning" size="xs" onClick={() => this._onClickOpen('loading')}>加载中</Button>
          <Button theme="error" onClick={() => this._onClickOpen('toast')}>提示信息</Button>
          <Button onClick={() => this._onClickOpen('selector')}>城市选择器</Button>
        </p>

        <Selector visible={this.state.selector} onMaskClick={() => this._onClickClose('selector')}>
          <Selector.Group data={this.state.provinceData} defaultValue={this.state.province} onChange={(data) => {
            this.setState({
              province   : data.value,
              cityData   : this.state.provinceData[data.index].children,
            });
          }} />
          <Selector.Group data={this.state.cityData} defaultValue={this.state.city} onChange={(data) => {
            this.setState({
              city       : data.value,
              countryData: this.state.cityData[data.index].children
            });
          }} />
          <Selector.Group data={this.state.countryData} defaultValue={this.state.country} onChange={(data) => {
            this.setState({
              country    : data.value,
            });
          }} />
        </Selector>

        <Modal visible={this.state.modal} radius onMaskClick={() => this._onClickClose('modal')}>
          <Modal.Header title="标题" onClose={() => this._onClickClose('modal')}></Modal.Header>
          <Modal.Body>
            我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮我是对话框，禁止遮罩层关闭窗口，不显示右上角关闭按钮
          </Modal.Body>
          <Modal.Footer>
            <Button radius block bordered onClick={() => this._onClickClose('modal')}>取消</Button>
            <Button radius block theme="success" onClick={() => { alert('你点击了确定') }}>确定</Button>
          </Modal.Footer>
        </Modal>
        
        { this.state.toast ?
          <Toast
            visible={this.state.toast}
            message="这是一个提示信息！"
            onMaskClick={() => this._onClickClose('toast')} />
        : null }
        
        <Loading
          visible={this.state.loading}
          message="付款中" />

        <Mask
          visible={this.state.mask}
          onClose={() => this._onClickClose('mask')} />

        {
          // <p>province: {this.state.province}</p>
          // <p>city: {this.state.city}</p>
          // <p>country: {this.state.country}</p>
        }
        

      </div>
    );
  }
}

export default Page1;