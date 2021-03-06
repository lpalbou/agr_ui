import diseaseReducer from './diseaseReducer';
import expressionReducer from './expressionReducer';
import geneReducer from './geneReducer';
import wordpressReducer from './wordpressReducer';
import searchReducer from './searchReducer';
import metadataReducer from './metadataReducer';

export default {
  disease: diseaseReducer,
  expression: expressionReducer,
  gene: geneReducer,
  wordpress: wordpressReducer,
  search: searchReducer,
  metadata: metadataReducer
};
