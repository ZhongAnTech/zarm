import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class Meta extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    description: '',
  };

  render() {
    const { title, description } = this.props;
    return (
      <Helmet encodeSpecialCharacters={false}>
        <html lang="zh" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://zarm.design/images/logo.ce68565d.svg" />
      </Helmet>
    );
  }
}

export default Meta;
