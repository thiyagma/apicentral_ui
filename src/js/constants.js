/* */;
export const INIT = 'INIT';
export const SESSION_INIT = 'SESSION_INIT';
export const SESSION_FAILURE = 'SESSION_FAILURE';
export const USER_SUCCESS = 'USER_SUCCESS'; 
export const USER_FAILURE = 'USER_FAILURE';

export const MYFAV = 'MYFAV'; 
export const MYAPI = 'MYAPI';
export const MYAPI_SUCCESS = 'MYAPI_SUCCESS';
export const MYAPI_FAILURE = 'MYAPI_FAILURE';
export const MYFAV_SUCCESS = 'MYFAV_SUCCESS';
export const MYFAV_FAILURE = 'MYFAV_FAILURE';
export const ADDMYFAV_SUCCESS = 'ADDMYFAV_SUCCESS';
export const ADDMYFAV_FAILURE = 'ADDMYFAV_FAILURE';

export const ADDMYBOOKMARKS_SUCCESS = 'ADDMYBOOKMARKS_SUCCESS';
export const ADDMYBOOKMARKS_FAILURE = 'ADDMYBOOKMARKS_FAILURE';

export const MYBOOKMARKS_SUCCESS = 'MYBOOKMARKS_SUCCESS';
export const MYBOOKMARKS_FAILURE = 'MYBOOKMARKS_FAILURE';


export const CREATE_TYPE_SUCCESS = 'CREATE_TYPE_SUCCESS';
export const CREATE_UPLOAD = 'CREATE_UPLOAD';
export const CREATE_NEW = 'CREATE_NEW';
export const CREATE_EDIT = 'CREATE_EDIT';
export const CREATE_VIEW = 'CREATE_VIEW';

export const DETAILS_EDIT = 'DETAILS_EDIT';
export const DETAILS_VIEW = 'DETAILS_VIEW';

export const LATEST_API_SUCCESS = 'LATEST_API_SUCCESS';
export const LATEST_API_FAILURE = 'LATEST_API_FAILURE';

export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';
export const CATEGORIES_FAILURE = 'CATEGORIES_FAILURE';

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const SEARCH_MORE_SUCCESS = 'SEARCH_MORE_SUCCESS';
export const SEARCH_MORE_FAILURE = 'SEARCH_MORE_FAILURE';

export const VALUECHAIN_SUCCESS = 'VALUECHAIN_SUCCESS';
export const VALUECHAIN_FAILURE = 'VALUECHAIN_FAILURE';
export const DATASUBJECT_SUCCESS = 'DATASUBJECT_SUCCESS';
export const DATASUBJECT_FAILURE = 'DATASUBJECT_FAILURE';

export const TAGS_SUCCESS = 'TAGS_SUCCESS';
export const TAGS_FAILURE = 'TAGS_FAILURE';

export const APPLY_FILTER = 'APPLY_FILTER';
export const RESET_FILTER = 'RESET_FILTER';

export const APPLY_FACET_FILTER = 'APPLY_FILTER';

export const UPLOAD_API_SUCCESS = 'UPLOAD_API_SUCCESS';
export const UPLOAD_API_FAILURE = 'UPLOAD_API_FAILURE';
export const UPDATE_API_SUCCESS = 'UPDATE_API_SUCCESS';
export const UPDATE_API_FAILURE = 'UPDATE_API_FAILURE';
export const SWAGGERFILE_SUCCESS = 'SWAGGERFILE_SUCCESS';
export const SWAGGERFILE_FAILURE = 'SWAGGERFILE_FAILURE';

export const WHOAMI_SUCCESS = 'WHOAMI_SUCCESS';
export const WHOAMI_FAILURE = 'WHOAMI_FAILURE';

export const TYPEAHEAD_LOOKUP = 'TYPEAHEAD_LOOKUP';
export const CLEAR_TYPEAHEAD = 'CLEAR_TYPEAHEAD';

export const TOGGLE_VIEW_STYLE = 'TOGGLE_VIEW_STYLE';

export const TILE_VIEW = 'TILE_VIEW';
export const LIST_VIEW = 'LIST_VIEW';

export const OLDEST = 'Oldest';
export const RECENT = 'Recent';
export const MOST_POPULAR = 'Most Popular';
export const SORT_BY = 'SORT_BY';

export const CLIENT_APP_SUCESS = 'CLIENT_APP_SUCESS';
export const CLIENT_APP_REGISTER_SUCCESS = 'CLIENT_APP_REGISTER_SUCCESS';
export const CLIENT_APP_UPDATE_SUCCESS = 'CLIENT_APP_UPDATE_SUCCESS';
export const CLIENT_APP_REGISTER_FAIL = 'CLIENT_APP_REGISTER_FAIL';
export const CLEAR_CLIENT_APP = 'CLEAR_CLIENT_APP';

export const GET_CONSUMERS_SUCCESS = 'GET_CONSUMERS_SUCCESS';
export const UPDATE_CONSUMERS_SUCCESS = 'UPDATE_CONSUMERS_SUCCESS';
export const RESET_CLIENT_APP_UPDATE = 'RESET_CLIENT_APP_UPDATE';

export const GET_TEAM_SUCCESS = 'GET_TEAM_SUCCESS';
export const ADD_TEAM_SUCCESS = 'ADD_TEAM_SUCCESS';
export const ADD_TEAM_FAIL = 'ADD_TEAM_FAIL';
export const RESET_TEAM_ADD = 'RESET_TEAM_ADD';
export const UPDATE_CONSUMERS_API_SUCCESS = 'UPDATE_CONSUMERS_API_SUCCESS';

export const DEFAULTPAGESIZE = 30;
export const DEFAULTRESULT = {
  results: [],
  totalhit:0,
  limit: 0
};

var searchoptions = [
  { value: 'all', label: 'All' },
  { value: 'eprid', label: 'EPR Id' },
  { value: 'apiid', label: 'Api Id' },
  { value: 'keyword', label: 'Keywords' },
  { value: 'keyword', label: 'Tagged Words' },
  { value: 'apiname', label: 'Service Name' },
  { value: 'datasubject', label: 'Data Subject' },
  { value: 'apiname', label: 'Alias Name' },
  { value: 'keyword', label: 'Api Method' }
  // { value: 'valuechain', label: 'Value Chain' }
];

export const sortOptions = ['Oldest', 'Recent', 'Most Popular'];

exports.FilterOption = searchoptions[0];
exports.FilterOptions = searchoptions;
