import fetchData from '../lib/fetchData';

export const FETCH_SUMMARY = 'FETCH_SUMMARY';
export const FETCH_SUMMARY_SUCCESS = 'FETCH_SUMMARY_SUCCESS';
export const FETCH_SUMMARY_FAILURE = 'FETCH_SUMMARY_FAILURE';

export const FETCH_EXPRESSION_ANNOTATIONS = 'FETCH_EXPRESSION_ANNOTATIONS';
export const FETCH_EXPRESSION_ANNOTATIONS_SUCCESS = 'FETCH_EXPRESSION_ANNOTATIONS_SUCCESS';
export const FETCH_EXPRESSION_ANNOTATIONS_FAILURE = 'FETCH_EXPRESSION_ANNOTATIONS_FAILURE';

export const fetchExpressionSummary = (id) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_SUMMARY,
      id,
    });
    return fetchData(`/api/gene/${id}/expression-summary`)
      .then(data => dispatch(fetchExpressionSummarySuccess(id, data)))
      .catch(error => dispatch(fetchExpressionSummaryFailure(id, error)));
  };
};

const fetchExpressionSummarySuccess = (id, summary) => ({
  type: FETCH_SUMMARY_SUCCESS,
  id,
  summary,
});

const fetchExpressionSummaryFailure = (id, error) => ({
  type: FETCH_SUMMARY_FAILURE,
  id,
  error,
});

export const fetchExpressionAnnotations = (genes, term, page) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_EXPRESSION_ANNOTATIONS
    });
    const geneParams = genes.map(gene => `geneID=${gene}`).join('&');
    return fetchData(`/api/expression?termID=${term}&${geneParams}&page=${page}`)
      .then(data => dispatch(fetchExpressionAnnotationsSuccess(data)))
      .catch(error => dispatch(fetchExpressionAnnotationsFailure(error)));
  };
};

const fetchExpressionAnnotationsSuccess = (annotations) => ({
  type: FETCH_EXPRESSION_ANNOTATIONS_SUCCESS,
  annotations
});

const fetchExpressionAnnotationsFailure = (error) => ({
  type: FETCH_EXPRESSION_ANNOTATIONS_FAILURE,
  error
});
