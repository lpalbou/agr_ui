import { STRINGENCY_HIGH, STRINGENCY_MED } from '../components/orthology/constants';
import { DEFAULT_TABLE_STATE, TAXON_IDS } from '../constants';

export function makeId(string) {
  return string.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
}

export function stripHtml (string) {
  if (!string) {
    return '';
  }
  return string.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, '').trim();
}

function functionOrIdentity(func) {
  return func || (val => val);
}

export function compareAlphabeticalCaseInsensitive(accessor) {
  accessor = functionOrIdentity(accessor);
  return function (a, b) {
    return accessor(a).toLowerCase().localeCompare(accessor(b).toLowerCase());
  };
}

export function compareByFixedOrder(order, accessor) {
  accessor = functionOrIdentity(accessor);
  const indexOf = value => {
    const index = order.indexOf(value);
    return index < 0 ? order.length : index;
  };
  return (a, b) => indexOf(accessor(a)) - indexOf(accessor(b));
}

export function compareBy(compareFunctions) {
  return (a, b) => {
    const last = compareFunctions.length - 1;
    for (let i = 0; i < last; i++) {
      const compareOutput = compareFunctions[i](a, b);
      if (compareOutput !== 0) {
        return compareOutput;
      }
    }
    return compareFunctions[last](a, b);
  };
}

export function sortBy(array, compareFunctions) {
  return array.sort(compareBy(compareFunctions));
}

export function buildTableQueryString(options, filterPrefix) {
  if (!options) {
    options = DEFAULT_TABLE_STATE;
  }
  filterPrefix = filterPrefix || '';
  const filterQueries = options.filters.length ?
    ('&' + options.filters.map(filter => `${filterPrefix}${filter.name}=${filter.value}`).join('&')) : '';
  const sortOrderQuery = options.sort.order ? `&asc=${options.sort.order === 'asc'}` : '';
  return `page=${options.page}&limit=${options.limit}&sortBy=${options.sort.name}${sortOrderQuery}${filterQueries}`;
}

function isHighStringency(orthology) {
  return orthology.stringencyFilter === 'stringent';
  // return (
  //   orthology.predictionMethodsMatched.indexOf('ZFIN') > -1 ||
  //   orthology.predictionMethodsMatched.indexOf('HGNC') > -1 ||
  //   (orthology.predictionMethodsMatched.length > 2 && (orthology.best || orthology.bestReverse)) ||
  //   (orthology.predictionMethodsMatched.length === 2 && orthology.best && orthology.bestReverse)
  // );
}

function isModerateStringency(orthology) {
  return orthology.stringencyFilter === 'stringent' ||
    orthology.stringencyFilter === 'moderate';
  // return (
  //   orthology.predictionMethodsMatched.indexOf('ZFIN') > -1 ||
  //   orthology.predictionMethodsMatched.indexOf('HGNC') > -1 ||
  //   orthology.predictionMethodsMatched.length > 2 ||
  //   (orthology.predictionMethodsMatched.length === 2 && orthology.best && orthology.bestReverse)
  // );
}

export function orthologyMeetsStringency(orthology, stringency) {
  switch (stringency) {
  case STRINGENCY_HIGH:
    return isHighStringency(orthology);
  case STRINGENCY_MED:
    return isModerateStringency(orthology);
  default:
    return true;
  }
}

export function filterOrthologyByStringency(orthologyList, stringency) {
  return orthologyList.filter(o => orthologyMeetsStringency(o, stringency));
}

export function shortSpeciesName(taxonId) {
  const shortNames = {
    [TAXON_IDS.HUMAN]: 'Hsa',
    [TAXON_IDS.RAT]: 'Rno',
    [TAXON_IDS.MOUSE]: 'Mmu',
    [TAXON_IDS.FISH]: 'Dre',
    [TAXON_IDS.FLY]: 'Dme',
    [TAXON_IDS.WORM]: 'Cel',
    [TAXON_IDS.YEAST]: 'Sce',
  };
  return shortNames[taxonId];
}
