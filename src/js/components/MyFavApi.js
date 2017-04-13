// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyApiFav } from '../actions/myfavapi';
import { getApiDetails } from '../actions/registerapi';
import { MYFAV } from '../constants';
import AppPanel from '../components/ApiPanel';
//import { Results } from '../libs/apiresults';
import { ResultPanel as Results } from '../libs/apiresults';

import Box from 'grommet/components/Box';

import Apps from 'grommet/components/icons/base/Apps';
import Menu from 'grommet/components/icons/base/Menu';

import { TILE_VIEW, LIST_VIEW } from '../constants';

class MyFavApi extends Component {
  constructor(props) {
    super(props);
    this.state = {type: props.type};
    this._onSelect = this._onSelect.bind(this);
    this._loadData = this._loadData.bind(this);

    this._onListViewClick = this._onListViewClick.bind(this);
    this._onTileViewClick = this._onTileViewClick.bind(this);
    this.state = {
      viewStyle : TILE_VIEW
    };
  }

  componentWillMount() {
    this._loadData(this.props.session.email);
  }

_onTileViewClick(){
    console.log('Tile');
    this.setState({viewStyle: TILE_VIEW});
  }
  
  _onListViewClick(){
    console.log('List');
      this.setState({viewStyle: LIST_VIEW});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.session.email !== this.props.session.email) {
      this._loadData(nextProps.session.email);
    }
  }

  _loadData(email) {
    if (email) {
      this.props.dispatch(getMyApiFav(email, this.state.type));
    }
  }

  _onSelect(e) {
    this.props.dispatch(getApiDetails(e));
    this.context.router.push('/details');
  }

  render() {
    const {title, myfavapi: {myapi, myfav}} = this.props;
    const { viewStyle } = this.state;

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

    var results = this.state.type == MYFAV? myfav.results : myapi.results;
    return (
      <AppPanel title={title}>
        {/*<div className="box-grid">
            <Apps onClick={this._onTileViewClick}/>
            <Menu onClick={this._onListViewClick}/>
        </div>*/}
        <Box align='end'>{toggleBar}</Box>
        
        <Results viewStyle={viewStyle} results={results} onSelect={this._onSelect}/>
      </AppPanel>
    );
  }
};

MyFavApi.contextTypes = {
  router: React.PropTypes.object.isRequired
};

let select = (state) => state;
export default connect(select)(MyFavApi);
