// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TagCloud } from "react-tagcloud";
import SearchPanel from '../libs/SearchPanel';
import { ResultPanel as Results } from '../libs/apiresults';
import SearchFilter from '../components/SearchFilter';
import SearchCtrl from '../components/SearchCtrl.js';
import AppPanel from '../components/ApiPanel';
import common from '../common';
import { Anchor, Box, ClearOptionIcon } from '../grommet';
import { search1, searchMore, getAllTags, searchbyArrayOfApiIds, resetFilter ,applyFacetFilter,typeAheadSearch} from '../actions/search'; //notifyError, search, 
import { getApiDetails } from '../actions/registerapi';
import FacetedMenu from '../components/FacetedMenu';

import Apps from 'grommet/components/icons/base/Apps';
import Menu from 'grommet/components/icons/base/Menu';
import Select from 'grommet/components/Select';

import { TILE_VIEW, LIST_VIEW, sortOptions, TOGGLE_VIEW_STYLE } from '../constants';


var CLASS_ROOT = 'search-page';
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this._executeSearch = this._executeSearch.bind(this);
    this._onSearch = this._onSearch.bind(this);
    // this._onSearch1 = this._onSearch1.bind(this);
    this._onItemPerPageChange = this._onItemPerPageChange.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this._onTagClick = this._onTagClick.bind(this);
    this.prevPageState = props.location.state || null;
    this._onFilter = this._onFilter.bind(this);
    this._onSearchTextChange = this._onSearchTextChange.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this._onListViewClick = this._onListViewClick.bind(this);
    this._onTileViewClick = this._onTileViewClick.bind(this);

    /*this.state = {searchResults: this.props.search.searchResults, 
                  indexResults: [],
                  filterResults:[],
                  viewStyle: TILE_VIEW
                };*/

                this.state = {searchResults: this.props.search.searchResults, 
                  indexResults: [],
                  filterResults:[]
                };
  }

  componentWillMount() {
    //https://apicatalog.stackato.g4ihos.itcs.hpecorp.net/api/v1/apistore?limit=10&offset=0&sortField=update_ts&sortOrder=-1
    this._executeSearch();
  }

  componentDidMount() {
    console.log("Search - componentDidMount ")
  }

  componentWillReceiveProps(nextProps) {
    this._updateState(nextProps);
  }

  _updateState(props) {
    this.setState({searchResults: props.search.searchResults});
  }

  _onSearchTextChange(val) {
    console.log("_onSearchTextChange "+ val);
     if(val.length == 0) {
        console.log("fire clear suggesstion")
        this.props.dispatch({type:'CLEAR_TYPEAHEAD'});
      }
      else if(val.length >= 3) {
        console.log("_onSearchTextChange >3 "+ val);
        this.props.search.optionalQuery.offset = 0;
        this.props.search.searchTerm = val;
        var options = common.buildSearchQuery(this.props);
        options.query.limit = 10;
        delete options.query.sortOrder;
        this.props.dispatch(typeAheadSearch(options));
      }      
  }

  _onSelect(e) {
    this.props.dispatch(getApiDetails(e));
    const { router } = this.context;
    router.push( "/details");
    // this.props.history.pushState(null, "/details");
  }

  _onSearch(e) {
    // this._onSearch1(e.text, e.selectedfilter);
    this.props.search.selectedOption = e.selectedfilter.value;
    this.props.search.searchTerm = e.text;
    // reset offset value.
    this.props.search.optionalQuery.offset = 0;
    var options = common.buildSearchQuery(this.props);
    this.setState({isSearchDone:true});
    this.props.dispatch(search1(options));

  }

  _onItemPerPageChange(e) {
    console.log("--- onItemPerPageChange -- ");
    this.props.search.optionalQuery.limit = e;
    var options = common.buildSearchQuery(this.props);
    this.props.dispatch(search1(options));
  }

  // _onSearch1(txt, selectedfilter) {
  //   this.props.dispatch(search(txt, selectedfilter));
  // }

  _onTagClick(tag) {
    //console.log(tag.value);
    this.props.dispatch(searchbyArrayOfApiIds(tag));
  }

  _onFilter(option) {
    var rslt = this.props.search.orignalResult;
    this._updateState({searchResults: rslt});
  }

  _onMore() {
    // this.props.search.optionalQuery.limit = e;
    debugger;
    console.log("---Search More----")
    var options = common.buildSearchQuery(this.props);
    console.log(options);

    this.props.dispatch(searchMore(options));
  }


  _executeSearch() {
    console.log("--- _executeSearch -- ");
    var options = common.buildSearchQuery(this.props);
    this.props.dispatch(search1(options));
    //this.props.dispatch(getAllTags());
  }
 _onCheckboxChange(event) {
    //var facetRes=this.props.search.searchResults.results;
    //facetRes=facetRes.filter(v => v.title === event.target.value);
    //this.props.search.searchResults.results=facetRes;
    var option={"attribute":event.target.name,"action":event.target.checked,"value":event.target.value};
    this.props.dispatch(applyFacetFilter(option));

  }
