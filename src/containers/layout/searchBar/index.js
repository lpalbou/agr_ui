/*eslint-disable react/no-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { parse as parseQueryString, stringify as stringifyQuery} from 'query-string';
import { withRouter } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import style from './style.scss';
import CategoryLabel from '../../search/categoryLabel';
import fetchData from '../../../lib/fetchData';

import { CATEGORIES } from '../../../constants';
const AUTO_BASE_URL = '/api/search_autocomplete';
const DEFAULT_CAT = CATEGORIES[0];


class SearchBarComponent extends Component {
  constructor(props) {
    super(props);
    let initValue = parseQueryString(this.props.location.search).q || '';
    this.state = {
      autoOptions: [],
      catOption: DEFAULT_CAT,
      value: initValue
    };
  }

  handleClear() {
    this.setState({ autoOptions: [] });
  }

  handleOptionSelected(selected) {
    this.dispatchSearchFromQuery(selected);
  }

  handleSelect(event) {
    const selected = event.currentTarget.dataset.name;
    const newCatOption = CATEGORIES.find(cat => cat.name === selected);
    this.setState({ catOption: newCatOption });
  }

  handleSubmit(e) {
    if (e) e.preventDefault();
    let query = this.state.value;
    let newCat = this.state.catOption.name;
    let newQp = { q: query };
    if (query === '') newQp = {};
    if (newCat !== 'all') newQp.category = newCat;
    this.props.history.push({ pathname: '/search', search: stringifyQuery(newQp) });
  }

  handleTyping(e, { newValue }) {
    this.setState({ value: newValue });
  }

  handleFetchData({ value }) {
    let query = value;
    let cat = this.state.catOption.name;
    let catSegment = cat === DEFAULT_CAT.name ? '' : ('&category=' + cat);
    let url = AUTO_BASE_URL + '?q=' + query + catSegment;
    fetchData(url)
      .then( (data) => {
        let newOptions = data.results || [];
        this.setState({ autoOptions: newOptions });
      });
  }

  handleSelected(event, item) {
    //gene and disease will go to the pages and skip search results,
    //go terms and alleles will just go to regular search pages as the query
    if (item.method == 'click') {
      if (item.suggestion.category == 'gene') {
        let href = '/gene/' + item.suggestion.primaryId;
        this.props.history.push({ pathname: href});
      } else if (item.suggestion.category == 'disease') {
        let href = '/disease/' + item.suggestion.primaryId;
        this.props.history.push({ pathname: href});
      } else {
        this.setState({ value: item.suggestion.name_key });
        let query = item.suggestion.name_key;
        let newCat = this.state.catOption.name;
        let newQp = { q: query };
        if (query === '') newQp = {};
        if (newCat !== 'all') newQp.category = newCat;
        this.props.history.push({ pathname: '/search', search: stringifyQuery(newQp) });
      }
    }
  }

  renderDropdown() {
    let _title = this.state.catOption.displayName;
    let nodes = CATEGORIES.map( d => {
      let labelNode = (d.name === DEFAULT_CAT.name) ? 'All' : <CategoryLabel category={d.name} />;
      return (
        <DropdownItem className={style.dropdownItem} data-name={d.name} key={d.name} onClick={this.handleSelect.bind(this)}>
          {labelNode}
        </DropdownItem>
      );
    });
    return (
      <UncontrolledDropdown className={`input-group-prepend ${style.searchBtns}`}>
        <DropdownToggle caret color='secondary' outline>
          {_title}
        </DropdownToggle>
        <DropdownMenu>
          {nodes}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  renderSuggestion(d) {
    return (
      <div className={style.autoListItem}>
        <span>{d.name_key}</span>
        <span className={style.catContainer}>
          <CategoryLabel category={d.category} />
        </span>
      </div>
    );
  }

  render() {
    let _getSuggestionValue = ( d => d.name_key );
    let _inputProps = {
      placeholder: 'search a gene, disease or GO term',
      value: this.state.value,
      onChange: this.handleTyping.bind(this)
    };
    let _theme = {
      container: style.autoContainer,
      containerOpen: style.autoContainerOpen,
      input: style.autoInput,
      suggestionsContainer: style.suggestionsContainer,
      suggestionsList: style.suggestionsList,
      suggestion: style.suggestion,
      suggestionHighlighted: style.suggestionHighlighted
    };
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className='input-group'>
          {this.renderDropdown()}
          <Autosuggest
            className='form-control'
            getSuggestionValue={_getSuggestionValue}
            inputProps={_inputProps}
            onSuggestionSelected={this.handleSelected.bind(this)}
            onSuggestionsClearRequested={this.handleClear.bind(this)}
            onSuggestionsFetchRequested={this.handleFetchData.bind(this)}
            renderSuggestion={this.renderSuggestion}
            suggestions={this.state.autoOptions}
            theme={_theme}
          />
          <div className='input-group-append'>
            <button className={`btn btn-primary ${style.searchBtns}`} type='submit'>
              <i className='fa fa-search' />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

SearchBarComponent.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps() {
  return {
  };
}

const SearchBarComponentWithHistory = withRouter(SearchBarComponent);

export { SearchBarComponentWithHistory as SearchBarComponent };
export default connect(mapStateToProps)(SearchBarComponentWithHistory);
