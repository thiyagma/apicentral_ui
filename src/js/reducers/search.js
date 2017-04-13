// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import * as ActionType from '../constants';

var defaultPageSize = 30;
const DEFAULTRESULT = ActionType.DEFAULTRESULT;
const facetsArray = [];

var defaultInnerFilter = {
  term: '',
  options: {
    title: true,
    description: true,
    keywords: true,
    category: true,
    author: true
  }
};

var defaultIndexedResults = {
  resultsAsString: [],
  resultsAsObject: []
};

var initialState = {
  searchOptions: ActionType.FilterOptions,
  selectedOption: ActionType.FilterOption,
  searchSuggestions: [],
  searchTerm: "*",
  searchResults: DEFAULTRESULT,
  orignalResult: DEFAULTRESULT,
  apiDetail: {},
  maxPageSize: defaultPageSize,
  optionalQuery: {
    limit: defaultPageSize,
    offset: 0,
    sortField: "update_ts",
    sortOrder: -1
  },
  filterOptions: defaultInnerFilter,
  indexedResults: defaultIndexedResults,
  tags: [],
  facetsArray:[],
  sortBy:ActionType.RECENT,
  viewStyle: ActionType.TILE_VIEW
};

const handlers = {
  [ActionType.INIT]: () => initialState,
  // [ActionType.DETAILS_VIEW]: (state, action) => ({ apiDetail: action.results, UpdateApiStatus: false, UploadApiStatus: false }),
  [ActionType.SEARCH_SUCCESS]: (state, action) => {
    var opn = action.option;
    var results = action.result.results;
    let timeStamp = '';
    let apiId = '';
    results.map(result => {

      timeStamp = timeStamp +  result.create_ts + ",";
    });

    results.map(result => {

      apiId = apiId +  result.api_id + ", ";
    });
  
    console.log("Search Results " + apiId);

    //console.log("Before Sort " + timeStamp) ; 
    results.sort(function(obj1, obj2) {
        return obj2.create_ts - obj1.create_ts
    });

    timeStamp = '';
    results.map(result => {
      timeStamp = timeStamp +  result.create_ts + ",";
    })
    //console.log("After Sort " + timeStamp) ; 
    state.orignalResult = {results: action.result.results, totalhit: action.result.TotalHits, limit: action.result.LimitedHits};
    indexSearchResult(state);
    return {searchTerm: opn.term || '*', selectedOption: opn.filter || 'All', searchResults: state.orignalResult, innerFilterOptions: defaultInnerFilter};
  },
  [ActionType.SEARCH_FAILURE]: (state, action) => {
    return {searchTxt: action.term, results: []};
  },
  [ActionType.SEARCH_MORE_SUCCESS]: (state, action) => {
    var opn = action.option;
    console.log("SEARCH_MORE_SUCCESS " + state.orignalResult.results);
    state.orignalResult = {results: state.orignalResult.results.concat(action.results.results), totalhit: action.results.TotalHits, limit: state.orignalResult.limit + action.results.LimitedHits};

    indexSearchResult(state);

    return {searchTerm: opn.term || '*', selectedOption: opn.filter || 'All', searchResults: state.orignalResult};
  },
  [ActionType.SEARCH_MORE_FAILURE]: (state, action) => {
    console.log("SEARCH_MORE_FAILURE " + state.orignalResult.results);
    return {searchTxt: action.term, results: []};
  },
  [ActionType.TAGS_SUCCESS]: (state, action) => ({ tags: action.result }),
  [ActionType.APPLY_FILTER]: (state, action) => {
    var resultsAsString = state.indexedResults.resultsAsString;
    var resultsAsObject = state.indexedResults.resultsAsObject;
    var results = state.orignalResult.results;
    const {options, term} = action.option;
    let opn = options;
    let filterValue = term;
    let filteredResults = [];
    let limit=0, totalhit=0;
    // Use all fields
    if (opn.title && opn.description && opn.keywords && opn.category && opn.author) {
      resultsAsString.forEach(function(currentValue, index) {
        if (currentValue.indexOf(filterValue) >= 0) {
          filteredResults.push(results[index]);
        }
      }.bind(this));

    } else if (opn.title || opn.description || opn.keywords || opn.category || opn.author) { // Use some fields
      resultsAsObject.forEach(function(currentValue, index) {
        if (
          (opn.title && currentValue.title.indexOf(filterValue) >= 0) ||
          (opn.description && currentValue.description.indexOf(filterValue) >= 0) ||
          (opn.keywords && currentValue.keywords.indexOf(filterValue) >= 0) ||
          (opn.category && currentValue.category.indexOf(filterValue) >= 0) ||
          (opn.author && currentValue.author.indexOf(filterValue) >= 0)
        ) {
          filteredResults.push(results[index]);
        }
      }.bind(this));
      limit = totalhit = filteredResults.length;
    } else { // Ignore filter
      filteredResults = results;
      limit = state.orignalResult.limit;
      totalhit = state.orignalResult.totalhit;
    }
    return {searchResults: {results: filteredResults, limit: limit, totalhit: totalhit}, filterOptions: action.option};
  },
  [ActionType.RESET_FILTER]: (state, action) => {
    return {
      searchResults: state.orignalResult, 
      filterOptions: {term:'',
        options: {
          author:true,
          category:true,
          description:true,
          keywords:true,
          title:true
        }
      }, 
      indexedResults: defaultIndexedResults 
    };
  },
  [ActionType.TYPEAHEAD_LOOKUP]: (state, action) => {
     //const suggestions = getSuggestions(action.key);

     var suggestions = [];
     for(let i=0; i < action.result.results.length; i++) {
         suggestions.push(action.result.results[i].name + " within " + action.result.results[i].facet);
     }
     console.log("sugggestion " + suggestions);
     return {searchSuggestions: suggestions };
  },
  [ActionType.CLEAR_TYPEAHEAD] :(state,action) => {
       return {searchSuggestions: []};
  },
[ActionType.SORT_BY] : (state, action) => {
  debugger;
       console.log("Search Reducer " + action.data);
       if(action.data != state.sortBy) {
        var results = state.orignalResult.results;
        if(action.data == ActionType.OLDEST) {
         results.sort(function(obj1, obj2) {
           return obj1.create_ts - obj2.create_ts
        });
       }
       else if(action.data == ActionType.RECENT) {
        results.sort(function(obj1, obj2) {
           return obj2.create_ts - obj1.create_ts
        });
       }
       else if(action.data == ActionType.MOST_POPULAR) {
       }      
       return {searchResults: {results: results},sortBy: action.data};
      }
  },
  [ActionType.TOGGLE_VIEW_STYLE] : (state,action) => {
    debugger;
      return { viewStyle : action.data};
  },
  [ActionType.APPLY_FACET_FILTER]: (state, action) => {
    // var resultsAsString = state.indexedResults.resultsAsString;
    // var resultsAsObject = state.indexedResults.resultsAsObject;
    var results = state.orignalResult.results;
    let filterValue = action.option.value;
    let filteredResults = [];
    let limit=0, totalhit=0;
    if(action.option.action===true){
    facetsArray.push(filterValue);
    } else {
    facetsArray.pop(filterValue);
    }
    // Use all fields
    if(facetsArray.length>0){
      state.orignalResult.results.forEach(function(currentValue, index) {
        facetsArray.forEach(function(itm,inx) {
        if (currentValue.latency) {
          if(action.option.attribute!=null){
            var range = facetsArray[inx].replace(/\u00A3/g, '');
            var rangearray = range.split("-");
              if (rangearray!=null && parseInt(rangearray[0])<=parseInt(currentValue.latency) && parseInt(rangearray[1])>=parseInt(currentValue.latency)){
                filteredResults.push(results[index]);
              }
          }
        }

        if (currentValue.audience===facetsArray[inx]) {
          filteredResults.push(results[index]);
        }
        if (currentValue.system_of_record!=null && currentValue.system_of_record.length>0){
          currentValue.system_of_record.forEach(function (element) {
              if (element ===facetsArray[inx]) {
               filteredResults.push(results[index]);
          } })
        }
        })
      }.bind(this));
      limit = totalhit = filteredResults.length;
  } else { // Ignore filter
      filteredResults = results;
      limit = state.orignalResult.limit;
      totalhit = state.orignalResult.totalhit;
    }
    return {searchResults: {results: filteredResults, limit: limit, totalhit: totalhit}, filterOptions: action.option,facetsArray:facetsArray};
  }
};

