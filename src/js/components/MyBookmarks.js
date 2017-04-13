// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyBookmarks, getMoreBookmarks } from '../actions/myfavapi';
import { getApiDetails } from '../actions/registerapi';
import { ADDMYBOOKMARKS_SUCCESS } from '../constants';
import AppPanel from '../components/ApiPanel';
//import { Results } from '../libs/apiresults';

import Box from 'grommet/components/Box';

import Apps from 'grommet/components/icons/base/Apps';
import Menu from 'grommet/components/icons/base/Menu';

import { ResultPanel as Results } from '../libs/apiresults';
import { TILE_VIEW, LIST_VIEW } from '../constants';

class MyBookComp extends Component {
  constructor(props) {
    super(props);
    this._onSelect = this._onSelect.bind(this);
    this._loadData = this._loadData.bind(this);
    this._onListViewClick = this._onListViewClick.bind(this);
    this._onTileViewClick = this._onTileViewClick.bind(this);
    this.state = {
      viewStyle : TILE_VIEW
    };
  }

_onTileViewClick(){
    console.log('Tile');
    this.setState({viewStyle: TILE_VIEW});
  }
  
  _onListViewClick(){
    console.log('List');
      this.setState({viewStyle: LIST_VIEW});
  }


  componentWillMount() {
    this._loadData(this.props.session.email);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.session.email !== this.props.session.email) {
      this._loadData(nextProps.session.email);
    }
  }

  _loadData(email) {
    if (email) {
      this.props.dispatch(getMyBookmarks(email));
    }
  }

  _onSelect(e) {
    this.props.dispatch(getApiDetails(e));
    this.context.router.push('/details');
  }

_onMore() {
    // this.props.search.optionalQuery.limit = e;
    debugger;
    var options = common.buildSearchQuery(this.props);
    console.log(options);

    this.props.dispatch(getMoreBookmarks(email, options));
  }


  render() {
    const {title,myfavapi} = this.props;
    const { viewStyle } = this.state;
    debugger;
    //const {myBookmarks: {results, totalhit, limit } , viewStyle } = this.state;
    //let _onmore;


  /*  if (totalhit > limit) {
      this.props.optionalQuery.limit = maxPageSize;
      this.props.optionalQuery.offset = results.length;
      _onmore = this._onMore.bind(this);
    }*/

     var toggleBar;
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

   //var results =  myfavapi.myBookmarks.results;
   var results =  myfavapi.myBookmarks.results;
    return (
       <AppPanel title={title}>
        <Box align="end">
           {toggleBar}
        </Box>
        <Results viewStyle={viewStyle} results={results} onSelect={this._onSelect}/>
        {/*<Results viewStyle={viewStyle} results={results} onSelect={this._onSelect} onMore={_onmore}/>*/}
       </AppPanel>
    );
  }
};

MyBookComp.contextTypes = {
  router: React.PropTypes.object.isRequired
};

let select = (state) => state;
export default connect(select)(MyBookComp);
