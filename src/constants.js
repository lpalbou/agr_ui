export const SEARCH_API_ERROR_MESSAGE = 'There was a problem connecting to the server. Please refresh the page.  If you continue to see this message, please contact alliance-software@lists.stanford.edu';
export const LARGE_COL_CLASS = 'col-sm-8 col-md-8 col-12';
export const SMALL_COL_CLASS = 'col-sm-4 col-md-4 col-12';

/* Wordpress REST API connection setting */
export const WORDPRESS_REST_API_BASE = 'https://public-api.wordpress.com/wp/v2/sites/alliancegenome.wordpress.com';
export const WORDPRESS_PAGE_BASE_URL = WORDPRESS_REST_API_BASE + '/pages?slug=';
export const WORDPRESS_POST_BASE_URL = WORDPRESS_REST_API_BASE + '/posts';
export const WORDPRESS_POST_URL = WORDPRESS_POST_BASE_URL + '?slug=';

//the order in this array matters for the category icons
export const CATEGORIES = [
  {
    name: 'all',
    displayName: 'All'
  },
  {
    name: 'gene',
    displayName: 'Gene'
  },
  {
    name: 'go',
    displayName: 'Gene Ontology'
  },
  {
    name: 'disease',
    displayName: 'Disease'
  },
  {
    name: 'allele',
    displayName: 'Allele'
  }
];

export const NON_HIGHLIGHTED_FIELDS = [
  'sourceHref',
  'href',
  'category',
  'homologs',
  'paralogs',
  'orthologs',
  'homologs.symbol',
  'homologs.panther_family'
];

export const HELP_EMAIL = 'alliance-helpdesk@lists.stanford.edu';

export const NAV_MENU = [
  {
    label: 'Home',
    route: '/',
    wordpressId: 16,
  },
  {
    label: 'Data',
    sub: [
      {
        label: 'Downloads',
        route: '/downloads',
      },
      {
        label: 'API',
        route: '/api/swagger-ui',
      },
    ]
  },
  {
    label: 'About',
    wordpressId: 2,
    sub: [
      {
        label: 'About Us',
        route: '/about-us',
      },
      {
        label: 'Frequently Asked Questions',
        route: '/frequently-asked-questions'
      },
      {
        label: 'Funding',
        route: '/funding'
      },
      {
        label: 'Organization and Governance',
        route: '/organization-and-governance'
      },
      {
        label: 'Publications',
        route: '/publications',
      }
    ]
  },
  {
    label: 'Work Products',
    wordpressId: 257,
    sub: [
      {
        label: 'Projects, Work Products, and Publications',
        route: '/projects-work-products-publications',
      },
      {
        label: 'Administrative Supplement',
        route: '/administrative-supplement'
      },
      {
        label: 'Genome Features',
        route: '/genome-features'
      },
      {
        label: 'Orthology',
        route: '/orthology'
      },
      {
        label: 'Phenotypes And Disease Models',
        route: '/phenotypes-and-disease-models'
      }
    ]
  },
  {
    label: 'News & Events',
    route: '/news',
  },
  {
    label: 'Contact Us',
    route: '/contact-us',
    wordpressId: 3,
  },
];

export const DEFAULT_TABLE_STATE = {
  limit: 10,
  page: 1,
  sort: {
    name: '',
    order: '',
  },
  filters: []
};

export const TAXON_IDS = {
  HUMAN: 'NCBITaxon:9606',
  MOUSE: 'NCBITaxon:10090',
  RAT: 'NCBITaxon:10116',
  FISH: 'NCBITaxon:7955',
  FLY: 'NCBITaxon:7227',
  WORM: 'NCBITaxon:6239',
  YEAST: 'NCBITaxon:559292'
};

export const TAXON_ORDER = [
  TAXON_IDS.HUMAN,
  TAXON_IDS.MOUSE,
  TAXON_IDS.RAT,
  TAXON_IDS.FISH,
  TAXON_IDS.FLY,
  TAXON_IDS.WORM,
  TAXON_IDS.YEAST,
];

export const GA_PROPERTY_ID = 'UA-98765810-1';

export const GA_EVENT_CATEGORY = {
  TABLE: 'Table',
};

export const GA_EVENT_ACTION = {
  GO_TO_PAGE: 'Go to page',
  SET_PAGE_SIZE: 'Set page size'
};

