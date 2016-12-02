
import React, { Component } from 'react';
import { Swipe } from '../../components';

// import '../styles/pages/SwipePage';

class SwipePage extends Component {

  render() {
    return (
      <div className="swipe-page">
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
      </div>
    );
  }
}

export default SwipePage;