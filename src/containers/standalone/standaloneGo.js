import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import GeneOntologyRibbon from '../../components/geneOntologyRibbon';

class StandaloneGo extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <base target='_parent' />
          <script src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.3/iframeResizer.contentWindow.min.js' />
        </Helmet>
        <GeneOntologyRibbon id={this.props.match.params.geneId} />
      </div>
    );
  }
}

StandaloneGo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default StandaloneGo;