//className='grommetux-background-color-index-light-2'
  handleSort(e) {
    // console.log("Sort Value : Search PAge " + value);
   // debugger;
   let value = e.value;
     this.props.dispatch({type:'SORT_BY', data:value});
  }

  _onTileViewClick(){
    console.log('Tile');
    //this.setState({viewStyle: TILE_VIEW});
    this.props.dispatch({type: TOGGLE_VIEW_STYLE, data: TILE_VIEW});
  }
  
  _onListViewClick(){
    console.log('List');
      //this.setState({viewStyle: LIST_VIEW});
      this.props.dispatch({type: TOGGLE_VIEW_STYLE , data:LIST_VIEW});
  }

  render() {
    const {searchTerm, searchOptions, selectedOption, tags, maxPageSize, searchSuggestions, sortBy,viewStyle} = this.props.search;
    const {searchResults: {results, totalhit, limit}} = this.state;
    var orgRslts=this.props.search.orignalResult.results;
    let _onmore;
    var search = (
      
      <Box className="search_container" pad="none" direction="row" align="start">
                <SearchCtrl options={searchOptions} selectedOption={selectedOption} onSearch={this._onSearch} suggestions={searchSuggestions}
        onSearchTextChange={this._onSearchTextChange}/>
      </Box>

    );

    //
    /*if (totalhit > limit) {
      this.props.search.optionalQuery.limit = maxPageSize;
      this.props.search.optionalQuery.offset = results.length;
      _onmore = this._onMore.bind(this);
    }*/

  let toggleBar;

  if(viewStyle == TILE_VIEW) {
    toggleBar = (
          <div className="box-grid">
           <div className="box-grid-select">
              <Apps  onClick={this._onTileViewClick}/>
            </div>
            <div className="box-grid-select-none">
                     <Menu onClick={this._onListViewClick}/>
            </div>
            </div>);
  }
  else if( viewStyle == LIST_VIEW) {
      toggleBar = (
        <div className="box-grid">
        <div className="box-grid-select-none">
            <Apps  onClick={this._onTileViewClick}/>
        </div>
        <div className="box-grid-select">
            <Menu onClick={this._onListViewClick}/>
        </div>
        </div>
      );
  }
   

    return (
      <AppPanel  className={CLASS_ROOT} bodyStyle = {{direction: 'row', justify: "between"}}>
        <Box pad="none" align="start" justify="start" style={{width: '100%'}}>
          {search}
           <Box direction='row' className="shorting_header">
            
            <Box align="start" className="pad-20">  
                {results && totalhit? 'Results: ' + results.length + ' of ' + totalhit : ''} 
            </Box>
         
         <Box align="end" className="right_panel">
         <div className="recent">
            <Select options={sortOptions} onChange={this.handleSort} value={sortBy}/>
          </div>
              {toggleBar}
         </Box>
          </Box>  

         <Box direction="row"  align="start">
        <FacetedMenu results={orgRslts} onChange={this._onCheckboxChange}/>
          <Results viewStyle={viewStyle} className={CLASS_ROOT + '_results_1'} sortedValue={sortBy} onSort={this.handleSort} onMore={_onmore} results={results} totalCount={totalhit} showFilter={true} onSelect={this._onSelect} onItemPerPageChange={this._onItemPerPageChange}/>
          </Box>
        </Box>

      </AppPanel>
    );
  }
}

SearchPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

let select = (state) => state;
export default connect(select)(SearchPage);
