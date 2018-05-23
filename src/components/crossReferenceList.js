import React from 'react';
import PropTypes from 'prop-types';
import DataSourceLink from './dataSourceLink';
import { CollapsibleList, CollapsibleListItem } from './collapsibleList';
import { compareAlphabeticalCaseInsensitive } from '../lib/utils';

const CrossReferenceList = ({crossReferences}) => {
  const byName = compareAlphabeticalCaseInsensitive(xref => (xref.displayName || xref.name));
  const byWithLinkThenName = (a, b) => {
    if (a.crossRefCompleteUrl && !b.crossRefCompleteUrl) {
      return -1;
    }
    if (!a.crossRefCompleteUrl && b.crossRefCompleteUrl) {
      return 1;
    }
    return byName(a, b);
  };

  if (!crossReferences || !crossReferences.length) {
    return null;
  }

  return (
    <CollapsibleList>
      {
        crossReferences
          .sort(byWithLinkThenName)
          .map(ref => (
            <CollapsibleListItem key={ref.localId}>
              <DataSourceLink reference={ref} />
            </CollapsibleListItem>
          ))
      }
    </CollapsibleList>
  );
};

CrossReferenceList.propTypes = {
  crossReferences: PropTypes.array,
};

export default CrossReferenceList;
