import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

class ExternalLink extends Component {
  render () {
    const {children, href, id, title} = this.props;
    return (
      <a
        className={href ? style.externalLink : ''}
        href={href || null}
        id={id}
        rel="noopener noreferrer"
        target="_blank"
        title={title}
      >
        {children || href}
      </a>
    );
  }
}

ExternalLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
};

export default ExternalLink;
