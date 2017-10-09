import React, { Component } from 'react';
import '../styles/components/Footer.scss';

class Footer extends Component {

  render() {
    return (
      <footer>
        <div className="copyright">
          <div className="copyright-cn">众安·体验设计中心</div>
          <div className="copyright-en">Zhongan UX Densign</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