const indexSearchResult = (state) => {
  //indexedResults
  state.orignalResult.results.forEach((_item) => {
    let tmp = null;
    let valueAsString = "";
    let valueAsObject = {};
    // console.log(_item);

    // Title
    if (_item.title) {
      tmp = _item.title.toLowerCase();
      valueAsString += tmp;
      valueAsObject.title = tmp;
    } else {
      valueAsObject.title = "";
    }


    // Status
    // tmp = _item.status.toLowerCase();
    // valueAsString += tmp;
    // valueAsObject.status = tmp;

    // Description
    if (_item.description) {
      tmp = _item.description.toLowerCase();
      valueAsString += tmp;
      valueAsObject.description = tmp;
    } else {
      valueAsObject.description = "";
    }


    // Keywords
    if (_item.keywords) {
      tmp = _item.keywords.split("|").join(" ");
      tmp = tmp.toLowerCase();
      valueAsString += tmp;
      valueAsObject.keywords = tmp;
    } else {
      valueAsObject.keywords = "";
    }


    // Category
    if (_item.value_chain && _item.value_chain.length > 0 && _item.value_chain[_item.value_chain.length - 1]) {
      tmp = _item.value_chain[_item.value_chain.length - 1].value.toLowerCase();
      valueAsString += tmp;
      valueAsObject.category = tmp;
    } else {
      valueAsObject.category = "";
    }


    // Author
    if (_item.create_by) {
      tmp = _item.create_by.toLowerCase();
      valueAsString += tmp;
      valueAsObject.author = tmp;
    } else {
      valueAsObject.author = "";
    }

    state.indexedResults.resultsAsString.push (valueAsString);
    state.indexedResults.resultsAsObject.push (valueAsObject);
  }, this);
};

export default function search (state = initialState, action) {
  let handler = handlers[action.type];
  //search reducers
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
};
