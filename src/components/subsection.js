import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';
import { makeId } from '../lib/utils';

import NoData from './noData';

class Subsection extends Component {
  render() {
    const id = this.props.title && makeId(this.props.title);
    const target = <a className={style.target} id={id} />;

    let renderTitle;
    switch (this.props.level) {
    case 1:
      renderTitle = <h4>{this.props.isWrapper && target}{this.props.title}</h4>;
      break;
    case 2:
      renderTitle = <h5>{this.props.isWrapper && target}{this.props.title}</h5>;
      break;
    default:
      renderTitle = <h3>{this.props.isWrapper && target}{this.props.title}</h3>;
    }

    return (
      <div className={style.subsection}>
        {!this.props.isWrapper && target}
        {this.props.hardcoded && <span className='badge badge-danger'>Hardcoded Example Data</span>}
        {this.props.title && !this.props.hideTitle && renderTitle}
        {typeof this.props.hasData !== 'undefined' && !this.props.hasData ? <NoData /> : this.props.children}
      </div>
    );
  }
}

Subsection.propTypes = {
  children: PropTypes.node.isRequired,
  hardcoded: PropTypes.bool,
  hasData: PropTypes.bool,
  hideTitle: PropTypes.bool,
  isWrapper: PropTypes.bool,
  level: PropTypes.number,
  title: PropTypes.string,
};

Subsection.defaultProps = {
  hideTitle: false,
};

export default Subsection;
