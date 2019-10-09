import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class Meta extends PureComponent {
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

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

Meta.defaultProps = {
  title: '',
  description: '',
};

export default Meta;
