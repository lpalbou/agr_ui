import React, { Component } from 'react';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DownloadButton from './downloadButton.js';
import PropTypes from 'prop-types';

const textFilter = {
  type: 'TextFilter',
  delay: 100,
  placeholder: ' '
};

class RemoteDataTable extends Component {
  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handlePageChange(page, size) {
    this.props.onPageChange(page, size);
  }

  handleSizeChange(size) {
    this.props.onSizeChange(size);
  }

  handleSortChange(fieldName, sortOrder) {
    this.props.onSortChange(fieldName, sortOrder);
  }

  render() {
    const { columns, currentPage, data, downloadUrl, perPageSize, sortName, sortOrder, totalAssociations } = this.props;

    const options = {
      onPageChange: this.handlePageChange,
      onSizePerPageList: this.handleSizeChange,
      sortName: sortName,
      sortOrder: sortOrder,
      onSortChange: this.handleSortChange,
      page: currentPage,
      sizePerPage: perPageSize,
      sizePerPageList: [10, 25, 100],
    };

    return (
      <div>
        <BootstrapTable
          bordered={false}
          data={data}
          fetchInfo={{dataTotalSize: totalAssociations}}
          options={options}
          pagination
          remote
          version='4'
        >
          {
            columns.map((col, idx) =>
              <TableHeaderColumn
                dataField={col.field}
                dataFormat={col.format}
                dataSort={col.sortable}
                filter={col.filterable ? textFilter : null}
                hidden={col.hidden}
                isKey={col.isKey}
                key={idx}
                width={col.width}
              >
                {col.label}
              </TableHeaderColumn>
            )
          }
        </BootstrapTable>
        <DownloadButton buttonText='Download' downloadUrl={downloadUrl} />
      </div>
    );
  }
}

RemoteDataTable.propTypes = {
  columns: PropTypes.array,
  currentPage: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object),
  downloadUrl: PropTypes.string,
  onPageChange: PropTypes.func,
  onSizeChange: PropTypes.func,
  onSortChange: PropTypes.func,
  perPageSize: PropTypes.number,
  sortName: PropTypes.string,
  sortOrder: PropTypes.string,
  totalAssociations: PropTypes.number,
  totalPages: PropTypes.number,
};

export default RemoteDataTable;
