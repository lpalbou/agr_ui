import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import style from './style.scss';
import { makeFieldDisplayName } from '../../lib/searchHelpers';
import { CollapsibleList } from '../../components/collapsibleList';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';

const JOIN_CHAR = ', ';
const size = 3;

class DetailList extends Component {
  render() {
    let d = this.props.data;
    let nodes = this.props.fields.map( (field) => {
      let valueNode;
      let value = d[field];

      if (Array.isArray(value)) {
        if (field === 'external_ids') { //special handling to make cross references collapsible
          valueNode = (
            <CollapsibleList collapsedSize={size}> {value} </CollapsibleList>
          );
        } else { //everything else just gets joined
          value = value.join(JOIN_CHAR);
        }
      }

      if (value && field === 'species') {
        valueNode = <span><i dangerouslySetInnerHTML={{ __html: value }} /></span>;
      } else {
        if (field !== 'external_ids') {
          valueNode = <span dangerouslySetInnerHTML={{ __html: value }} />;
        }
      }

      if (!value) {
        valueNode = <i className='text-muted'>Not Available</i>;
      }

      let node = {};
      node.label = makeFieldDisplayName(field);
      node.value = valueNode;

      return node;
    });
    return (
      <AttributeList>
        {nodes.map((node) => {
          <div>
            <AttributeLabel>{node.label}</AttributeLabel>;
            <AttributeValue>{node.value}</AttributeValue>;
          </div>;
        })}
      </AttributeList>
    );
  }
}

DetailList.propTypes = {
  data: PropTypes.object,
  fields: PropTypes.array
};

export default DetailList;
