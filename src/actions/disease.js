import fetchData from '../lib/fetchData';
import { buildTableQueryString } from '../lib/utils';

export const FETCH_DISEASE = 'FETCH_DISEASE';
export const FETCH_DISEASE_SUCCESS = 'FETCH_DISEASE_SUCCESS';
export const FETCH_DISEASE_FAILURE = 'FETCH_DISEASE_FAILURE';

export const FETCH_ASSOCIATIONS = 'FETCH_ASSOCIATIONS';
export const FETCH_ASSOCIATIONS_SUCCESS = 'FETCH_ASSOCIATIONS_SUCCESS';
export const FETCH_ASSOCIATIONS_FAILURE = 'FETCH_ASSOCIATIONS_FAILURE';

export const fetchDisease = function (id) {
  return (dispatch) => {
    dispatch({
      type: FETCH_DISEASE,
    });
    fetchData(`/api/disease/${id}`)
      .then((data) => {
        dispatch(fetchDiseaseSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchDiseaseFailure(error));
      });
  };
};

export const fetchDiseaseSuccess = function (disease) {
  return {
    type: FETCH_DISEASE_SUCCESS,
    payload: disease,
  };
};

export const fetchDiseaseFailure = function (error) {
  return {
    type: FETCH_DISEASE_FAILURE,
    payload: error,
  };
};

export const fetchAssociations = function (id, opts) {
  return (dispatch) => {
    dispatch(fetchAssociationsRequest());

    // compensate for the fact that we replace underscore in this field for display
    let associationTypeFilter = opts.filters.find(filter => filter.name === 'associationType');
    if (associationTypeFilter) {
      associationTypeFilter.value = associationTypeFilter.value.replace(/ /g, '_');
    }

    return fetchData(`/api/disease/${id}/associations?${buildTableQueryString(opts)}`)
      .then((data) => dispatch(fetchAssociationsSuccess(data)))
      .catch((error) => dispatch(fetchAssociationsFailure(error)));
  };
};

export const fetchAssociationsRequest = function() {
  return {
    type: FETCH_ASSOCIATIONS
  };
};

export const fetchAssociationsSuccess = function (associations) {
  return {
    type: FETCH_ASSOCIATIONS_SUCCESS,
    payload: associations,
  };
};

export const fetchAssociationsFailure = function (error) {
  return {
    type: FETCH_ASSOCIATIONS_FAILURE,
    payload: error,
  };
};

