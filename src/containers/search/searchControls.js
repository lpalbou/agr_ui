import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { stringify as stringifyQuery } from 'query-string';
import { connect } from 'react-redux';

import style from './style.scss';
import { getQueryParamWithValueChanged } from '../../lib/searchHelpers';

import {
  selectActiveCategory,
  selectTotalPages,
} from '../../selectors/searchSelectors';

const SEARCH_PATH = '/search';

class SearchControlsComponent extends Component {
  renderViewAs() {
    let listQp = getQueryParamWithValueChanged('mode', 'list', this.props.queryParams);
    let tableQp = getQueryParamWithValueChanged('mode', 'table', this.props.queryParams);
    let listHref = { pathname: SEARCH_PATH, search: stringifyQuery(listQp) };
    let tableHref = { pathname: SEARCH_PATH, search: stringifyQuery(tableQp) };
    return (
      <div>
        <label className={style.searchLabel}>View As</label>
        <div className='btn-group' role='group'>
          <Link className={`btn btn-${(this.props.mode === 'list') ? 'primary': 'outline-primary'}`} to={listHref}><i className='fa fa-list' /> List</Link>
          <Link className={`btn btn-${(this.props.mode === 'table') ? 'primary': 'outline-primary'}`} to={tableHref}><i className='fa fa-table' /> Table</Link>
        </div>
      </div>
    );
  }

  renderPaginator() {
    let curPage = this.props.currentPage;
    let totPage = this.props.totalPages;
    let nextPage = Math.min(this.props.totalPages, curPage + 1);
    let prevPage = Math.max(1, curPage - 1);
    let prevQp = getQueryParamWithValueChanged('page', prevPage, this.props.queryParams);
    let nextQp = getQueryParamWithValueChanged('page', nextPage, this.props.queryParams);
    let prevHef = { pathname: SEARCH_PATH, search: stringifyQuery(prevQp) };
    let nextHef = { pathname: SEARCH_PATH, search: stringifyQuery(nextQp) };
    let isPrevDisabled = curPage <= 1;
    let isNextDisabled = curPage >= totPage;
    return (
      <div>
        <label className={`${style.searchLabel}`}>
          Page {curPage.toLocaleString()} of {totPage.toLocaleString()}
        </label>
        <div className='btn-group' role='group'>
          <Link className={`btn btn-outline-secondary${isPrevDisabled ? ' disabled' : ''}`} to={prevHef}>
            <i className='fa fa-chevron-left' />
          </Link>
          <Link className={`btn btn-outline-secondary${isNextDisabled ? ' disabled' : ''}`} to={nextHef}>
            <i className='fa fa-chevron-right' />
          </Link>
        </div>
      </div>
    );
  }

  renderNonViewAs() {
    return this.props.isMultiTable ? null : this.renderPaginator();
  }

  render() {
    return (
      <div className='d-flex'>
        <div>{this.renderViewAs()}</div>
        <div className='ml-auto'>{this.renderNonViewAs()}</div>
      </div>
    );
  }
}

SearchControlsComponent.propTypes = {
  currentPage: PropTypes.number,
  isMultiTable: PropTypes.bool,
  mode: PropTypes.string,
  queryParams: PropTypes.object,
  totalPages: PropTypes.number
};

function mapStateToProps(state, ownProps) {
  let activeCategory = selectActiveCategory(state);
  const _queryParams = ownProps.queryParams;
  let _mode = _queryParams.mode;
  if (!_mode || _mode === 'graph') {
    _mode = 'list';
  }
  let _isTable = (_queryParams.mode === 'table');
  let _isMultiTable = (_isTable && activeCategory === 'none') ;
  return {
    currentPage: parseInt(_queryParams.page) || 1,
    isMultiTable: _isMultiTable,
    mode: _mode,
    totalPages: selectTotalPages(state)
  };
}

export { SearchControlsComponent as SearchControlsComponent };
export default connect(mapStateToProps)(SearchControlsComponent);
