import {SEARCH_MORE_SUCCESS,SEARCH_MORE_FAILURE,APPLY_FILTER, RESET_FILTER, SEARCH_SUCCESS, SEARCH_FAILURE, TAGS_SUCCESS, TAGS_FAILURE,APPLY_FACET_FILTER,TYPEAHEAD_LOOKUP} from '../constants';
import common from '../common';
import api from './api';

export function applyFilter(option) {
  return { type: APPLY_FILTER, option: option};
} 

export function applyFacetFilter(option) {
  return { type: APPLY_FACET_FILTER, option: option};
} 


export function resetFilter() {
  return { type: RESET_FILTER};
}

// export function search(term, opn) {
//   let uri = "/search";
//   let params = opn;
//   return (dispatch) => {
//     api.gets(uri, params)
//     .then ((apis) => dispatch({type: SEARCH_SUCCESS, result: apis, option: opn, term: term}))
//     .catch(error => {
//       console.log("search1: ", error);
//     });
//   };
//   // return (dispatch) => {
//     // svc.getApis(option, term, function (e) {
//     //   dispatch(searchResponse(constType.SEARCH_SUCCESS, { term: term, option: option, data: e, error: undefined }));
//     // }, function (e) {
//     //   var msg = parseErrorMessage(e);
//     //   dispatch(searchResponse(constType.SEARCH_FAILURE, { term: term, option: option, data: undefined, error: msg }));
//     //   // dispatch(notifyError(msg));
//     // });
//   // };
// }

export function search1(opn) {
  if (common.IsNullOREmpty(opn.term)) {
    //delete opn.searchtype;
    opn.term = "*";
  }
  console.log("Search1 : opn.searchtype -> "+opn.searchtype);
  if (common.IsNullOREmpty(opn.searchtype) || opn.searchtype == "All") {
    //delete opn.searchtype;
    opn.searchtype = "all";
  }

  let uri = (common.IsNullOREmpty(opn.term) || common.IsNullOREmpty(opn.searchtype) || opn.term == "*") ? "" : "/search";
  let params = opn.query;
  params = {
    ...params,
    searchtype: opn.searchtype,
    term: opn.term
  };
  console.log(params);

  if (opn.term == "*") {
    // delete opn.query.sortField;
    // delete opn.query.sortOrder;
    // delete opn.query.searchtype;
    // delete opn.query.term;
    // delete opn.searchtype;
    // delete opn.term;
    delete params.sortField;
    delete params.sortOrder;
    delete params.searchtype;
    delete params.term;
  }
  
  return (dispatch) => {
    api.gets(uri, params)
    .then ((apis) => dispatch({type: SEARCH_SUCCESS, result: apis, option: opn}))
    .catch(error => {
      console.log("search1: ", SEARCH_FAILURE, error);
    });
  };
}

export function searchMore(opn) {
  console.log("searchMore : opn.searchtype -> "+opn.searchtype);
  if (common.IsNullOREmpty(opn.term)) {
    //delete opn.searchtype;
    opn.term = "*";
  }

  if (common.IsNullOREmpty(opn.searchtype) || opn.searchtype == "All") {
    //delete opn.searchtype;
    opn.searchtype = "all";
  }
  
  let uri = (common.IsNullOREmpty(opn.term) || common.IsNullOREmpty(opn.searchtype) || opn.term == "*") ? "" : "/search";

  opn.path = (common.IsNullOREmpty(opn.term) || common.IsNullOREmpty(opn.searchtype) || opn.term == "*") ? "" : "/search";
  let params = opn.query;
  params = {
    ...params,
    searchtype: opn.searchtype,
    term: opn.term
  };
  console.log(params);

  if (opn.term == "*") {
    // delete opn.query.sortField;
    // delete opn.query.sortOrder;
    // delete opn.query.searchtype;
    // delete opn.query.term;
    // delete opn.searchtype;
    // delete opn.term;
    delete params.sortField;
    delete params.sortOrder;
    delete params.searchtype;
    delete params.term;
  }

  return (dispatch) => {
    // svc.searchApi(opn, function (e) {
    //   opn.searchtype = searchtype;
    //   opn.term = term;
    //   dispatch(searchResponse(constType.SEARCH_MORE_SUCCESS, { option: opn, data: e, error: undefined }));
    // }, function (e) {
    //   var msg = parseErrorMessage(e);
    //   dispatch(searchResponse(constType.SEARCH_MORE_FAILURE, { option: opn, data: undefined, error: msg }));
    //   dispatch(notifyError(msg));
    // });
    api.gets(uri, params)
    .then ((apis) => dispatch({type: SEARCH_MORE_SUCCESS, result: apis, option: opn}))
    .catch(error => {
      console.log("searchMore: ", SEARCH_MORE_FAILURE, error);
    });
  };
}

export function searchbyArrayOfApiIds(term) {
  if (!term) {
    return null;
  }
  
  let option = {};
  option.term = "*";//term.value;
  //let params = {apiIds: term.api_id, term: "*"};
  //let params = {apiIds: term.api_id, term: term.value};
  let params = {apiIds: term.api_id};
  var uri = "/ArrayFindMyApi";
  //var uri = "/search";
  return (dispatch) => {
    // svc.postApis(path, obj, function (e) {
    //   dispatch(searchResponse(constType.SEARCH_SUCCESS, { term: obj,option: option, data: e, error: undefined }));
    // }, function (e) {
    //   var msg = parseErrorMessage(e);
    //   dispatch(searchResponse(constType.SEARCH_FAILURE, { term: obj,option: option, data: undefined, error: msg }));
    //   // dispatch(notifyError(msg));
    // });
    api.posts(uri, params)
    .then ((apis) => dispatch({type: SEARCH_SUCCESS, result: apis, option: option}))
    .catch(error => {
      console.log("searchbyArrayOfApiIds: ", SEARCH_SUCCESS, error);
    });
  };
}

export function typeAheadSearch(opn) {
  let uri = "/tyepAheadSearch";
  let params = opn.query;
  params = {
    ...params,
    term: opn.term
  };
  console.log(params);

  return (dispatch) => {
    api.gets(uri, params)
    .then ((apis) => dispatch({type: TYPEAHEAD_LOOKUP, result: apis, option: opn}))
    .catch(error => {
      console.log("search1: ", SEARCH_FAILURE, error);
    });
  };
}

export function getAllTags() {
  return (dispatch) => {
    let uri = "/findAllTags";
    let params = {};
    api.gets(uri, params)
    .then ((apis) => dispatch({type: TAGS_SUCCESS, result: apis}))
    .catch(error => {
      console.log("getAllTags: ", TAGS_FAILURE, error);
    });
  };
}


/*** parse Error Message ***/
// function parseErrorMessage(e) {
//   return e ? (e.response || e.message) : undefined; //'something went wrong'
// }
/*** parse Error Message End ***/
