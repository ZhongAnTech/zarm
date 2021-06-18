import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Dropdown } from 'zarm-web';
import QRious from 'qrious';
import Container from '@/web/components/Container';
import Meta from '@/web/components/Meta';
import './style.scss';

const Page = () => {
  const qrcode = useRef();
  const [dropdown, setDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const history = useHistory();
  const demoURL = `${window.location.origin}/demo.html`;

  useEffect(() => {
    if (!dropdown || mounted) return;

    const qr = new QRious({
      element: qrcode.current,
      value: demoURL,
      size: 134,
    });
    setMounted(true);
  }, [demoURL, dropdown, mounted]);

  return (
    <Container className="index-page">
      <FormattedMessage id="app.title">
        {(txt) => <Meta title={`Zarm Design - ${txt}`} />}
      </FormattedMessage>
      <main>
        <div className="banner">
          <img src={require('./images/banner@2x.png')} alt="" />
        </div>
        <div className="introduce">
          <div className="title">
            <span>Zarm</span>
            &nbsp;Design
          </div>
          <div className="description">
            <FormattedMessage id="app.home.index.introduce" />
          </div>
          <div className="navigation">
            <button type="button" onClick={() => history.push('/docs/quick-start')}>
              <FormattedMessage id="app.home.index.getting-started" />
            </button>
            <Dropdown
              className="btn-try"
              visible={dropdown}
              onVisibleChange={setDropdown}
              direction="bottom"
              content={
                <a href={demoURL}>
                  <canvas ref={qrcode} />
                </a>
              }
              destroy={false}
            >
              <button type="button" className="ghost">
                <FormattedMessage id="app.home.index.scanning-code" />
              </button>
            </Dropdown>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Page;
