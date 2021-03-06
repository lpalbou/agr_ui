/* eslint-disable react/no-set-state */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchPhenotypes } from '../../actions/genes';
import { selectPhenotypes } from '../../selectors/geneSelectors';
import { RemoteDataTable, ReferenceCell, GeneticEntityCell } from '../../components/dataTable';

class PhenotypeTable extends React.Component {
  loadPhenotypes(opts) {
    const { dispatch, geneId } = this.props;
    dispatch(fetchPhenotypes(geneId, opts));
  }

  render() {
    const { geneId, phenotypes } = this.props;

    const data = phenotypes.data && phenotypes.data.map(record => {
      return {
        id: record.geneticEntity.id + '-' + record.phenotype,
        phenotype: record.phenotype,
        geneticEntity: record.geneticEntity,
        geneticEntityType: record.geneticEntity.type,
        reference: record.publications,
      };
    });

    const columns = [
      {
        field: 'id',
        isKey: true,
        hidden: true,
      },
      {
        field: 'phenotype',
        label: 'Phenotype Term',
        format: (term) => <span dangerouslySetInnerHTML={{__html: term}} />,
        sortable: false,
        filterable: false,
        width: '120px',
      },
      {
        field: 'geneticEntity',
        label: 'Genetic Entity',
        format: entity => entity.type === 'gene' ? null : GeneticEntityCell(entity),
        sortable: false,
        filterable: false,
        width: '185px',
      },
      {
        field: 'geneticEntityType',
        label: 'Genetic Entity Type',
        sortable: false,
        filterable: false,
        width: '100px',
      },
      {
        field: 'reference',
        label: 'References',
        format: ReferenceCell,
        sortable: false,
        filterable: false,
        width: '150px',
      },
    ];
    return (
      <RemoteDataTable
        columns={columns}
        data={data}
        downloadUrl={`/api/gene/${geneId}/phenotypes/download`}
        loading={phenotypes.loading}
        onUpdate={this.loadPhenotypes.bind(this)}
        totalRows={phenotypes.total}
      />
    );
  }
}

PhenotypeTable.propTypes = {
  dispatch: PropTypes.func,
  geneId: PropTypes.string.isRequired,
  phenotypes: PropTypes.object,
};

function mapStateToProps (state) {
  return {
    phenotypes: selectPhenotypes(state),
  };
}

export default connect(mapStateToProps)(PhenotypeTable);
